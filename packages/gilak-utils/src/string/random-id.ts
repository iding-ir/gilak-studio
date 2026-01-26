export type randomIdOptions = {
  prefix?: string;
};

export const randomId = ({ prefix = "" }: randomIdOptions): string => {
  return prefix + Math.random().toString(36).substring(2, 10);
};
