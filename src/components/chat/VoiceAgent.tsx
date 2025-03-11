import React, { useState } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the props interface for the component
interface VoiceAgentProps {
  onClose?: () => void;
}

function VoiceAgentApp({ onClose }: VoiceAgentProps) {
  const [activeButton, setActiveButton] = useState<'mute' | 'talk'>('mute');
  
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Main Content Area */}
      <div className="h-screen flex flex-col">
        {/* Header - Only close button */}
        <header className="p-4 flex justify-end items-center">
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
        
        {/* Main Area - Focus on mic functionality */}
        <main className="flex-1 flex flex-col justify-center items-center p-8">
          {/* Two button layout - Mute and Talk */}
          <div className="flex gap-6">
            {/* Mute Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveButton('mute')}
              className={`px-6 py-4 rounded-full transition-all duration-200 flex items-center gap-2 ${
                activeButton === 'mute'
                  ? 'bg-brand-pink/30 text-brand-pink ring-2 ring-brand-pink'
                  : 'bg-brand-pink/20 hover:bg-brand-pink/30 text-brand-pink'
              }`}
            >
              <MicOff className={`${activeButton === 'mute' ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <span>Mute</span>
            </motion.button>
            
            {/* Talk Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveButton('talk')}
              className={`px-6 py-4 rounded-full transition-all duration-200 flex items-center gap-2 ${
                activeButton === 'talk'
                  ? 'bg-brand-green/30 text-brand-green ring-2 ring-brand-green'
                  : 'bg-brand-green/20 hover:bg-brand-green/30 text-brand-green'
              }`}
            >
              <Mic className={`${activeButton === 'talk' ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <span>Talk</span>
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VoiceAgentApp;