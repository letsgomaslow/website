"use client";

import { Bot } from 'lucide-react';
import Markdown from 'react-markdown';

export function VoiceResponse({ text }) {
  if (!text) return null;

  return (
    <div className="bg-primary/10 p-4 rounded-lg max-w-md">
      <div className="flex items-center space-x-2 mb-2">
        <Bot className="w-4 h-4" />
        <span className="font-semibold">Response:</span>
      </div>
      <Markdown>{text}</Markdown>
    </div>
  );
}