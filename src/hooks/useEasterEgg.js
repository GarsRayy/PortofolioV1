import { useState, useEffect, useRef } from 'react';

const useEasterEgg = (targetWord = "garis", timeout = 2000) => {
  const [triggered, setTriggered] = useState(false);
  const inputRef = useRef("");
  const timerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if triggered already
      if (triggered) return;

      const key = e.key.toLowerCase();
      
      // Only care about single character keys
      if (key.length !== 1) return;

      inputRef.current += key;

      // Reset timer
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        inputRef.current = "";
      }, timeout);

      // Check for match
      if (inputRef.current.includes(targetWord.toLowerCase())) {
        setTriggered(true);
        inputRef.current = "";
        
        // Reset after 10 seconds
        setTimeout(() => setTriggered(false), 10000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggered, targetWord, timeout]);

  return triggered;
};

export default useEasterEgg;
