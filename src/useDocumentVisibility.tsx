import { useState, useEffect, useRef } from "react";

export const useDocumentVisibility = () => {
  const [visibleResult, setVisibleResult] = useState(!document.hidden);
  const [count, setCount] = useState(0);

  const visible = useRef(!document.hidden);
  const listeners = useRef<((isVisible: boolean) => void)[]>([]);

  const listener = () => {
    if (visible.current && document.visibilityState === "hidden") {
      setCount((prevCount) => prevCount + 1);
    }
    visible.current = !document.hidden;
    setVisibleResult(!document.hidden);
    listeners.current.forEach((listener) => {
      listener(visible.current);
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

  return { count, visible: visibleResult, onVisibilityChange };
};
