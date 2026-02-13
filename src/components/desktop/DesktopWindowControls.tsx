import React from 'react';
import { Platform, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

export function DesktopWindowControls() {
  const { theme } = useTheme();

  if (Platform.OS !== 'macos' && Platform.OS !== 'windows' && Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fonts.regular, fontSize: 12 }}>
        Desktop hooks: titlebar, tray, multi-window.
      </Text>
    </View>
  );
}
