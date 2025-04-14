import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  // Read from localStorage once on init
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage', error);
      return initialValue;
    }
  });

  // Save to localStorage when value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
