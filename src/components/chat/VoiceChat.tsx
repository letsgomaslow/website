// "use client";

// import { useState } from "react";
// import { Mic, MicOff, Send } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils/shared";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// const sampleResponses: Record<string, string> = {
//   "what is trism": "TRiSM stands for Trust, Risk, and Security Management—a framework ensuring your AI systems remain secure and compliant.",
//   "how can generative ai help my business": "Generative AI streamlines operations, automates tasks, and fosters innovation tailored to your industry.",
//   "what industries do you serve": "We work with healthcare, finance, retail, manufacturing, etc. Would you like more details?",
//   "can i see examples of your work": "Absolutely! Please check our case studies section.",
//   "what services do you offer": "We offer a range of AI services including strategy development, open-source solutions, TRiSM framework implementation, and custom AI solutions. Would you like to learn more about any specific service?",
// };

// export function VoiceChat() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content: "Hello! I'm your AI assistant. How can I help you today?",
//     },
//   ]);
//   const [currentInput, setCurrentInput] = useState("");

//   const handleSend = () => {
//     if (!currentInput.trim()) return;

//     const userMessage: Message = {
//       role: "user",
//       content: currentInput,
//     };

//     setMessages((prev) => [...prev, userMessage]);

//     // Find the most relevant response
//     const query = currentInput.toLowerCase().trim();
//     let response = "I apologize, but I'm not sure about that. Would you like to speak with our team?";

//     for (const [key, value] of Object.entries(sampleResponses)) {
//       if (query.includes(key)) {
//         response = value;
//         break;
//       }
//     }

//     const assistantMessage: Message = {
//       role: "assistant",
//       content: response,
//     };

//     setTimeout(() => {
//       setMessages((prev) => [...prev, assistantMessage]);
//     }, 500);

//     setCurrentInput("");
//   };

//   const toggleListening = () => {
//     if (!isListening) {
//       // In a real implementation, this would use the Web Speech API
//       setIsListening(true);
//       setTimeout(() => {
//         setIsListening(false);
//         setCurrentInput("What services do you offer?");
//       }, 2000);
//     } else {
//       setIsListening(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20"
//         >
//           <Mic className="h-6 w-6 text-primary" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Voice Assistant</DialogTitle>
//           <DialogDescription>
//             Ask me anything about our services and solutions.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex h-[400px] flex-col">
//           <div className="flex-1 space-y-4 overflow-y-auto p-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={cn(
//                   "flex w-max max-w-[80%] rounded-lg px-4 py-2",
//                   message.role === "assistant"
//                     ? "bg-muted"
//                     : "ml-auto bg-primary text-primary-foreground"
//                 )}
//               >
//                 {message.content}
//               </div>
//             ))}
//           </div>
//           <div className="border-t p-4">
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className={cn(
//                   "h-10 w-10 rounded-full",
//                   isListening && "bg-primary text-primary-foreground"
//                 )}
//                 onClick={toggleListening}
//               >
//                 {isListening ? (
//                   <MicOff className="h-5 w-5" />
//                 ) : (
//                   <Mic className="h-5 w-5" />
//                 )}
//               </Button>
//               <input
//                 type="text"
//                 value={currentInput}
//                 onChange={(e) => setCurrentInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your message..."
//                 className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//               />
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-10 w-10"
//                 onClick={handleSend}
//               >
//                 <Send className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// } 




"use client";

import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceAgentApp from './VoiceAgent';
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
    setIsAppOpen(!isAppOpen);
    if (isListening) {
      stopListening();
    }
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
          <VoiceAgentApp 
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



// "use client";

// import { useState, useEffect } from 'react';
// import { Mic, MicOff, Loader } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import VoiceAgentApp from './VoiceAgent';
// import { useVoiceChat } from '@/hooks/useVoiceChat';

// export function VoiceChat() {
//   const [isAppOpen, setIsAppOpen] = useState(false);
  
//   const {
//     isListening,
//     loading,
//     transcript,
//     response,
//     error,
//     showModal,
//     contentType,
//     teamData,
//     startListening,
//     stopListening,
//     setShowModal,
//     isWaitingForTrigger
//   } = useVoiceChat();

//   // Add a local state to help with transition animations
//   const [buttonState, setButtonState] = useState({
//     isListening: false,
//     isWaiting: false
//   });
  
//   // Sync the component state with props
//   useEffect(() => {
//     // Small delay to avoid rapid state changes during transitions
//     const timer = setTimeout(() => {
//       setButtonState({
//         isListening: isListening,
//         isWaiting: isWaitingForTrigger
//       });
//     }, 50);
//     return () => clearTimeout(timer);
//   }, [isListening, isWaitingForTrigger]);

//   const toggleApp = () => {
//     setIsAppOpen(!isAppOpen);
//     if (isListening) {
//       stopListening();
//     }
//   };

//   // Reset showModal when opening/closing the app
//   useEffect(() => {
//     if (!isAppOpen) {
//       setShowModal(false);
//     }
//   }, [isAppOpen, setShowModal]);

//   // Handle button click
//   const handleVoiceButtonClick = () => {
//     if (loading) return;
    
//     if (!isAppOpen) {
//       setIsAppOpen(true);
//     } else {
//       if (isListening) {
//         stopListening();
//         // Add a short delay before allowing to restart listening
//         setTimeout(() => {
//           setButtonState({
//             isListening: false,
//             isWaiting: false
//           });
//         }, 300);
//       } else {
//         startListening();
//       }
//     }
//   };

//   // Determine button variant
//   const getButtonVariant = () => {
//     if (loading) return "outline";
//     if (buttonState.isListening) {
//       return buttonState.isWaiting ? "secondary" : "destructive";
//     }
//     return "default";
//   };

//   return (
//     <>
//       <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
//         {error && (
//           <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-lg max-w-md">
//             {error}
//           </div>
//         )}

//         {!isAppOpen && (
//           <Button
//             size="icon"
//             variant={getButtonVariant()}
//             className={`h-12 w-12 rounded-full transition-all duration-300 ${
//               buttonState.isListening && buttonState.isWaiting ? 'animate-pulse' : ''
//             }`}
//             onClick={handleVoiceButtonClick}
//             disabled={loading}
//           >
//             {loading ? (
//               <Loader className="h-6 w-6 animate-spin" />
//             ) : buttonState.isListening ? (
//               <Mic className="h-6 w-6" />
//             ) : (
//               <MicOff className="h-6 w-6" />
//             )}
//           </Button>
//         )}
//       </div>

//       {isAppOpen && (
//         <div className="fixed inset-0 z-50">
//           <VoiceAgentApp 
//             onClose={toggleApp} 
//             isListening={isListening}
//             isWaiting={isWaitingForTrigger}
//             loading={loading}
//             startListening={startListening}
//             stopListening={stopListening}
//             response={response}
//             transcript={transcript}
//             contentType={contentType}
//             teamData={teamData}
//           />
//         </div>
//       )}
//     </>
//   );
// }