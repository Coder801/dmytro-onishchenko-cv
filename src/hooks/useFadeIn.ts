import { useEffect, useState } from "react";

export const useFadeIn = (isReady: boolean, delay = 100) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isReady, delay]);

  return isVisible;
};
