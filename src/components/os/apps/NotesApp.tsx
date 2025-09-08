"use client";

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const NotesApp = () => {
  const [note, setNote] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedNote = localStorage.getItem('omni-notes');
      if (savedNote) {
        setNote(savedNote);
      }
    } catch (e) {
      console.error("Could not load notes from localStorage", e);
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('omni-notes', note);
      // Maybe add a toast here for feedback
    } catch (e) {
      console.error("Could not save notes to localStorage", e);
    }
  };

  useEffect(() => {
    if (isMounted) {
      const saveTimeout = setTimeout(handleSave, 1000);
      return () => clearTimeout(saveTimeout);
    }
  }, [note, isMounted]);

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Notes</h2>
      </div>
      <div className="flex-grow p-4">
        <Textarea
          placeholder="Start typing your note..."
          className="w-full h-full resize-none border-0 focus-visible:ring-0 p-0"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="p-2 border-t text-right text-xs text-muted-foreground">
        {note.length} characters
      </div>
    </div>
  );
};

export default NotesApp;
