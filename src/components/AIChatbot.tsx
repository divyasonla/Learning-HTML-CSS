import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { speechService } from '@/services/speech';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatbotProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const AIChatbot = ({ isOpen: isOpenProp, setIsOpen: setIsOpenProp }: AIChatbotProps) => {
  const [isOpenState, setIsOpenState] = useState(false);
  const isOpen = typeof isOpenProp === 'boolean' ? isOpenProp : isOpenState;
  const setIsOpen = setIsOpenProp || setIsOpenState;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm your HTML & CSS learning assistant. Ask me anything about web development!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const speechSupport = speechService.isSupported();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content,
            })),
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (response.status === 402) {
          throw new Error('AI credits exhausted. Please try again later.');
        }
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      const assistantId = (Date.now() + 1).toString();

      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);

            if (line.endsWith('\r')) line = line.slice(0, -1);
            if (line.startsWith(':') || line.trim() === '') continue;
            if (!line.startsWith('data: ')) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantId ? { ...m, content: assistantContent } : m
                  )
                );
              }
            } catch {
              buffer = line + '\n' + buffer;
              break;
            }
          }
        }
      }

      // Auto-speak response if enabled
      if (autoSpeak && assistantContent && speechSupport.speech) {
        speakText(assistantContent);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again!`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startVoiceInput = async () => {
    if (!speechSupport.recognition) {
      toast({
        title: 'Not Supported',
        description: 'Voice input is not supported in your browser.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsListening(true);
      const result = await speechService.startListening();
      setIsListening(false);
      
      if (result.transcript) {
        setInput(result.transcript);
        // Auto-send after voice input
        handleSend(result.transcript);
      }
    } catch (error) {
      setIsListening(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage !== 'no-speech') {
        toast({
          title: 'Voice Input Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    }
  };

  const stopVoiceInput = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const speakText = async (text: string) => {
    if (!speechSupport.speech) {
      toast({
        title: 'Not Supported',
        description: 'Text-to-speech is not supported in your browser.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSpeaking(true);
      // Clean markdown for speech
      const cleanText = text
        .replace(/```[\s\S]*?```/g, 'code example')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/#{1,6}\s/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      
      await speechService.speak(cleanText, { rate: 1 });
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full gradient-primary shadow-lg hover:shadow-xl"
              size="icon"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-2 right-2 z-50 bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden resize"
            style={{ minWidth: 340, minHeight: 340, width: 520, height: 'calc(100vh - 1rem)', maxWidth: 'calc(100vw - 1rem)', maxHeight: 'calc(100vh - 1rem)', resize: 'both' }}
          >
            {/* Header */}
            <div className="p-4 border-b bg-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">HTML & CSS Helper</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Auto-speak toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAutoSpeak(!autoSpeak)}
                  className={autoSpeak ? 'text-primary' : 'text-muted-foreground'}
                  title={autoSpeak ? 'Auto-speak on' : 'Auto-speak off'}
                >
                  {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex w-full mb-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* AI message: avatar on left, bubble left-aligned */}
                    {message.role === 'assistant' && (
                      <>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted mr-2 mt-auto">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div
                          className="max-w-[70%] bg-muted rounded-2xl rounded-tl-none px-4 py-2 text-left break-words whitespace-pre-wrap shadow"
                          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                          {/* Speak button for assistant messages */}
                          {message.content && speechSupport.speech && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-6 px-2 text-xs"
                              onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
                            >
                              {isSpeaking ? <VolumeX className="w-3 h-3 mr-1" /> : <Volume2 className="w-3 h-3 mr-1" />}
                              {isSpeaking ? 'Stop' : 'Listen'}
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                    {/* User message: bubble right-aligned, no avatar */}
                    {message.role === 'user' && (
                      <div
                        className="max-w-[70%] bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2 text-right ml-auto break-words whitespace-pre-wrap shadow"
                        style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                      >
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? 'Listening...' : 'Ask about HTML, CSS...'}
                  disabled={isLoading || isListening}
                  className="flex-1"
                />
                {/* Voice input button */}
                {speechSupport.recognition && (
                  <Button
                    onClick={isListening ? stopVoiceInput : startVoiceInput}
                    disabled={isLoading}
                    size="icon"
                    variant={isListening ? 'destructive' : 'outline'}
                    className={isListening ? 'animate-pulse' : ''}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
