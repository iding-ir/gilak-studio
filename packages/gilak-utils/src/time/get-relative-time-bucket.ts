export type RelativeTimeBucket =
  | {
      style: "fewSeconds";
    }
  | {
      style: "lessThan";
      unit: "second" | "minute";
      count: number;
    }
  | {
      style: "moreThan";
      unit: "minute" | "hour";
      count: number;
    };

export const getRelativeTimeBucket = (
  value: Date | number,
  now = Date.now(),
): RelativeTimeBucket => {
  const timestamp = value instanceof Date ? value.getTime() : value;
  const diffSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (diffSeconds < 5) {
    return { style: "fewSeconds" };
  }

  if (diffSeconds < 10) {
    return { style: "lessThan", unit: "second", count: 10 };
  }

  if (diffSeconds < 30) {
    return { style: "lessThan", unit: "second", count: 30 };
  }

  if (diffSeconds < 60) {
    return { style: "lessThan", unit: "minute", count: 1 };
  }

  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffMinutes < 2) {
    return { style: "lessThan", unit: "minute", count: 2 };
  }

  if (diffMinutes < 5) {
    return { style: "lessThan", unit: "minute", count: 5 };
  }

  if (diffMinutes < 10) {
    return { style: "lessThan", unit: "minute", count: 10 };
  }

  if (diffMinutes < 30) {
    return { style: "moreThan", unit: "minute", count: 10 };
  }

  if (diffMinutes < 60) {
    return { style: "moreThan", unit: "minute", count: 30 };
  }

  return {
    style: "moreThan",
    unit: "hour",
    count: 1,
  };
};
