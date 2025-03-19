"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { teamMembers } from '@/DataModels/TeamDataModel';
import { ContentType } from '@/lib/types';

export function useVoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contentType, setContentType] = useState<ContentType>(null);
  const [showModal, setShowModal] = useState(false);
  const [isWaitingForTrigger, setIsWaitingForTrigger] = useState(false);
  const [isInterrupted, setIsInterrupted] = useState(false);
  
  // WebRTC and OpenAI setup
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  
  const recognition = useRef<any>(null);
  const commandTimeout = useRef<NodeJS.Timeout | null>(null);
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;
  const isRecognitionActive = useRef(false);

  const cleanup = useCallback(() => {
    console.log('Running cleanup...');
    if (commandTimeout.current) {
      clearTimeout(commandTimeout.current);
      commandTimeout.current = null;
    }
    
    if (recognition.current) {
      try {
        if (isRecognitionActive.current) {
          recognition.current.stop();
        }
      } catch (err) {
        console.warn('Error stopping recognition during cleanup:', err);
      }
      recognition.current = null;
    }
    
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    
    isRecognitionActive.current = false;
    setIsInterrupted(false);
  }, [peerConnection]);

  const handleNetworkError = () => {
    setError('Network error detected. Please check your internet connection.');
    setIsListening(false);
  };

  const handleVoiceCommand = useCallback(async (text: string) => {
    if (!text || isInterrupted) return;
    setLoading(true);

    const interruptPhrases = ['stop', 'be quiet', 'shut up', 'enough'];

    if (interruptPhrases.some(phrase => text.toLowerCase().includes(phrase))) {
      setIsInterrupted(true);
      setLoading(false);
      setResponse('');
      setIsWaitingForTrigger(true);
      return;
    }
    
    const commandPatterns = {
      team: /team|members|employees|staff|who.*work|people.*company/i,
      company: /company|business|organization|about.*maslow|what.*maslow/i,
      contact: /contact|reach|email|phone|address|location|where/i
    };
  
    let matchedType: ContentType = 'ai';
    for (const [type, pattern] of Object.entries(commandPatterns)) {
      if (pattern.test(text)) {
        matchedType = type as ContentType;
        break;
      }
    }
  
    setContentType(matchedType);
    setShowModal(true);
  
    if (matchedType === 'ai') {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: text
              }
            ]
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        if (!isInterrupted) {
          setResponse(data.message || 'I apologize, but I was unable to generate a response.');
        }
      } catch (err: any) {
        console.error('API error:', err);
        if (!isInterrupted) {
          setError(`Failed to process request: ${err.message}`);
          setResponse('I apologize, but I encountered an error while processing your request.');
        }
      }
    }

    if (!isInterrupted) {
      setLoading(false);
      setTranscript('');
      setIsWaitingForTrigger(true);
    }
  }, [isInterrupted]);

  const configureDataChannel = (dc: RTCDataChannel) => {
    const event = {
      type: 'session.update',
      session: {
        modalities: ['text', 'audio'],
        tools: [
          {
            type: 'function',
            name: 'getTeamInfo',
            description: 'Get information about the team members',
          },
          {
            type: 'function',
            name: 'getCompanyInfo',
            description: 'Get company information and services',
          },
          {
            type: 'function',
            name: 'getContactInfo',
            description: 'Get contact information',
          },
        ],
      },
    };
    dc.send(JSON.stringify(event));
  };

  const handleMessage = async (ev: MessageEvent) => {
    const msg = JSON.parse(ev.data);
    
    if (msg.type === 'response.function_call_arguments.done') {
      switch (msg.name) {
        case 'getTeamInfo':
          setContentType('team');
          break;
        case 'getCompanyInfo':
          setContentType('company');
          break;
        case 'getContactInfo':
          setContentType('contact');
          break;
      }
      
      const event = {
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: msg.call_id,
          output: JSON.stringify({ success: true }),
        },
      };
      dataChannel?.send(JSON.stringify(event));
      dataChannel?.send(JSON.stringify({ type: "response.create" }));
    }
  };

  const initializeWebRTC = useCallback(async () => {
    try {
      const pc = new RTCPeerConnection();
      setPeerConnection(pc);

      pc.ontrack = (event) => {
        const audioEl = document.createElement('audio');
        audioEl.srcObject = event.streams[0];
        audioEl.autoplay = true;
        audioEl.controls = true;
        // document.body.appendChild(audioEl);
      };

      const dc = pc.createDataChannel('oai-events');
      setDataChannel(dc);

      dc.onopen = () => {
        configureDataChannel(dc);
      };

      dc.onmessage = handleMessage;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => pc.addTransceiver(track, { direction: 'sendrecv' }));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: transcript
        })
      });
      const data = await response.json();
      const EPHEMERAL_KEY = data.result.client_secret.value;

      const answer = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`,
        {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${EPHEMERAL_KEY}`,
            'Content-Type': 'application/sdp',
          },
        }
      ).then(r => r.text());

      await pc.setRemoteDescription({ type: 'answer', sdp: answer });

    } catch (err) {
      console.error('WebRTC setup error:', err);
      setError('Failed to initialize voice chat');
    }
  }, [transcript]);

  const startListening = useCallback(async () => {
    try {
      if (typeof window === 'undefined') return;
      
      cleanup();
      
      if (!('webkitSpeechRecognition' in window)) {
        setError('Speech recognition is not supported in this browser.');
        return;
      }

      const SpeechRecognition = window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onstart = () => {
        isRecognitionActive.current = true;
        setIsListening(true);
        setIsWaitingForTrigger(true);
        setError('');
      };

      recognition.current.onresult = (event: any) => {
        if (!isRecognitionActive.current) return; 

        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult[0].transcript.toLowerCase().trim();
        
        if (commandTimeout.current) {
          clearTimeout(commandTimeout.current);
        }

          
        if (isWaitingForTrigger) {
          if (transcript.includes('hey maslow') || transcript.includes('hi maslow')) {
            setIsWaitingForTrigger(false);
            setTranscript('');
            setIsInterrupted(false);
          }
        } else {
          setTranscript(transcript);
        
          if (lastResult.isFinal && !isInterrupted) {
            commandTimeout.current = setTimeout(() => {
              handleVoiceCommand(transcript);
            }, 1000);
          }
        }
      };

      recognition.current.onend = () => {
        const wasActive = isRecognitionActive.current;
        isRecognitionActive.current = false;
        
        if (isListening && !loading && wasActive && !isInterrupted) {
          setTimeout(() => {
            if (isListening && !isRecognitionActive.current && recognition.current) {
              try {
                recognition.current.start();
              } catch (err) {
                console.warn('Failed to restart recognition:', err);
                setIsListening(false);
              }
            }
          }, 300);
        } else {
          setIsListening(false);
        }
      };

      recognition.current.onerror = (event: any) => {
        if (event.error === 'aborted') {
          isRecognitionActive.current = false;
          return;
        }
        
        switch (event.error) {
          case 'network':
            handleNetworkError();
            break;
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access and try again.');
            setIsListening(false);
            break;
          case 'no-speech':
            console.log('No speech detected');
            break;
          default:
            if (retryCount.current < MAX_RETRIES) {
              retryCount.current++;
              setTimeout(() => {
                startListening();
              }, 1000);
            } else {
              setError(`Recognition error: ${event.error}. Please try again.`);
              setIsListening(false);
            }
        }
      };

      await initializeWebRTC();
      
      retryCount.current = 0;
      setError('');
      
      if (recognition.current) {
        recognition.current.start();
      }
    } catch (err) {
      console.error('Error starting voice chat:', err);
      setError('Failed to start voice chat. Please refresh and try again.');
      setIsListening(false);
    }
  }, [cleanup, isListening, loading, handleVoiceCommand, isInterrupted, initializeWebRTC]);

  const stopListening = useCallback(() => {
    cleanup();
    setIsListening(false);
    setIsWaitingForTrigger(false);
    setTranscript('');
  }, [cleanup]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanup();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanup();
      setIsListening(false);
      setIsWaitingForTrigger(false);
      setTranscript('');
    };
  }, [cleanup]);

  return {
    isListening,
    loading,
    transcript,
    response,
    error,
    showModal,
    contentType,
    teamData: teamMembers,
    startListening,
    stopListening,
    setShowModal,
    isWaitingForTrigger
  };
}


