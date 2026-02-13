import { Platform } from 'react-native';

type StorageLike = {
  set: (key: string, value: string) => void;
  getString: (key: string) => string | undefined;
  delete: (key: string) => void;
};

const memoryStore = new Map<string, string>();

const memoryAdapter: StorageLike = {
  set: (key, value) => {
    memoryStore.set(key, value);
  },
  getString: (key) => memoryStore.get(key),
  delete: (key) => {
    memoryStore.delete(key);
  }
};

function getNativeAdapter(): StorageLike | null {
  if (Platform.OS === 'web') {
    return null;
  }

  try {
    const { MMKV } = require('react-native-mmkv') as { MMKV: new (config: { id: string }) => StorageLike };
    return new MMKV({ id: 'poppy-cache' });
  } catch {
    return null;
  }
}

export const storage = getNativeAdapter() ?? memoryAdapter;

export function setJsonValue<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function getJsonValue<T>(key: string): T | null {
  const raw = storage.getString(key);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
