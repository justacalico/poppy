import { useEffect } from 'react';
import { Platform } from 'react-native';

type ShortcutHandlers = {
  onQuickSwitcher: () => void;
};

export function useKeyboardShortcuts({ onQuickSwitcher }: ShortcutHandlers) {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onQuickSwitcher();
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [onQuickSwitcher]);
}
