import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Brain, MessageSquare } from 'lucide-react';

interface VoiceButtonProps {
  state: 'idle' | 'listening' | 'processing' | 'responding';
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  variant: 'full' | 'compact';
  type: 'mute' | 'talk';
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  state,
  isActive,
  onClick,
  disabled,
  variant,
  type
}) => {
  const getButtonContent = () => {
    const iconSize = variant === 'full' ? 'w-6 h-6' : 'w-5 h-5';
    
    if (type === 'mute') {
      return (
        <motion.div 
          className="flex items-center justify-center gap-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <MicOff className={iconSize} />
          <span className="whitespace-nowrap">Mute</span>
        </motion.div>
      );
    }

    switch (state) {
      case 'listening':
        return (
          <motion.div 
            className="flex items-center justify-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Mic className={iconSize} />
            </motion.div>
            <span className="whitespace-nowrap">Listening...</span>
          </motion.div>
        );
      case 'processing':
        return (
          <motion.div 
            className="flex items-center justify-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Brain className={iconSize} />
            </motion.div>
            <span className="whitespace-nowrap">Processing...</span>
          </motion.div>
        );
      case 'responding':
        return (
          <motion.div 
            className="flex items-center justify-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MessageSquare className={iconSize} />
            </motion.div>
            <span className="whitespace-nowrap">Responding...</span>
          </motion.div>
        );
      default:
        return (
          <motion.div 
            className="flex items-center justify-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <Mic className={iconSize} />
            <span className="whitespace-nowrap">Talk</span>
          </motion.div>
        );
    }
  };

  const baseClass = `
    ${variant === 'full' ? 'h-12' : 'h-10 text-sm'}
    min-w-[120px] px-6 rounded-full transition-all duration-200
    ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
    ${type === 'talk' 
      ? isActive
        ? 'bg-brand-green/30 text-brand-green ring-2 ring-brand-green'
        : 'bg-brand-green/20 hover:bg-brand-green/30 text-brand-green'
      : isActive
        ? 'bg-brand-pink/30 text-brand-pink ring-2 ring-brand-pink'
        : 'bg-brand-pink/20 hover:bg-brand-pink/30 text-brand-pink'
    }
  `;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
    >
      {getButtonContent()}
    </motion.button>
  );
};