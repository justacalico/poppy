import React from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

export function SpatialThreadPanel() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius[2],
        padding: theme.spacing[3],
        backgroundColor: theme.colors.surface
      }}
    >
      <Text style={{ color: theme.colors.textPrimary, fontFamily: theme.fonts.medium }}>
        XR module placeholder: map threads into a spatial canvas.
      </Text>
    </View>
  );
}
