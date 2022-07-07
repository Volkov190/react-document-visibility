import { useState, useEffect } from "react";

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState(!document.hidden);
  const [count, setCount] = useState(0);

  const listener = () => {
    if (visible && document.visibilityState === "hidden") {
      setCount((prevCount) => prevCount + 1);
    }
    setVisible(!document.hidden);
  };

  const [listeners, setListeners] = useState([listener]);

  useEffect(() => {
    document.addEventListener("visibilitychange", listener);

    return () => {
      for (const listener of listeners) {
        document.removeEventListener("visibilitychange", listener);
      }
    };
  }, []);

  const onVisibilityChange = (func: (isVisible: boolean) => void) => {
    const newListener = () => func(!document.hidden);
    setListeners(listeners.concat(newListener));
    document.addEventListener("visibilitychange", newListener);
  };

  return { count, visible, onVisibilityChange };
};
