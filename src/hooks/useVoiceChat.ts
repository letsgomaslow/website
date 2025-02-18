import { useState, useRef, useEffect, useCallback } from 'react';


const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;;

export function useVoiceChat() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const recognition = useRef(null);
  
    const stopListening = useCallback(() => {
      if (recognition.current) {
        recognition.current.stop();
        setIsListening(false);
      }
    }, []);
  
    const handleVoiceCommand = useCallback(async () => {
      if (!transcript) return;
      setLoading(true);
      stopListening();
  
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4-turbo-preview",
            messages: [{
              role: "user",
              content: transcript
            }],
            temperature: 0.7,
            max_tokens: 150
          })
        });
  
        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
          const aiResponse = data.choices[0].message.content;
          setResponse(aiResponse);
        } else {
          throw new Error('Invalid response from OpenAI');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error processing voice command';
        console.error('Error:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
        setTranscript('');
      }
    }, [transcript]);
  
    const initializeSpeechRecognition = useCallback(() => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.current.continuous = false;
        recognition.current.interimResults = false;
  
        recognition.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
        };
  
        recognition.current.onerror = (event) => {
          setError('Error with speech recognition: ' + event.error);
          setIsListening(false);
        };
  
        recognition.current.onend = () => {
          setIsListening(false);
        };
      } else {
        setError('Speech recognition is not supported in this browser.');
      }
    }, []);
  
    const startListening = useCallback(() => {
      setError('');
      if (recognition.current) {
        recognition.current.start();
        setIsListening(true);
      }
    }, []);
  
    useEffect(() => {
      initializeSpeechRecognition();
    }, [initializeSpeechRecognition]);
  
    useEffect(() => {
      if (transcript && !loading) {
        handleVoiceCommand();
      }
    }, [transcript, loading, handleVoiceCommand]);
  
    useEffect(() => {
      return () => {
        stopListening();
      };
    }, [stopListening]);
  
    return {
      isListening,
      loading,
      transcript,
      response,
      error,
      startListening,
      stopListening
    };
  }