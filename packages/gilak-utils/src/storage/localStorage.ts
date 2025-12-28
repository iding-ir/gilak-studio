export async function getItem<T = unknown>(key: string): Promise<T | null> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    throw new Error(
      `Failed to read or parse storage key "${key}": ${String(err)}`,
    );
  }
}

export function getItemSync<T = unknown>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    throw new Error(
      `Failed to read or parse storage key "${key}": ${String(err)}`,
    );
  }
}

export async function setItem(key: string, value: unknown): Promise<void> {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    throw new Error(`Failed to set storage key "${key}": ${String(err)}`);
  }
}

export function setItemSync(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    throw new Error(`Failed to set storage key "${key}": ${String(err)}`);
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    throw new Error(`Failed to remove storage key "${key}": ${String(err)}`);
  }
}

export function removeItemSync(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    throw new Error(`Failed to remove storage key "${key}": ${String(err)}`);
  }
}

export async function keysWithPrefix(prefix: string): Promise<string[]> {
  try {
    const out: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(prefix) === 0) out.push(k);
    }
    return out;
  } catch (err) {
    throw new Error(
      `Failed to list keys with prefix "${prefix}": ${String(err)}`,
    );
  }
}

export function keysWithPrefixSync(prefix: string): string[] {
  try {
    const out: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(prefix) === 0) out.push(k);
    }
    return out;
  } catch (err) {
    throw new Error(
      `Failed to list keys with prefix "${prefix}": ${String(err)}`,
    );
  }
}

export default {
  getItem,
  setItem,
  removeItem,
  keysWithPrefix,
  getItemSync,
  setItemSync,
  removeItemSync,
  keysWithPrefixSync,
};
