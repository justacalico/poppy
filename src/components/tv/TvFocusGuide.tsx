import React from 'react';
import { Platform, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

export function TvFocusGuide() {
  const { theme } = useTheme();

  if (!Platform.isTV) {
    return null;
  }

  return (
    <View
      style={{
        padding: theme.spacing[3],
        borderWidth: 2,
        borderColor: theme.colors.accent,
        borderRadius: theme.radius[2]
      }}
    >
      <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fonts.medium }}>
        TV focus mode enabled.
      </Text>
    </View>
  );
}
