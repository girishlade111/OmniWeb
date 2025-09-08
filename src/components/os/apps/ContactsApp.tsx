"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Search } from 'lucide-react';

const mockContacts = [
  { name: 'Alice Johnson', email: 'alice.j@example.com', avatar: '101' },
  { name: 'Bob Williams', email: 'bob.w@example.com', avatar: '102' },
  { name: 'Charlie Brown', email: 'charlie.b@example.com', avatar: '103' },
  { name: 'Diana Miller', email: 'diana.m@example.com', avatar: '104' },
  { name: 'Ethan Davis', email: 'ethan.d@example.com', avatar: '105' },
  { name: 'Fiona Garcia', email: 'fiona.g@example.com', avatar: '106' },
  { name: 'George Rodriguez', email: 'george.r@example.com', avatar: '107' },
];

const ContactsApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Contacts</h2>
        <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search contacts" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {filteredContacts.map(contact => (
            <div key={contact.email} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
              <Avatar>
                <AvatarImage src={`https://picsum.photos/id/${contact.avatar}/40/40`} data-ai-hint="person portrait" />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsApp;
