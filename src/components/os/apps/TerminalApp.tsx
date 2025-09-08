"use client";

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';

const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to OmniTerm! Type "help" for commands.']);
  const [command, setCommand] = useState('');
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, `> ${command}`];
      let output = '';

      switch (command.toLowerCase()) {
        case 'help':
          output = 'Available commands: help, date, clear, uname';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case 'clear':
          setHistory([]);
          setCommand('');
          return;
        case 'uname':
          output = 'OmniWeb OS 1.0.0';
          break;
        default:
          output = `command not found: ${command}`;
      }
      setHistory([...newHistory, output]);
      setCommand('');
    }
  };

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex flex-col h-full bg-black text-white font-mono p-2">
      <div className="flex-grow overflow-y-auto text-sm">
        {history.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>
      <div className="flex items-center gap-2">
        <span>&gt;</span>
        <Input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;
