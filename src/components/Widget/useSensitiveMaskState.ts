import { Mutex } from "async-mutex";
import { useRef, useState } from "react";

export enum MaskState {
  Masked = "masked",
  Revealed = "revealed",
  Revealing = "revealing",
  Masking = "masking",
}
export default function useSensitiveMask(enabledByDefault?: boolean) {
  const mutex = useRef(new Mutex());
  const [maskState, setMaskState] = useState<MaskState>(
    enabledByDefault ? MaskState.Masked : MaskState.Revealed
  );

  const onToggleRevealed = () => {
    if (mutex.current.isLocked()) return;
    mutex.current.acquire().then(() => {
      if (
        maskState === MaskState.Masking ||
        maskState === MaskState.Revealing
      ) {
        mutex.current.release();
        return;
      }
      const nextState =
        maskState === MaskState.Masked
          ? MaskState.Revealing
          : MaskState.Masking;
      setMaskState(nextState);
      setTimeout(() => {
        const finalState =
          nextState === MaskState.Masking
            ? MaskState.Masked
            : MaskState.Revealed;
        setMaskState(finalState);
        mutex.current.release();
      }, 300);
    });
  };

  return [maskState, onToggleRevealed] as const;
}
