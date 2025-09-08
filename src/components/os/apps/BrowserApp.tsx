"use client";
import { useState, useRef, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RefreshCw, Home, Search } from 'lucide-react';

const BrowserApp = () => {
  const [url, setUrl] = useState('https://duckduckgo.com/');
  const [inputValue, setInputValue] = useState("https://duckduckgo.com/");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigation = (e: React.FormEvent) => {
    e.preventDefault();
    let newUrl = inputValue;
    if (!/^(https?:\/\/)/.test(newUrl)) {
      newUrl = `https://duckduckgo.com/?q=${encodeURIComponent(newUrl)}`;
    }
    setUrl(newUrl);
  };
  
  const refreshPage = () => {
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-2 border-b flex items-center gap-2 bg-background">
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled><ArrowLeft /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled><ArrowRight /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={refreshPage}><RefreshCw /></Button>
        <form onSubmit={handleNavigation} className="flex-grow flex items-center">
          <Input 
            name="url" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-8" 
          />
          <Button type="submit" variant="ghost" size="icon" className="h-8 w-8"><Search /></Button>
        </form>
      </div>
      <div className="flex-grow bg-white">
        <iframe 
          ref={iframeRef}
          src={url} 
          className="w-full h-full border-0" 
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-presentation"
          title="OmniWeb Browser"
        />
      </div>
    </div>
  );
};

export default BrowserApp;
