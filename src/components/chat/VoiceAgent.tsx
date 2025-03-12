import React, { useEffect, useState } from 'react';
import { Mic, MicOff, X, Loader, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '@/DataModels/TeamDataModel';
import Markdown from 'react-markdown';

// Define the props interface for the component
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

function VoiceAgentApp({ 
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
  
  // Update the active button when listening state changes from outside
  useEffect(() => {
    setActiveButton(isListening ? 'talk' : 'mute');
  }, [isListening]);

  // Show content when response or team data is available
  useEffect(() => {
    if (response || (teamData && teamData.length > 0) || contentType === 'company' || contentType === 'contact') {
      setShowContent(true);
    }
  }, [response, teamData, contentType]);

  // Handle mute button click
  const handleMuteClick = () => {
    if (loading) return;
    
    stopListening();
    setActiveButton('mute');
  };

  // Handle talk button click
  const handleTalkClick = () => {
    if (loading) return;
    
    startListening();
    setActiveButton('talk');
  };

  // Company info for company and contact views
  const companyInfo = {
    description: "At Maslow AI, we believe true innovation comes from understanding both the human and economic forces behind AI. While many companies chase the latest trends, we deliver practical, measurable outcomes that transform your business. In an era of AI hype, we focus on turning investment into tangible value.",
    contact: {
      email: "contact@maslow.ai",
      phone: "+1 (555) 123-4567",
      address: "123 Innovation Drive, Tech City, TC 12345"
    }
  };

  const renderTeamContent = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 grid gap-6 sm:grid-cols-2 px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-full text-center text-3xl font-bold mb-4"
      >
        Meet Our{" "}
        <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
          Team
        </span>
      </motion.h2>
      
      {teamData?.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm"
        >
          <div className="grid sm:grid-cols-2 gap-4 p-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-brand-green/20" />
              <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-brand-pink font-medium">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderAiResponse = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center text-3xl font-bold mb-6"
      >
        <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
          AI Response
        </span>
      </motion.h2>
      
      {transcript && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/50 backdrop-blur-sm p-4 rounded-lg mb-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Mic className="w-4 h-4 text-brand-pink" />
            <span className="font-semibold">You said:</span>
          </div>
          <p>{transcript}</p>
        </motion.div>
      )}
      
      {response && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary/10 backdrop-blur-sm p-4 rounded-lg"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Bot className="w-4 h-4 text-brand-green" />
            <span className="font-semibold">Response:</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <Markdown>{response}</Markdown>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const renderCompanyInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center text-3xl font-bold mb-6"
      >
        <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
          About Maslow AI
        </span>
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-background/50 backdrop-blur-sm p-6 rounded-lg"
      >
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          {companyInfo.description}
        </p>
      </motion.div>
    </motion.div>
  );

  const renderContactInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 px-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center text-3xl font-bold mb-6"
      >
        <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
          Contact Us
        </span>
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-background/50 backdrop-blur-sm p-6 rounded-lg space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-brand-pink/10">
            <Mic className="h-5 w-5 text-brand-pink" />
          </div>
          <span>{companyInfo.contact.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-brand-green/10">
            <Mic className="h-5 w-5 text-brand-green" />
          </div>
          <span>{companyInfo.contact.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-brand-pink/10">
            <Mic className="h-5 w-5 text-brand-pink" />
          </div>
          <span>{companyInfo.contact.address}</span>
        </div>
      </motion.div>
    </motion.div>
  );
  
  return (
    <div className="min-h-screen bg-background text-white overflow-auto">
      {/* Main Content Area */}
      <div className="min-h-screen flex flex-col">
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
        
        {/* Main Area - Content or Controls */}
        <div className="flex-1 flex flex-col overflow-auto">
          <AnimatePresence mode="wait">
            {!showContent ? (
              <motion.div 
                key="controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-center items-center p-8"
              >
                {/* Status indicator */}
                {loading && (
                  <div className="mb-6 flex items-center gap-2">
                    <Loader className="w-5 h-5 animate-spin text-brand-green" />
                    <span className="text-muted-foreground">Processing...</span>
                  </div>
                )}
                
                {isListening && isWaiting && (
                  <div className="mb-6 text-brand-green animate-pulse">
                    Listening for trigger word...
                  </div>
                )}
                
                {/* Two button layout - Mute and Talk in control view */}
                <div className="flex gap-6">
                  {/* Mute Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMuteClick}
                    disabled={loading}
                    className={`px-6 py-4 rounded-full transition-all duration-200 flex items-center gap-2 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    } ${
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
                    onClick={handleTalkClick}
                    disabled={loading}
                    className={`px-6 py-4 rounded-full transition-all duration-200 flex items-center gap-2 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    } ${
                      activeButton === 'talk'
                        ? 'bg-brand-green/30 text-brand-green ring-2 ring-brand-green'
                        : 'bg-brand-green/20 hover:bg-brand-green/30 text-brand-green'
                    }`}
                  >
                    {activeButton === 'talk' && isWaiting ? (
                      <Mic className="w-6 h-6 animate-pulse" />
                    ) : (
                      <Mic className={`${activeButton === 'talk' ? 'w-6 h-6' : 'w-5 h-5'}`} />
                    )}
                    <span>Talk</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                {/* Dynamic content based on content type */}
                <AnimatePresence mode="wait">
                  {contentType === 'team' && teamData && renderTeamContent()}
                  {contentType === 'ai' && renderAiResponse()}
                  {contentType === 'company' && renderCompanyInfo()}
                  {contentType === 'contact' && renderContactInfo()}
                </AnimatePresence>
                
                {/* Content view control buttons - Replaced with just talk and mute buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto mb-8 flex justify-center gap-4 p-4"
                >
                  {/* Mute Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMuteClick}
                    disabled={loading}
                    className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium ${
                      loading ? 'opacity-70 cursor-not-allowed bg-brand-pink/20 text-brand-pink' : 
                      activeButton === 'mute'
                        ? 'bg-brand-pink/30 text-brand-pink ring-2 ring-brand-pink'
                        : 'bg-brand-pink/20 hover:bg-brand-pink/30 text-brand-pink'
                    }`}
                  >
                    <MicOff className="w-4 h-4" />
                    <span>Mute</span>
                  </motion.button>
                  
                  {/* Talk Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTalkClick}
                    disabled={loading}
                    className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium ${
                      loading ? 'opacity-70 cursor-not-allowed bg-brand-green/20 text-brand-green' : 
                      activeButton === 'talk'
                        ? 'bg-brand-green/30 text-brand-green ring-2 ring-brand-green'
                        : 'bg-brand-green/20 hover:bg-brand-green/30 text-brand-green'
                    }`}
                  >
                    {loading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : isListening && isWaiting ? (
                      <Mic className="w-4 h-4 animate-pulse" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                    <span>Talk</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default VoiceAgentApp;





// import React, { useState } from 'react';
// import { Mic, MicOff, X } from 'lucide-react';
// import { motion } from 'framer-motion';

// // Define the props interface for the component
// interface VoiceAgentProps {
//   onClose?: () => void;
// }

// function VoiceAgentApp({ onClose }: VoiceAgentProps) {
//   const [activeButton, setActiveButton] = useState<'mute' | 'talk'>('mute');
  
//   return (
//     <div className="min-h-screen bg-background text-white">
//       {/* Main Content Area */}
//       <div className="h-screen flex flex-col">
//         {/* Header - Only close button */}
//         <header className="p-4 flex justify-end items-center">
//           {onClose && (
//             <motion.button 
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={onClose} 
//               className="p-2 rounded-full bg-brand-pink/10 hover:bg-brand-pink/20 text-brand-pink transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </motion.button>
//           )}
//         </header>
        
//         {/* Main Area - Focus on mic functionality */}
//         <main className="flex-1 flex flex-col justify-center items-center p-8">
//           {/* Two button layout - Mute and Talk */}
//           <div className="flex gap-6">
//             {/* Mute Button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveButton('mute')}
//               className={`px-6 py-4 rounded-full transition-all duration-200 flex items-center gap-2 ${
//                 activeButton === 'mute'
//                   ? 'bg-brand-pink/30 text-brand-pink ring-2 ring-brand-pink'
//                   : 'bg-brand-pink/20 hover:bg-brand-pink/30 text-brand-pink'
//               }`}
//             >
//               <MicOff className={`${activeButton === 'mute' ? 'w-6 h-6' : 'w-5 h-5'}`} />
//               <span>Mute</span>
//             </motion.button>
            
//             {/* Talk Button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveButton('talk')}
//               className={`px-6 py-4 rounded-full transition-all duration-200 flex items-center gap-2 ${
//                 activeButton === 'talk'
//                   ? 'bg-brand-green/30 text-brand-green ring-2 ring-brand-green'
//                   : 'bg-brand-green/20 hover:bg-brand-green/30 text-brand-green'
//               }`}
//             >
//               <Mic className={`${activeButton === 'talk' ? 'w-6 h-6' : 'w-5 h-5'}`} />
//               <span>Talk</span>
//             </motion.button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default VoiceAgentApp;