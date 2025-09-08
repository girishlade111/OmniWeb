"use client";
import { useState, useContext, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { OsContext } from './OsContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const os = useContext(OsContext);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!os) return null;

  const filteredApps = os.apps.filter(app =>
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpenApp = (appId: string) => {
    os.openApp(appId);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto" ref={searchRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Apps & Web"
          className="pl-10 h-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </div>

      {isFocused && query && (
        <div className="absolute top-full mt-2 w-full bg-card border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredApps.length > 0 ? (
            filteredApps.map(app => (
              <div
                key={app.id}
                className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer"
                onClick={() => handleOpenApp(app.id)}
              >
                <app.Icon className="h-5 w-5 text-primary" />
                <span>{app.name}</span>
              </div>
            ))
          ) : (
             <div
                className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer"
                onClick={() => handleOpenApp('browser')}
              >
                <SearchIcon className="h-5 w-5 text-primary" />
                <span>Search web for &quot;{query}&quot;</span>
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
