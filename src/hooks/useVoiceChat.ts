"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { maslowInfo } from '@/DataModels/MaslowInfoDataModel';
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
  const [additionalInfo, setAdditionalInfo] = useState<any>(null);
  
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
    setIsListening(false);
    setLoading(false);
    setTranscript('');
    setResponse('');
    setContentType(null);
    setShowModal(false);
    setIsWaitingForTrigger(false);
    setAdditionalInfo(null);
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
    
    // Enhanced command patterns to match more topics from our consolidated information
    const commandPatterns = {
      team: /team|members|employees|staff|who.*work|people.*company/i,
      company: /company|business|organization|about.*maslow|what.*maslow|services|vision/i,
      contact: /contact|reach|email|phone|address|location|where|social/i,
      openSource: /open.?source|proprietary|tools comparison|ai tools|software comparison/i,
      productivity: /productivity|employee productivity|boost productivity|efficiency|workflow/i,
      enterprise: /enterprise|transformation|industry|trends|digital transformation/i,
      costManagement: /cost|budget|expense|roi|investment|financial|pricing|money/i,
      riskManagement: /risk|security|compliance|governance|ethics|bias|privacy|regulation/i,
      byoai: /byoai|bring your own|custom ai|custom solution|proprietary ai|build your own/i,
      aiCapabilities: /capabilities|features|what can.*do|functions|abilities/i
    };

    // Default to AI response
    let matchedType: ContentType = 'ai';
    let topicInfo = null;
    
    // Check for specific topics in the transcript
    for (const [type, pattern] of Object.entries(commandPatterns)) {
      if (pattern.test(text)) {
        // Handle special content types
        if (type === 'openSource') {
          matchedType = 'blog';
          topicInfo = {
            blogKey: 'open-source-vs-proprietary',
            title: maslowInfo.blogs['open-source-vs-proprietary'].title
          };
          break;
        } else if (type === 'productivity') {
          matchedType = 'blog';
          topicInfo = {
            blogKey: 'unlocking-employee-productivity',
            title: maslowInfo.blogs['unlocking-employee-productivity'].title
          };
          break;
        } else if (type === 'enterprise') {
          matchedType = 'blog';
          topicInfo = {
            blogKey: 'enterprise-ai-transformation',
            title: maslowInfo.blogs['enterprise-ai-transformation'].title
          };
          break;
        } else if (type === 'costManagement') {
          matchedType = 'blog';
          topicInfo = {
            blogKey: 'cost-management',
            title: maslowInfo.blogs['cost-management'].title
          };
          break;
        } else if (type === 'riskManagement') {
          matchedType = 'blog';
          topicInfo = {
            blogKey: 'risk-management',
            title: maslowInfo.blogs['risk-management'].title
          };
          break;
        } else if (type === 'byoai') {
          matchedType = 'blog';
          topicInfo = {
            blogKey: 'byoai',
            title: maslowInfo.blogs['byoai'].title
          };
          break;
        } else if (type === 'aiCapabilities') {
          matchedType = 'capabilities';
          topicInfo = {
            capabilities: maslowInfo.aiCapabilities,
            productivityTools: maslowInfo.productivityTools
          };
          break;
        } else {
          matchedType = type as ContentType;
          break;
        }
      }
    }
  
    setContentType(matchedType);
    setAdditionalInfo(topicInfo);
    setShowModal(true);
  
    if (matchedType === 'ai') {
      try {
        // Enhance the AI prompt with Maslow information for better context
        const enhancedPrompt = `
          As Maslow AI's voice assistant, please answer the following question:
          "${text}"
          
          Here's some context about Maslow AI:
          - We are an enterprise AI solutions provider
          - Our services include: ${maslowInfo.company.services.join(', ')}
          - Our vision: ${maslowInfo.company.vision}
        `;

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: enhancedPrompt
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
      setIsWaitingForTrigger(false); // Remove the waiting state after processing
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
          {
            type: 'function',
            name: 'getBlogInfo',
            description: 'Get information from Maslow blog posts',
            parameters: {
              type: 'object',
              properties: {
                topic: {
                  type: 'string',
                  enum: [
                    'open-source-vs-proprietary',
                    'unlocking-employee-productivity',
                    'enterprise-ai-transformation',
                    'cost-management',
                    'risk-management',
                    'byoai'
                  ],
                  description: 'The specific blog topic to retrieve information about'
                }
              }
            }
          },
          {
            type: 'function',
            name: 'getAICapabilities',
            description: 'Get information about Maslow AI capabilities',
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
        case 'getBlogInfo':
          setContentType('blog');
          // Parse arguments to determine which blog to show
          try {
            const args = JSON.parse(msg.arguments);
            if (args.topic && maslowInfo.blogs[args.topic]) {
              setAdditionalInfo({
                blogKey: args.topic,
                title: maslowInfo.blogs[args.topic].title
              });
            } else {
              // Default to first blog if topic not specified
              const firstBlogKey = Object.keys(maslowInfo.blogs)[0];
              setAdditionalInfo({
                blogKey: firstBlogKey,
                title: maslowInfo.blogs[firstBlogKey].title
              });
            }
          } catch (e) {
            console.error('Error parsing blog arguments:', e);
          }
          break;
        case 'getAICapabilities':
          setContentType('capabilities');
          setAdditionalInfo({
            capabilities: maslowInfo.aiCapabilities,
            productivityTools: maslowInfo.productivityTools
          });
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
      if (typeof window === 'undefined') return

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
        setIsWaitingForTrigger(false); // Start listening immediately
        setError('');
      };

      recognition.current.onresult = (event: any) => {
        if (!isRecognitionActive.current) return; 

        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult[0].transcript.toLowerCase().trim();

        if (commandTimeout.current) {
          clearTimeout(commandTimeout.current);
        }

        setTranscript(transcript);

        if (lastResult.isFinal && !isInterrupted) {
          commandTimeout.current = setTimeout(() => {
            handleVoiceCommand(transcript);
          }, 1000);
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
    teamData: maslowInfo.team,
    companyInfo: maslowInfo.company,
    contactInfo: maslowInfo.contact,
    blogInfo: additionalInfo?.blogKey ? maslowInfo.blogs[additionalInfo.blogKey] : null,
    aiCapabilities: maslowInfo.aiCapabilities,
    productivityTools: maslowInfo.productivityTools,
    additionalInfo,
    startListening,
    stopListening,
    setShowModal,
    isWaitingForTrigger
  };
}