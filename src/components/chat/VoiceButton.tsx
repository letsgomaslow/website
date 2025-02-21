"use client";

import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceButtonProps {
  listening: boolean;
  loading: boolean;
  onClick: () => void;
  waitingForTrigger: boolean;
}

export function VoiceButton({ listening, loading, onClick, waitingForTrigger }: VoiceButtonProps) {
  // Add a local state to help with transition animations
  const [buttonState, setButtonState] = useState({
    isListening: false,
    isWaiting: false
  });
  
  // Sync the component state with props
  useEffect(() => {
    // Small delay to avoid rapid state changes during transitions
    const timer = setTimeout(() => {
      setButtonState({
        isListening: listening,
        isWaiting: waitingForTrigger
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [listening, waitingForTrigger]);

  // Determine button variant
  const getButtonVariant = () => {
    if (loading) return "outline";
    if (buttonState.isListening) {
      return buttonState.isWaiting ? "secondary" : "destructive";
    }
    return "default";
  };

  // Handle click with debounce to prevent double-clicks
  const handleClick = () => {
    if (loading) return;
    onClick();
  };

  return (
    <Button
      size="icon"
      variant={getButtonVariant()}
      className={`h-12 w-12 rounded-full transition-all duration-300 ${
        buttonState.isListening && buttonState.isWaiting ? 'animate-pulse' : ''
      }`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <Loader className="h-6 w-6 animate-spin" />
      ) : buttonState.isListening ? (
        <Mic className="h-6 w-6" />
      ) : (
        <MicOff className="h-6 w-6" />
      )}
    </Button>
  );
}