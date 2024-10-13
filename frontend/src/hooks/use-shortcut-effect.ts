// useShortcutEffect.ts
import { useCallback, useEffect, useState } from "react";

type ShortcutCallback = () => void | Promise<void>;

export const useShortcutEffect = (
  callback: ShortcutCallback,
  effectDuration: number = 1000,
  key: string = "s",
) => {
  const [isEffectActive, setIsEffectActive] = useState(false);

  const triggerAction = useCallback(async () => {
    setIsEffectActive(true);
    await callback();

    setTimeout(() => {
      setIsEffectActive(false);
    }, effectDuration);
  }, [callback, effectDuration]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Windows: event.ctrlKey, Mac: event.metaKey
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === key &&
        !event.shiftKey &&
        !event.altKey
      ) {
        event.preventDefault();
        triggerAction();
      }
    },
    [triggerAction],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    isEffectActive,
    triggerAction,
  };
};
