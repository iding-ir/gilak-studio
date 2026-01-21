import { useEffect } from "react";

export type HeadOptions = {
  title?: string;
};

export const useHead = ({ title }: HeadOptions) => {
  useEffect(() => {
    if (!title) return;

    const prev = document.title;
    document.title = title;

    return () => {
      document.title = prev;
    };
  }, [title]);
};
