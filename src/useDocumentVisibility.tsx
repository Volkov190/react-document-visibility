import { useState, useEffect, useRef } from "react";

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState(!document.hidden);
  const [count, setCount] = useState(0);

  const listeners = useRef<((isVisible: boolean) => void)[]>([]);

  const listener = () => {
    if (document.visibilityState === "hidden") {
      setCount((prevCount) => prevCount + 1);
    }

    setVisible(!document.hidden);
    listeners.current.forEach((listener) => {
      listener(!document.hidden);
    });
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", listener);

    return () => {
      document.removeEventListener("visibilitychange", listener);
    };
  }, []);

  const onVisibilityChange = (func: (isVisible: boolean) => void) => {
    listeners.current = [...listeners.current, func];
  };

  return { count, visible, onVisibilityChange };
};
