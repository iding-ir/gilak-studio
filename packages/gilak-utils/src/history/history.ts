export type History<T> = {
  prev: T[];
  current: T;
  next: T[];
};

function createHistory<T>(initial: T): History<T> {
  return {
    prev: [],
    current: initial,
    next: [],
  };
}

function setHistory<T>(history: History<T>, value: T): History<T> {
  if (Object.is(history.current, value)) {
    return history;
  }

  return {
    prev: [...history.prev, history.current],
    current: value,
    next: [],
  };
}

function undoHistory<T>(history: History<T>): History<T> {
  if (history.prev.length === 0) {
    return history;
  }

  const previous = history.prev[history.prev.length - 1];

  return {
    prev: history.prev.slice(0, -1),
    current: previous,
    next: [history.current, ...history.next],
  };
}

function redoHistory<T>(history: History<T>): History<T> {
  if (history.next.length === 0) {
    return history;
  }

  const next = history.next[0];

  return {
    prev: [...history.prev, history.current],
    current: next,
    next: history.next.slice(1),
  };
}

export const history = {
  canUndo: <T>(history: History<T>) => history.prev.length > 0,
  canRedo: <T>(history: History<T>) => history.next.length > 0,
  createHistory,
  setHistory,
  undoHistory,
  redoHistory,
};
