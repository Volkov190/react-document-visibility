import { useState } from "react";

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState(document.visibilityState);
  const [count, setCount] = useState(0);
  document.addEventListener("visibilitychange", () => {
    if (visible === "visible" && document.visibilityState === "hidden") {
      setCount(count + 1);
    }
    setVisible(document.visibilityState);
  });

  const onVisibilityChange = (func: (isVisible: boolean) => void) => {
    document.addEventListener("visibilitychange", () => func(!document.hidden));
  };

  return { count, visible, onVisibilityChange };
};
