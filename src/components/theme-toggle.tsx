'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant='ghost'
        size='icon'
        aria-label='Theme toggle'
        className='w-10 h-10 flex items-center justify-center'
      >
        <span className='relative w-5 h-5'>
          <Moon
            className='absolute inset-0 h-5 w-5 opacity-100'
            aria-hidden='true'
          />
        </span>
      </Button>
    );
  }

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  // Fixed dimensions to prevent layout shift
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      aria-label={`Current theme: ${currentTheme}, click to toggle`}
      className='w-10 h-10 flex items-center justify-center'
    >
      <span className='relative w-5 h-5'>
        <Sun
          className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
            currentTheme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
          aria-hidden='true'
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
            currentTheme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50'
          }`}
          aria-hidden='true'
        />
      </span>
    </Button>
  );
}