// import { useState, useRef, useEffect, useCallback } from 'react';
// import { TeamMember, teamMembers } from '@/DataModels/TeamDataModel';

// export function useVoiceChat() {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [contentType, setContentType] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isWaitingForTrigger, setIsWaitingForTrigger] = useState(false);
  
//   const recognition = useRef(null);
//   const commandTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const MAX_RETRIES = 3;
//   const isRecognitionActive = useRef(false);

//   // Improved cleanup with clear status updates
//   const cleanup = useCallback(() => {
//     console.log('Running cleanup...');
//     if (commandTimeout.current) {
//       clearTimeout(commandTimeout.current);
//       commandTimeout.current = null;
//     }
    
//     if (recognition.current) {
//       try {
//         if (isRecognitionActive.current) {
//           console.log('Stopping active recognition during cleanup');
//           recognition.current.stop();
//         }
//       } catch (err) {
//         console.warn('Error stopping recognition during cleanup:', err);
//       }
//       recognition.current = null;
//     }
    
//     isRecognitionActive.current = false;
//   }, []);

//   const initializeSpeechRecognition = useCallback(() => {
//     if (typeof window === 'undefined') return;
    
//     // Always clean up first
//     cleanup();
    
//     console.log('Initializing speech recognition');
    
//     // Check browser support
//     if (!('webkitSpeechRecognition' in window)) {
//       setError('Speech recognition is not supported in this browser.');
//       return;
//     }

