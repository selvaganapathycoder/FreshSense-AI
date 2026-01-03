import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'system'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (targetTheme) => {
      root.classList.remove('light', 'dark');
      
      if (targetTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        return;
      }
      
      root.classList.add(targetTheme);
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);
    
    // Listen for system changes if set to system
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
        if (prev === 'light') return 'dark';
        if (prev === 'dark') return 'system';
        return 'light'; // cycle: light -> dark -> system -> light
    });
  };

  // Simplified toggle for just two states if preferred, but tri-state is nice.
  // Let's do a simple Light/Dark toggle for better UX if the user just wants to switch.
  // Actually, let's stick to explicit setting or a simple toggle. 
  // For this app, let's just toggle Light <-> Dark for simplicity in the UI button.
  
  const toggleDark = () => {
     setTheme(prev => {
        const currentEffective = prev === 'system' 
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : prev;
        
        return currentEffective === 'dark' ? 'light' : 'dark';
     });
  };

  return { theme, setTheme, toggleTheme: toggleDark };
};
