"use client";

import React from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceButtonProps {
  listening: boolean;
  loading: boolean;
  onClick: () => void;
  waitingForTrigger: boolean;
}

export function VoiceButton({ listening, loading, onClick, waitingForTrigger }: VoiceButtonProps) {
  return (
    <Button
      size="icon"
      variant={listening ? (waitingForTrigger ? "secondary" : "destructive") : "default"}
      className={`h-12 w-12 rounded-full transition-all duration-200 ${
        listening && waitingForTrigger ? 'animate-pulse' : ''
      }`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <Loader className="h-6 w-6 animate-spin" />
      ) : listening ? (
        <Mic className="h-6 w-6" />
      ) : (
        <MicOff className="h-6 w-6" />
      )}
    </Button>
  );
}