//     try {
//       const SpeechRecognition = window.webkitSpeechRecognition;
//       recognition.current = new SpeechRecognition();
//       recognition.current.continuous = true;
//       recognition.current.interimResults = true;
//       recognition.current.lang = 'en-US';

//       recognition.current.onstart = () => {
//         console.log('Recognition STARTED - setting active states');
//         isRecognitionActive.current = true;
//         setIsListening(true);
//         setIsWaitingForTrigger(true);
//         setError('');
//       };

//       recognition.current.onresult = (event) => {
//         if (!isRecognitionActive.current) return;
        
//         const lastResult = event.results[event.results.length - 1];
//         const transcript = lastResult[0].transcript.toLowerCase().trim();
        
//         if (commandTimeout.current) {
//           clearTimeout(commandTimeout.current);
//         }

//         if (isWaitingForTrigger) {
//           if (transcript.includes('hey maslow') || transcript.includes('hi maslow')) {
//             console.log('Trigger word detected!');
//             setIsWaitingForTrigger(false);
//             setTranscript('');
//           }
//         } else {
//           setTranscript(transcript);
          
//           if (lastResult.isFinal) {
//             commandTimeout.current = setTimeout(() => {
//               handleVoiceCommand(transcript);
//               setIsWaitingForTrigger(true);
//             }, 1000);
//           }
//         }
//       };

//       recognition.current.onend = () => {
//         console.log('Recognition ENDED');
//         const wasActive = isRecognitionActive.current;
//         isRecognitionActive.current = false;
        
//         // Only restart if we were actually listening and it wasn't manually stopped
//         if (isListening && !loading && wasActive) {
//           const restartDelay = 300;
//           console.log(`Scheduling restart in ${restartDelay}ms`);
          
//           setTimeout(() => {
//             if (isListening && !isRecognitionActive.current && recognition.current) {
//               console.log('Attempting to restart recognition');
//               try {
//                 recognition.current.start();
//               } catch (err) {
//                 console.warn('Failed to restart recognition:', err);
//                 setIsListening(false);
//               }
//             }
//           }, restartDelay);
//         } else {
//           console.log('Not restarting recognition - setting isListening to false');
//           setIsListening(false);
//         }
//       };

//       recognition.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
        
//         // Only react to serious errors, ignore aborted during development
//         if (event.error === 'aborted') {
//           console.log('Recognition aborted - likely due to hot reload');
//           isRecognitionActive.current = false;
//           return; // Don't do anything else for aborted errors
//         }
        
