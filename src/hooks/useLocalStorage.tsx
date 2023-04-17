import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type DefaultValueType = string | number | boolean | null;

type ReturnType<T extends DefaultValueType> = [T, Dispatch<SetStateAction<T>>];

export default function useLocalStorage<T extends DefaultValueType>(key: string, defaultValue: T): ReturnType<T> {
  const [state, setState] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
