'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useLoanContext } from '@/contexts/loan-context';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { getFinancialChatResponse } from '@/lib/actions';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import React from 'react';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function AiChat() {
  const { loans } = useLoanContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitialMessage = async () => {
    setIsLoading(true);
    try {
      const response = await getFinancialChatResponse({ loans, messages: [] });
      if (response.success && response.data) {
        setMessages([{ role: 'model', content: response.data.content }]);
      } else {
        setMessages([
          {
            role: 'model',
            content: 'Sorry, I am having trouble connecting. Please try again later.',
          },
        ]);
      }
    } catch (e) {
      setMessages([
        {
          role: 'model',
          content: 'Sorry, I am having trouble connecting. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loans.length > 0) {
      getInitialMessage();
    } else {
        setMessages([{
            role: 'model',
            content: "You don't have any active loans. Add a loan to start chatting with the AI advisor."
        }])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loans]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getFinancialChatResponse({ loans, messages: newMessages });
      if (response.success && response.data) {
        setMessages([...newMessages, { role: 'model', content: response.data.content }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'model',
            content: response.error || 'Sorry, something went wrong.',
          },
        ]);
      }
    } catch (error) {
       setMessages([
          ...newMessages,
          {
            role: 'model',
            content: 'Failed to get a response from the server.',
          },
        ]);
    } finally {
        setIsLoading(false);
    }
  };

  const MemoizedMessage = React.memo(({ message }: { message: Message }) => {
    const isModel = message.role === 'model';
    return (
        <div className={cn('flex items-start gap-3', isModel ? '' : 'justify-end')}>
            {isModel && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot/></AvatarFallback>
                </Avatar>
            )}
            <div className={cn(
                'max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg',
                 isModel ? 'bg-secondary' : 'bg-primary text-primary-foreground'
            )}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
             {!isModel && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
            )}
        </div>
    )
  });
  MemoizedMessage.displayName = 'MemoizedMessage';

  return (
    <Card className="flex-grow flex flex-col">
      <CardHeader className="border-b">
        <h3 className="text-lg font-semibold">Chat with your Advisor</h3>
      </CardHeader>
      <CardContent className="flex-grow p-0">
          <ScrollArea className="h-96 md:h-[500px] p-4" ref={scrollAreaRef}>
             <div className="space-y-4">
                {messages.map((message, index) => (
                    <MemoizedMessage key={index} message={message} />
                ))}
                {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
                    <div className="flex items-center gap-3">
                         <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot/></AvatarFallback>
                        </Avatar>
                        <div className="bg-secondary px-4 py-3 rounded-lg">
                           <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                )}
             </div>
          </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="Ask about your loans..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || loans.length === 0}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