//         switch (event.error) {
//           case 'network':
//             handleNetworkError();
//             break;
//           case 'not-allowed':
//             setError('Microphone access denied. Please allow microphone access and try again.');
//             setIsListening(false);
//             break;
//           case 'no-speech':
//             // Don't show error for no speech, just log it
//             console.log('No speech detected');
//             break;
//           default:
//             if (retryCount.current < MAX_RETRIES) {
//               retryCount.current++;
//               setTimeout(() => {
//                 startListening();
//               }, 1000);
//             } else {
//               setError(`Recognition error: ${event.error}. Please try again.`);
//               setIsListening(false);
//             }
//         }
//       };

//     } catch (err) {
//       console.error('Error initializing speech recognition:', err);
//       setError('Failed to initialize speech recognition. Please refresh the page.');
//     }
//   }, [isWaitingForTrigger, loading, isListening, cleanup]);

//   // Improved startListening with better state handling
//   const startListening = useCallback(() => {
//     console.log('Start listening called');
//     try {
//       // Always re-initialize for consistent state
//       initializeSpeechRecognition();
      
//       retryCount.current = 0;
//       setError('');
      
//       console.log('Starting recognition...');
//       if (recognition.current) {
//         recognition.current.start();
//       }
//     } catch (err) {
//       console.error('Error starting speech recognition:', err);
//       setError('Failed to start speech recognition. Please refresh and try again.');
//       setIsListening(false);
//     }
//   }, [initializeSpeechRecognition]);

//   // Improved stopListening with clear state reset
//   const stopListening = useCallback(() => {
//     console.log('Stop listening called');
//     cleanup();
//     setIsListening(false);
//     setIsWaitingForTrigger(false);
//     setTranscript('');
//   }, [cleanup]);

//   const handleNetworkError = () => {
//     setError('Network error detected. Please check your internet connection.');
//     setIsListening(false);
//   };

//   const handleVoiceCommand = useCallback(async (text) => {
//     if (!text) return;
//     setLoading(true);
//     console.log('Processing command:', text);
  
//     // Check for command patterns
//     const commandPatterns = {
//       team: /team|members|employees|staff|who.*work|people.*company/i,
//       company: /company|business|organization|about.*maslow|what.*maslow/i,
//       contact: /contact|reach|email|phone|address|location|where/i
//     };
  
//     let matchedType = 'ai';
//     for (const [type, pattern] of Object.entries(commandPatterns)) {
//       if (pattern.test(text)) {
//         matchedType = type;
//         break;
//       }
//     }
  
//     setContentType(matchedType);
//     setShowModal(true);
  
//     if (matchedType === 'ai') {
//       try {
//         const response = await fetch('/api/chat', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             messages: [
//               {
//                 role: "system",
//                 content: `You are an AI assistant for Maslow AI, a company focused on practical AI solutions. 
//                          Provide helpful, concise responses. If you're not sure about something specific to 
//                          Maslow AI, provide general information related to the topic.`
//               },
//               {
//                 role: "user",
//                 content: text
//               }
//             ]
//           })
//         });
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         if (data.error) {
//           throw new Error(data.error);
//         }
        
//         setResponse(data.message || 'I apologize, but I was unable to generate a response.');
//       } catch (err) {
//         console.error('API error:', err);
//         setError(`Failed to process request: ${err.message}`);
//         setResponse('I apologize, but I encountered an error while processing your request.');
//       }
//     }
  
//     setLoading(false);
//     setTranscript('');
//     setIsWaitingForTrigger(true);
//   }, []);

//   useEffect(() => {
//     console.log('VoiceChat hook mounting...');
    
//     // This is crucial - explicitly handle hot reloading and page transitions
//     const handleBeforeUnload = () => {
//       console.log('Page unloading - cleaning up recognition');
//       cleanup();
//     };
    
//     window.addEventListener('beforeunload', handleBeforeUnload);
    
//     // Enhanced cleanup
//     return () => {
//       console.log('VoiceChat hook unmounting...');
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       cleanup();
//       // Set all state to initial values
//       setIsListening(false);
//       setIsWaitingForTrigger(false);
//       setTranscript('');
//     };
//   }, [cleanup]);

//   return {
//     isListening,
//     loading,
//     transcript,
//     response,
//     error,
//     showModal,
//     contentType,
//     teamData: teamMembers,
//     startListening,
//     stopListening,
//     setShowModal,
//     isWaitingForTrigger
//   };
// }