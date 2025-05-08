"use client";

import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceAgent } from './VoiceAgent/VoiceAgent';
import { useVoiceChat } from '@/hooks/useVoiceChat';

export function VoiceChat() {
  const [isAppOpen, setIsAppOpen] = useState(false);
  
  const {
    isListening,
    loading,
    transcript,
    response,
    error,
    showModal,
    contentType,
    teamData,
    startListening,
    stopListening,
    setShowModal,
    isWaitingForTrigger
  } = useVoiceChat();

  const [buttonState, setButtonState] = useState({
    isListening: false,
    isWaiting: false
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonState({
        isListening: isListening,
        isWaiting: isWaitingForTrigger
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [isListening, isWaitingForTrigger]);

  const toggleApp = () => {
    if (isAppOpen) {
        stopListening();
        setShowModal(false);
    }
    setIsAppOpen(!isAppOpen);
};

  useEffect(() => {
    if (!isAppOpen) {
      setShowModal(false);
    }
  }, [isAppOpen, setShowModal]);

  const handleVoiceButtonClick = () => {
    if (loading) return;
    
    if (!isAppOpen) {
      setIsAppOpen(true);
    } else {
      if (isListening) {
        stopListening();
        setTimeout(() => {
          setButtonState({
            isListening: false,
            isWaiting: false
          });
        }, 300);
      } else {
        startListening();
      }
    }
  };

  const getButtonVariant = () => {
    if (loading) return "outline";
    if (buttonState.isListening) {
      return buttonState.isWaiting ? "secondary" : "destructive";
    }
    return "default";
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {error && (
          <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-lg max-w-md">
            {error}
          </div>
        )}

        {!isAppOpen && (
          <Button
            size="icon"
            variant={getButtonVariant()}
            className={`h-12 w-12 rounded-full transition-all duration-300 ${
              buttonState.isListening && buttonState.isWaiting ? 'animate-pulse' : ''
            }`}
            onClick={handleVoiceButtonClick}
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
        )}
      </div>

      {isAppOpen && (
        <div className="fixed inset-0 z-50">
          <VoiceAgent
            onClose={toggleApp} 
            isListening={isListening}
            isWaiting={isWaitingForTrigger}
            loading={loading}
            startListening={startListening}
            stopListening={stopListening}
            response={response}
            transcript={transcript}
            contentType={contentType}
            teamData={teamData}
          />
        </div>
      )}
    </>
  );
}