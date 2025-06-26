"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Video,
  VideoOff,
  File,
  Mic,
  MicOff,
  Phone,
  Send,
  Paperclip,
} from "lucide-react";
import { toast } from "sonner";

export default function VideoCall({ sessionId, token }) {
  // --- state ---
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatConnected, setChatConnected] = useState(false);
  const sessionRef = useRef(null);
  const publisherRef = useRef(null);
  const chatScrollRef = useRef(null);
  const router = useRouter();

  const appId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // --- init ---
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (!window.OT) {
      toast.error("Failed to load Vonage Video API");
      setIsLoading(false);
    } else {
      initializeSession();
    }
  };

  const initializeSession = () => {
    if (!appId || !sessionId || !token) {
      toast.error("Missing required video call parameters");
      router.push("/appointments");
      return;
    }
    const chatSignalType = `chat-message-${sessionId}`;

    try {
      sessionRef.current = window.OT.initSession(appId, sessionId);

      sessionRef.current.on("streamCreated", (e) =>
        sessionRef.current.subscribe(
          e.stream,
          "subscriber",
          { insertMode: "append", width: "100%", height: "100%" },
          (err) => err && toast.error("Subscription error")
        )
      );

      sessionRef.current.on("signal:" + chatSignalType, (event) => {
        const fromSelf =
          event.from.connectionId ===
          sessionRef.current.connection.connectionId;
        if (fromSelf) return; // avoid duplicates
        const data = JSON.parse(event.data);
        setMessages((m) => [...m, { ...data, fromSelf: false, time: new Date() }]);
      });

      sessionRef.current.on("sessionConnected", () => {
        setIsConnected(true);
        setIsLoading(false);
        setChatConnected(true);
        publisherRef.current = window.OT.initPublisher(
          "publisher",
          {
            insertMode: "replace",
            width: "100%",
            height: "100%",
            publishAudio: isAudioEnabled,
            publishVideo: isVideoEnabled,
          },
          (err) => err && toast.error("Publisher error")
        );
      });

      sessionRef.current.on("sessionDisconnected", () => {
        setIsConnected(false);
        setChatConnected(false);
      });

      sessionRef.current.connect(token, (err) => {
        if (err) toast.error("Connection error");
        else publisherRef.current && sessionRef.current.publish(publisherRef.current);
      });
    } catch {
      toast.error("Failed to init video call");
      setIsLoading(false);
    }
  };

  // --- controls ---
  const toggleVideo = () => {
    publisherRef.current.publishVideo(!isVideoEnabled);
    setIsVideoEnabled((v) => !v);
  };
  const toggleAudio = () => {
    publisherRef.current.publishAudio(!isAudioEnabled);
    setIsAudioEnabled((v) => !v);
  };
  const endCall = () => {
    publisherRef.current?.destroy();
    sessionRef.current?.disconnect();
    router.push("/appointments");
  };

  useEffect(
    () => () => {
      publisherRef.current?.destroy();
      sessionRef.current?.disconnect();
    },
    []
  );

  // --- send text or file message ---
  const chatSignalType = `chat-message-${sessionId}`;

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !chatConnected) return;
    const payload = { text: chatInput.trim(), type: "text", time: new Date() };
    sessionRef.current.signal({ type: chatSignalType, data: JSON.stringify(payload) }, (err) => {
      if (!err)
        setMessages((m) => [...m, { ...payload, fromSelf: true }]);
      else toast.error("Send failed");
    });
    setChatInput("");
  };

  const uploadFile = async (file) => {
    if (!cloudName || !uploadPreset) {
      return toast.error("Cloudinary config missing");
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { method: "POST", body: data });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json.secure_url) return toast.error("Upload failed");
    return { url: json.secure_url, name: file.name, mime: file.type };
  };

  const handleFile = async (e) => {
    if (!e.target.files?.[0]) return;
    const f = e.target.files[0];
    const info = await uploadFile(f);
    if (!info) return;
    const payload = { type: "file", url: info.url, name: info.name, time: new Date() };
    sessionRef.current.signal({ type: chatSignalType, data: JSON.stringify(payload) }, (err) => {
      if (!err)
        setMessages((m) => [...m, { ...payload, fromSelf: true }]);
      else toast.error("Send failed");
    });
  };

  // --- scroll chat ---
  useEffect(() => {
    chatScrollRef.current && (chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight);
  }, [messages]);

  // --- render guard ---
  if (!sessionId || !token || !appId) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl text-white font-bold mb-4">Invalid Video Call</h1>
        <p className="text-muted-foreground mb-6">Missing parameters.</p>
        <Button onClick={() => router.push("/appointments")} className="bg-emerald-600 hover:bg-emerald-700">
          Back
        </Button>
      </div>
    );
  }

  return (
    <>
      <Script src="https://unpkg.com/@vonage/client-sdk-video@latest/dist/js/opentok.js" onLoad={handleScriptLoad} onError={() => { toast.error("Script load failed"); setIsLoading(false); }} />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center"><h1 className="text-3xl font-bold text-white mb-2">Video Consultation</h1><p className="text-muted-foreground">{isConnected ? "Connected" : isLoading ? "Connecting..." : "Connection failed"}</p></div>
        <div className="flex flex-col md:flex-row gap-6">
  <div className="flex-1 border border-emerald-900/20 rounded-lg overflow-hidden flex flex-col min-h-[300px] md:min-h-[400px]">
    <div className="bg-emerald-900/10 px-3 py-2 text-emerald-400 text-sm">You</div>
    <div id="publisher" className="flex-1 bg-muted/30 min-h-[300px]" />
  </div>
  <div className="flex-1 border border-emerald-900/20 rounded-lg overflow-hidden flex flex-col min-h-[300px] md:min-h-[400px]">
    <div className="bg-emerald-900/10 px-3 py-2 text-emerald-400 text-sm">Other Participant</div>
    <div id="subscriber" className="flex-1 bg-muted/30 min-h-[300px]" />
  </div>
</div>

        <div className="flex justify-center space-x-4">
          <Button onClick={toggleVideo} className={`rounded-full p-4 h-14 w-14 ${isVideoEnabled ? "border-emerald-900/30 bg-emerald-500 hover:bg-emerald-600" : "bg-red-900/20 border-red-900/30 text-red-400"}`}>{isVideoEnabled ? <Video /> : <VideoOff />}</Button>
          <Button onClick={toggleAudio} className={`rounded-full p-4 h-14 w-14 ${isAudioEnabled ? "border-emerald-900/30 bg-emerald-500 hover:bg-emerald-600" : "bg-red-900/20 border-red-900/30 text-red-400"}`}>{isAudioEnabled ? <Mic /> : <MicOff />}</Button>
          <Button onClick={endCall} className="rounded-full p-4 h-14 w-14 bg-red-600 hover:bg-red-700"><Phone /></Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black border-emerald-700/30">
            <CardContent className="p-0">
              <div className="px-4 py-3 border-b border-emerald-700/20 text-emerald-400 font-semibold text-lg">Live Chat</div>
              <div ref={chatScrollRef} className="h-64 md:h-72 overflow-y-auto  px-4 py-4 space-y-2 bg-black">
                {messages.length === 0 && <div className="text-emerald-300/60 text-sm text-center">No messages yet. Share a message or file!</div>}
                {messages.map((msg,i)=>(
                  <div key={i} className={`flex ${msg.fromSelf?"justify-end":"justify-start"}`}>
                    {msg.type==="text" ? (
                      <div className={`max-w-[70%] min-w-[100px] overflow-hidden px-4 py-2 rounded-2xl shadow ${msg.fromSelf?"bg-emerald-900 text-white":"bg-emerald-900/30 text-white"}`}>
                        <div className="text-base">{msg.text}</div>
                        <div className="text-[10px] mt-1 text-emerald-300/70 text-right">{msg.time.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}</div>
                      </div>
                    ) : (
                      <div className={`max-w-[70%] px-4 py-2 overflow-hidden rounded-2xl shadow ${msg.fromSelf?"bg-emerald-900 text-white":"bg-emerald-900/30 text-white"}`}>
                        <div className="flex items-center space-x-2">
                          <File className="h-4-5 w-5" />
                          <a href={msg.url} target="_blank" rel="noopener noreferrer" className="underline">
                            {msg.name}
                          </a>
                        </div>
                        <div className="text-xs mt-1 text-emerald-300/70 text-right">{msg.time.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form
  onSubmit={sendMessage}
  className="flex flex-wrap items-center border-t border-emerald-700/20 bg-black px-2 py-2 gap-2 sm:gap-3"
>
  <input
    type="file"
    accept="*/*"
    onChange={handleFile}
    className="hidden"
    id="fileInput"
  />
  <label
    htmlFor="fileInput"
    className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 rounded-full p-2 sm:p-3"
  >
    <Paperclip className="h-5 w-5 text-white" />
  </label>

  <input
    value={chatInput}
    onChange={(e) => setChatInput(e.target.value)}
    placeholder="Type your message..."
    className="flex-1 min-w-0 bg-black text-white placeholder-emerald-800 px-3 py-2 rounded-full border border-emerald-700/30 focus:outline-none"
    disabled={!chatConnected}
  />

  <Button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 rounded-full p-2 sm:p-3"
    disabled={!chatInput.trim() || !chatConnected}
  >
    <Send className="h-5 w-5 text-white" />
  </Button>
</form>

            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
