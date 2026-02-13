import React from 'react';
import { Platform, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

export function IosGesturePreview() {
  const { theme } = useTheme();

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <View
      style={{
        borderRadius: theme.radius[2],
        borderColor: theme.colors.border,
        borderWidth: 1,
        padding: theme.spacing[2],
        backgroundColor: theme.colors.surface
      }}
    >
      <Text style={{ color: theme.colors.textSecondary, fontFamily: theme.fonts.regular, fontSize: 12 }}>
        iOS native hooks: swipe-to-reply, haptics, share sheet.
      </Text>
    </View>
  );
}
