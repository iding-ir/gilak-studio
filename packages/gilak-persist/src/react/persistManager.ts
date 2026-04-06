export type PersistClearer = () => Promise<void>;

const persistClearers = new Map<string, PersistClearer>();

export const registerPersistClearer = (
  id: string,
  clearPersistedState: PersistClearer,
) => {
  persistClearers.set(id, clearPersistedState);

  return () => {
    if (persistClearers.get(id) === clearPersistedState) {
      persistClearers.delete(id);
    }
  };
};

export const clearAllPersistedState = async (): Promise<void> => {
  const clearers = Array.from(new Set(persistClearers.values()));

  await Promise.all(
    clearers.map((clearPersistedState) => clearPersistedState()),
  );
};
