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
};

export const useCanvasHistory = ({
  canvasRef,
  maxHistory = 50,
}: UseCanvasHistoryArgs): CanvasHistory => {
  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);
  const [canUndo, setHasUndo] = useState(false);
  const [canRedo, setHasRedo] = useState(false);

  const updateFlags = () => {
    setHasUndo(undoStack.current.length > 1);
    setHasRedo(redoStack.current.length > 0);
  };

  const getCanUndo = useCallback(() => undoStack.current.length > 0, []);
  const getCanRedo = useCallback(() => redoStack.current.length > 0, []);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas?.getContext("2d") ?? null;
  }, [canvasRef]);

  const snapshot = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;

    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current.push(img);
    if (undoStack.current.length > maxHistory) undoStack.current.shift();
    redoStack.current.length = 0;
    updateFlags();
  };

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || undoStack.current.length === 0) return;

    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const prev = undoStack.current.pop()!;
    redoStack.current.push(current);
    ctx.putImageData(prev, 0, 0);
    updateFlags();
  }, [canvasRef, getCtx]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || redoStack.current.length === 0) return;

    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const next = redoStack.current.pop()!;
    undoStack.current.push(current);
    ctx.putImageData(next, 0, 0);
    updateFlags();
  }, [canvasRef, getCtx]);

  const clearHistory = useCallback(() => {
    undoStack.current.length = 0;
    redoStack.current.length = 0;
    updateFlags();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;

    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current = [img];
    redoStack.current = [];
    updateFlags();
  }, [canvasRef, getCtx]);

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
