'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { IconButton, Tooltip } from '@/components/atoms';
import {  Bell, Star, Settings,  ChevronDown, Wallet, Menu} from 'lucide-react';
import { BiSearch } from "react-icons/bi"; 


interface HeaderProps {
  className?: string;
}

// Navigation items matching Axiom Trade
const navItems = [
  { label: 'Discover', href: '#', isActive: false },
  { label: 'Pulse', href: '#', isActive: true },
  { label: 'Trackers', href: '#', isActive: false },
  { label: 'Perpetuals', href: '#', isActive: false },
  { label: 'Yield', href: '#', isActive: false },
  { label: 'Vision', href: '#', isActive: false },
];

export const Header = memo(function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between px-4 h-14',
        'bg-[#0a0a0c] border-b border-zinc-800/50',
        className
      )}
    >
      {/* Left Section - Logo and Nav */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <img  src="https://miro.medium.com/v2/resize:fit:1400/0*qKVeg3_Z9JOMciTn.jpg" alt="Logo" className="h-20 w-30" />
          <span className="text-zinc-500 text-xs hidden sm:block">Pro</span>
        </div>

        {/* Mobile Menu Button */}
        <IconButton 
          aria-label="Menu" 
          size="md" 
          variant="ghost"
          className="lg:hidden"
        >
          <Menu size={20} />
        </IconButton>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                item.isActive
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
         {/* Search */}
          <div className="relative w-[280px]">
            <BiSearch  className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg" />
            <input
              type="search"
              placeholder="Search by Token or CA..."
              className="w-full h-10 pl-10 pr-4 rounded-2xl bg-transparent text-white border border-white/40 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>


        {/* Chain Selector */}
        <button
          className={cn(
            'hidden sm:flex items-center gap-2 px-3 py-1.5',
            'bg-zinc-800 hover:bg-zinc-700 rounded-lg',
            'text-sm text-white transition-colors'
          )}
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <span>SOL</span>
          <ChevronDown size={14} className="text-zinc-400" />
        </button>

        {/* Deposit Button */}
        <button
          className={cn(
            'px-4 py-1.5 rounded-lg',
            'bg-cyan-500 hover:bg-cyan-400',
            'text-sm font-medium text-black',
            'transition-colors'
          )}
        >
          Deposit
        </button>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-1">
          <Tooltip content="Favorites">
            <IconButton aria-label="Favorites" size="md" variant="ghost">
              <Star size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Notifications">
            <IconButton aria-label="Notifications" size="md" variant="ghost">
              <Bell size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Wallet">
            <IconButton aria-label="Wallet" size="md" variant="ghost">
              <Wallet size={18} />
            </IconButton>
          </Tooltip>
        </div>

        {/* Profile */}
          <button className="rounded-full px-3 py-3 text-sm font-medium bg-linear-to-r from-orange-500 to-green-500">AN</button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;


