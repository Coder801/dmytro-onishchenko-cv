import { useCallback, useEffect, useState } from "react";

export const useScrollFromTop = (threshold: number = 100): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollListener = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    scrollListener();
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return isScrolled;
};
