import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TeamMember } from '@/DataModels/TeamDataModel';
import { VoiceButton } from './VoiceButton';
import { StateAnimation } from './StateAnimation';
import { ContentView } from './ContentView';

interface VoiceAgentProps {
  onClose?: () => void;
  isListening: boolean;
  isWaiting: boolean;
  loading: boolean;
  startListening: () => void;
  stopListening: () => void;
  response?: string;
  transcript?: string;
  contentType?: 'ai' | 'team' | 'company' | 'contact' | null;
  teamData?: TeamMember[];
}

export function VoiceAgent({
  onClose,
  isListening,
  isWaiting,
  loading,
  startListening,
  stopListening,
  response,
  transcript,
  contentType,
  teamData
}: VoiceAgentProps) {
  const [activeButton, setActiveButton] = useState<'mute' | 'talk'>(isListening ? 'talk' : 'mute');
  const [showContent, setShowContent] = useState(false);
  const [state, setState] = useState<'idle' | 'listening' | 'processing' | 'responding'>('idle');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveButton(isListening ? 'talk' : 'mute');
  }, [isListening]);

  useEffect(() => {
    if (response || (teamData && teamData.length > 0) || contentType === 'company' || contentType === 'contact') {
      setShowContent(true);
    }
  }, [response, teamData, contentType]);

  useEffect(() => {
    if (loading) {
      setState('processing');
    } else if (isListening && !isWaiting) {
      setState('responding');
    } else if (isListening) {
      setState('listening');
    } else {
      setState('idle');
    }
  }, [isListening, isWaiting, loading]);

  useEffect(() => {
    if (contentRef.current && showContent) {
      contentRef.current.scrollTop = 0;
    }
  }, [contentType, response, teamData]);

  const handleMuteClick = () => {
    if (loading) return;
    stopListening();
    setActiveButton('mute');
    setState('idle');
  };

  const handleTalkClick = () => {
    if (loading) return;
    startListening();
    setActiveButton('talk');
    setState('listening');
  };

  return (
    <div className="fixed inset-0 bg-background text-white flex flex-col h-screen">
      <header className="absolute top-0 right-0 z-10 p-4">
        {onClose && (
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose} 
            className="p-2 rounded-full bg-brand-pink/10 hover:bg-brand-pink/20 text-brand-pink transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div 
            key="full-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center h-full w-full"
          >
            <div className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                {state !== 'idle' && <StateAnimation state={state} />}
              </AnimatePresence>

              <motion.div 
                className="flex items-center gap-4 mt-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <VoiceButton
                  state={state}
                  isActive={activeButton === 'mute'}
                  onClick={handleMuteClick}
                  disabled={loading}
                  variant="full"
                  type="mute"
                />
                <VoiceButton
                  state={state}
                  isActive={activeButton === 'talk'}
                  onClick={handleTalkClick}
                  disabled={loading && state !== 'processing'}
                  variant="full"
                  type="talk"
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="split-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row h-full w-full"
          >
            {/* Drawer section - adjusts based on screen size */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full md:w-1/4 flex-shrink-0 bg-gray-900/80 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center py-6 md:py-10"
            >
              <div className="flex flex-col items-center w-full px-4">
                <AnimatePresence mode="wait">
                  {state !== 'idle' && <StateAnimation state={state} />}
                </AnimatePresence>

                {/* Responsive button layout - horizontal on small screens, vertical on drawer */}
                <motion.div 
                  className="flex flex-row md:flex-col items-center gap-4 mt-4 w-full justify-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* On mobile: Talk (left) and Mute (right) */}
                  {/* On desktop drawer: Talk (top) and Mute (bottom) */}
                  <div className="flex md:flex-col w-full items-center justify-center gap-4">
                    <VoiceButton
                      state={state}
                      isActive={activeButton === 'talk'}
                      onClick={handleTalkClick}
                      disabled={loading && state !== 'processing'}
                      variant="compact"
                      type="talk"
                    />
                    <VoiceButton
                      state={state}
                      isActive={activeButton === 'mute'}
                      onClick={handleMuteClick}
                      disabled={loading}
                      variant="compact"
                      type="mute"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content area - adjusts based on screen size */}
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full flex-grow bg-background overflow-y-auto"
            >
              <div className="h-full pt-16 pb-8 px-4">
                <AnimatePresence mode="wait">
                  <ContentView
                    type={contentType}
                    response={response}
                    transcript={transcript}
                    teamData={teamData}
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
