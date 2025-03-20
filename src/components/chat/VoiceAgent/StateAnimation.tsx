import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Brain, MessageSquare } from 'lucide-react';

interface StateAnimationProps {
  state: 'listening' | 'processing' | 'responding';
}

export const StateAnimation: React.FC<StateAnimationProps> = ({ state }) => {
  const containerClass = "w-28 h-28 mx-auto mb-8";
  const innerContainerClass = "h-full w-full flex items-center justify-center";
  const animationContainerClass = "w-20 h-20 relative";

  const renderListeningAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={containerClass}
    >
      <div className={innerContainerClass}>
        <div className={animationContainerClass}>
          {/* Audio wave animation */}
          <motion.div className="absolute inset-0 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="mx-0.5 w-1.5 bg-brand-green"
                animate={{
                  height: [8, 24, 8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Pulsing circle effect */}
          <motion.div 
            className="absolute inset-0 bg-brand-green/15 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div className="absolute inset-0 bg-brand-green/30 rounded-full" />
          
          {/* Icon */}
          {/* <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Mic className="text-brand-green w-10 h-10" />
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );

  const renderProcessingAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={containerClass}
    >
      <div className={innerContainerClass}>
        <div className={animationContainerClass}>
          {/* Rotating circles */}
          <motion.div
            className="absolute inset-0 border-4 border-brand-pink/40 border-t-brand-pink rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-brand-pink/30 border-b-brand-pink rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Pulsing effect */}
          <motion.div 
            className="absolute inset-0 bg-brand-pink/10 rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Brain className="text-brand-pink w-10 h-10" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const renderRespondingAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={containerClass}
    >
      <div className={innerContainerClass}>
        <div className={animationContainerClass}>
          {/* Typing animation dots */}
          <motion.div className="absolute inset-0 flex items-center justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-brand-pink"
                animate={{
                  y: [0, -6, 0],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Pulsing circle */}
          <motion.div 
            className="absolute inset-0 bg-brand-pink/20 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div className="absolute inset-0 bg-brand-pink/30 rounded-full" />
          
          {/* Icon */}
          <motion.div
            animate={{ 
              y: [0, -4, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MessageSquare className="text-brand-pink w-10 h-10" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  switch (state) {
    case 'listening':
      return renderListeningAnimation();
    case 'processing':
      return renderProcessingAnimation();
    case 'responding':
      return renderRespondingAnimation();
    default:
      return null;
  }
};