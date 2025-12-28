import { useCallback, useEffect, useRef, useState } from "react";

export type CanvasHistory = {
  canUndo: boolean;
  canRedo: boolean;
  snapshot: () => void;
  undo: () => void;
  redo: () => void;
  getCanUndo: () => boolean;
  getCanRedo: () => boolean;
  clearHistory: () => void;
};

export type UseCanvasHistoryArgs = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  maxHistory?: number;
  onChange?: (entry: HistoryEntry) => void;
};

export type HistoryEntry = {
  image: ImageData;
  width: number;
  height: number;
};

export const useCanvasHistory = ({
  canvasRef,
  maxHistory = 50,
  onChange,
}: UseCanvasHistoryArgs): CanvasHistory => {
  const undoStack = useRef<HistoryEntry[]>([]);
  const redoStack = useRef<HistoryEntry[]>([]);
  const [canUndo, setHasUndo] = useState(false);
  const [canRedo, setHasRedo] = useState(false);

  const updateFlags = () => {
    setHasUndo(undoStack.current.length > 1);
    setHasRedo(redoStack.current.length > 0);
  };

  const getCanUndo = useCallback(() => undoStack.current.length > 0, []);
  const getCanRedo = useCallback(() => redoStack.current.length > 0, []);

  const snapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current.push({
      image: img,
      width: canvas.width,
      height: canvas.height,
    });

    if (undoStack.current.length > maxHistory) undoStack.current.shift();
    redoStack.current.length = 0;
    updateFlags();
  }, [canvasRef, maxHistory]);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || undoStack.current.length === 0) return;

    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const prev = undoStack.current.pop()!;
    redoStack.current.push({
      image: current,
      width: canvas.width,
      height: canvas.height,
    });

    if (canvas.width !== prev.width || canvas.height !== prev.height) {
      canvas.width = prev.width;
      canvas.height = prev.height;
    }

    const ctxAfter = canvas.getContext("2d");
    if (!ctxAfter) return;

    ctxAfter.putImageData(prev.image, 0, 0);
    onChange?.(prev);
    updateFlags();
  }, [canvasRef, onChange]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || redoStack.current.length === 0) return;

    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const next = redoStack.current.pop()!;
    undoStack.current.push({
      image: current,
      width: canvas.width,
      height: canvas.height,
    });

    if (canvas.width !== next.width || canvas.height !== next.height) {
      canvas.width = next.width;
      canvas.height = next.height;
    }

    const ctxAfter = canvas.getContext("2d");
    if (!ctxAfter) return;

    ctxAfter.putImageData(next.image, 0, 0);
    onChange?.(next);
    updateFlags();
  }, [canvasRef, onChange]);

  const clearHistory = useCallback(() => {
    undoStack.current.length = 0;
    redoStack.current.length = 0;
    updateFlags();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current = [
      { image: img, width: canvas.width, height: canvas.height },
    ];
    redoStack.current = [];
    updateFlags();
  }, [canvasRef]);

  return {
    snapshot,
    undo,
    redo,
    getCanUndo,
    getCanRedo,
    canUndo,
    canRedo,
    clearHistory,
  };
};
