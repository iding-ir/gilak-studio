import { useCallback, useEffect, useRef } from "react";

export type CanvasHistory = {
  pushSnapshot: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
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
  };

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || undoStack.current.length === 0) return;

    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const prev = undoStack.current.pop()!;
    redoStack.current.push(current);
    ctx.putImageData(prev, 0, 0);
  }, [canvasRef, getCtx]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || redoStack.current.length === 0) return;

    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const next = redoStack.current.pop()!;
    undoStack.current.push(current);
    ctx.putImageData(next, 0, 0);
  }, [canvasRef, getCtx]);

  const clearHistory = useCallback(() => {
    undoStack.current.length = 0;
    redoStack.current.length = 0;
  }, []);

  const canUndo = useCallback(() => undoStack.current.length > 0, []);
  const canRedo = useCallback(() => redoStack.current.length > 0, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;

    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current = [img];
    redoStack.current = [];
  }, [canvasRef, getCtx]);

  return {
    pushSnapshot: snapshot,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  };
};
