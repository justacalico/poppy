import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

export function WebShortcutHint() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius[2],
        padding: theme.spacing[2],
        backgroundColor: theme.colors.surface
      }}
    >
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fonts.regular, fontSize: 12 }}>
        Web shortcut: Ctrl/Cmd + K opens channel switcher.
      </Text>
    </View>
  );
}
