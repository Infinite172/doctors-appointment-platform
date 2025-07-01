"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Gavel, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setUserRole } from "@/actions/onboarding";
import { lawyerFormSchema } from "@/lib/schema";
import { SPECIALTIES } from "@/lib/specialities";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [step, setStep] = useState("choose-role");
  const router = useRouter();
  const { loading, data, fn: submitUserRole } = useFetch(setUserRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(lawyerFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialtyValue = watch("specialty");

  useEffect(() => {
    if (data && data?.success) {
      router.push(data.redirect);
    }
  }, [data]);

  const uploadToCloudinary = async (file) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET2;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary config missing");
      return null;
    }

  const handleClientSelection = async () => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await submitUserRole(formData);
  };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.secure_url) {
        throw new Error("Upload failed");
      }

      return json.secure_url;
    } catch (err) {
      toast.error("Failed to upload credential document");
      return null;
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    if (url) {
      setValue("credentialUrl", url);
      toast.success("File uploaded successfully");
    }
  };

  const onLawyerSubmit = async (data) => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "LAWYER");
    formData.append("specialty", data.specialty);
    formData.append("experience", data.experience.toString());
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);

    await submitUserRole(formData);
  };

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card onClick={() => !loading && handleClientSelection()} className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all">
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">Join as a Client</CardTitle>
            <CardDescription className="mb-4">Book appointments, consult with lawyers, and resolve your legal concerns</CardDescription>
            <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : "Continue as Client"}
            </Button>
          </CardContent>
        </Card>

        <Card onClick={() => !loading && setStep("lawyer-form")} className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all">
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <Gavel className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">Join as a Lawyer</CardTitle>
            <CardDescription className="mb-4">Create your professional profile, set your availability, and provide consultations</CardDescription>
            <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              Continue as Lawyer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "lawyer-form") {
    return (
      <Card className="border-emerald-900/20">
        <CardContent className="pt-6">
          <div className="mb-6">
            <CardTitle className="text-2xl font-bold text-white mb-2">Complete Your Lawyer Profile</CardTitle>
            <CardDescription>Please provide your professional details for verification</CardDescription>
          </div>

          <form onSubmit={handleSubmit(onLawyerSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="specialty">Lawyer Specialty</Label>
              <Select value={specialtyValue} onValueChange={(value) => setValue("specialty", value)}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((spec) => (
                    <SelectItem key={spec.name} value={spec.name} className="flex items-center gap-2">
                      <span className="text-emerald-400">{spec.icon}</span>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.specialty && <p className="text-sm font-medium text-red-500 mt-1">{errors.specialty.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" placeholder="e.g. 5" {...register("experience", { valueAsNumber: true })} />
              {errors.experience && <p className="text-sm font-medium text-red-500 mt-1">{errors.experience.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialFile">Upload Credential Document</Label>
              <Input type="file" id="credentialFile" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={onFileChange} />
              {errors.credentialUrl && <p className="text-sm font-medium text-red-500 mt-1">{errors.credentialUrl.message}</p>}
              <p className="text-sm text-muted-foreground">Upload your law degree or certification</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Your Services</Label>
              <Textarea id="description" placeholder="Describe your expertise, services, and approach to clients..." rows="4" {...register("description")} />
              {errors.description && <p className="text-sm font-medium text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => setStep("choose-role")} className="border-emerald-900/30" disabled={loading}>Back</Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : "Submit for Verification"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
