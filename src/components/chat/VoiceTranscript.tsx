"use client";

import { Mic } from 'lucide-react';

export function VoiceTranscript({ text }) {
  if (!text) return null;

  return (
    <div className="bg-muted p-4 rounded-lg max-w-md">
      <div className="flex items-center space-x-2 mb-2">
        <Mic className="w-4 h-4" />
        <span className="font-semibold">You said:</span>
      </div>
      <p>{text}</p>
    </div>
  );
}