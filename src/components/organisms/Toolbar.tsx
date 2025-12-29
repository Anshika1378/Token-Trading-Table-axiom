'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { IconButton, Tooltip } from '@/components/atoms';
import { 
  Settings, 
  Bookmark,
  Grid,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  HelpCircle,
  ChevronDown,
  Zap
} from 'lucide-react';

interface ToolbarProps {
  className?: string;
}

export const Toolbar = memo(function Toolbar({ className }: ToolbarProps) {
  const [isMuted, setIsMuted] = React.useState(false);

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-2',
        'bg-[#0d0d10] border-b border-zinc-800/50',
        className
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap size={20} className="text-cyan-400" />
          Pulse
        </h1>
        
        {/* Pulse Badge */}
        <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/10 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-400 font-medium">Live</span>
        </div>

        {/* Settings Icon */}
        <Tooltip content="Pulse Settings">
          <IconButton aria-label="Settings" size="sm" variant="ghost">
            <Settings size={16} />
          </IconButton>
        </Tooltip>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Help */}
        <Tooltip content="Help & Tooltips">
          <IconButton aria-label="Help" size="sm" variant="ghost">
            <HelpCircle size={16} />
          </IconButton>
        </Tooltip>

        {/* Display Dropdown */}
        <button
          className={cn(
            'flex items-center gap-2 px-3 py-1.5',
            'bg-zinc-800 hover:bg-zinc-700 rounded-md',
            'text-sm text-zinc-300 transition-colors'
          )}
        >
          <Grid size={14} />
          <span>Display</span>
          <ChevronDown size={14} className="text-zinc-500" />
        </button>

        {/* Bookmarks */}
        <Tooltip content="Bookmarks">
          <IconButton aria-label="Bookmarks" size="sm" variant="ghost">
            <Bookmark size={16} />
          </IconButton>
        </Tooltip>

        {/* View Options */}
        <Tooltip content="Grid View">
          <IconButton aria-label="Grid view" size="sm" variant="ghost">
            <Grid size={16} />
          </IconButton>
        </Tooltip>

        {/* Sound Toggle */}
        <Tooltip content={isMuted ? 'Unmute sounds' : 'Mute sounds'}>
          <IconButton 
            aria-label={isMuted ? 'Unmute' : 'Mute'} 
            size="sm" 
            variant="ghost"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </IconButton>
        </Tooltip>

        {/* Settings */}
        <Tooltip content="Settings">
          <IconButton aria-label="Settings" size="sm" variant="ghost">
            <Settings size={16} />
          </IconButton>
        </Tooltip>

        {/* Quick Filter */}
        <div className="hidden lg:flex items-center gap-1 ml-2 px-2 py-1 bg-zinc-800 rounded-md">
          <span className="text-xs text-zinc-500">Quick:</span>
          <button className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors">
            1 ≡ 0
          </button>
        </div>
      </div>
    </div>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;


