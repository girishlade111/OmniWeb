"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from 'lucide-react';
import { cn } from "@/lib/utils";

const messages = [
  { sender: 'other', text: 'Hey, are you free for the project sync-up tomorrow?' },
  { sender: 'me', text: 'Yeah, I should be. What time works for you?' },
  { sender: 'other', text: 'How about 10 AM? We can go over the latest designs.' },
  { sender: 'me', text: 'Sounds good to me! See you then.' },
];

const MessagesApp = () => {
  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-3 border-b flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://picsum.photos/id/102/40/40" data-ai-hint="person portrait" />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">Bob Williams</h2>
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={cn("flex items-end gap-2", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
              {msg.sender === 'other' && <Avatar className="h-6 w-6"><AvatarImage src="https://picsum.photos/id/102/24/24" data-ai-hint="person portrait"/><AvatarFallback>B</AvatarFallback></Avatar>}
              <div className={cn("max-w-[70%] rounded-2xl px-4 py-2", msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 border-t flex items-center gap-2">
        <Input placeholder="Type a message..." className="h-9"/>
        <Button size="icon" className="h-9 w-9 flex-shrink-0"><Send /></Button>
      </div>
    </div>
  );
};

export default MessagesApp;
