"use client";

import { VoiceChat } from "./VoiceChat";

export function VoiceChatProvider() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <VoiceChat />
    </div>
  );
}