export const getMessagesFromSession = (sessionId) => {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(`messages-${sessionId}`);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((msg) => ({
      ...msg,
      time: new Date(msg.time),
    }));
  } catch {
    return [];
  }
};

export const saveMessagesToSession = (sessionId, messages) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`messages-${sessionId}`, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save to sessionStorage", e);
  }
};

export const clearSessionMessages = (sessionId) => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(`messages-${sessionId}`);
};
