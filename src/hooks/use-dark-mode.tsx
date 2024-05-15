import { useState, useEffect } from 'react';

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
    // Set the initial value based on the user's preference
    setIsDarkMode(darkModeMediaQuery.matches);
  
    // Log the initial preference
    console.log('Initial dark mode:', darkModeMediaQuery.matches);
  
    // Define the event listener
    const handleChange = (event) => {
      console.log('Theme changed to:', event.matches ? 'dark' : 'light');
      setIsDarkMode(event.matches);
    };
  
    // Add the event listener
    darkModeMediaQuery.addEventListener('change', handleChange);
  
    // Clean up the event listener on unmount
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  

  return isDarkMode;
}

export default useDarkMode;
