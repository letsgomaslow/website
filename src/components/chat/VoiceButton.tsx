"use client";

import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VoiceButton({ listening, loading, onClick }) {
  return (
    <Button
      size="icon"
      variant={listening ? "destructive" : "default"}
      className="h-12 w-12 rounded-full"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <Loader className="h-6 w-6 animate-spin" />
      ) : listening ? (
        <MicOff className="h-6 w-6" />
      ) : (
        <Mic className="h-6 w-6" />
      )}
    </Button>
  );
}