"use client";

import { VoiceButton } from "./VoiceButton";
import { VoiceTranscript } from "./VoiceTranscript";
import { VoiceResponse } from "./VoiceResponse";
import { useVoiceChat } from "@/hooks/useVoiceChat";

export function VoiceChat() {
  const {
    isListening,
    loading,
    transcript,
    response,
    error,
    startListening,
    stopListening
  } = useVoiceChat();

  return (
    <div className="flex flex-col items-end space-y-4">
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-lg max-w-md">
          {error}
        </div>
      )}
      
      <VoiceTranscript text={transcript} />
      <VoiceResponse text={response} />
      <VoiceButton 
        listening={isListening}
        loading={loading}
        onClick={isListening ? stopListening : startListening}
      />
    </div>
  );
}