"use client";
import { Folder, FileText, Image, Music } from 'lucide-react';

const files = [
  { name: 'Documents', type: 'folder', icon: Folder },
  { name: 'Pictures', type: 'folder', icon: Folder },
  { name: 'Music', type: 'folder', icon: Music },
  { name: 'Project-Proposal.docx', type: 'file', icon: FileText, size: '1.2MB' },
  { name: 'vacation-photo.jpg', type: 'file', icon: Image, size: '4.5MB' },
  { name: 'background-theme.mp3', type: 'file', icon: Music, size: '3.8MB' },
];

const FileExplorerApp = () => {
  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">File Explorer</h2>
      </div>
      <div className="flex-grow p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {files.map((file) => (
          <div key={file.name} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted cursor-pointer">
            <file.icon className={`w-12 h-12 ${file.type === 'folder' ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className="mt-2 text-xs text-center truncate w-full">{file.name}</p>
          </div>
        ))}
      </div>
       <div className="p-2 border-t text-center text-sm text-muted-foreground">
        6 items
      </div>
    </div>
  );
};

export default FileExplorerApp;
