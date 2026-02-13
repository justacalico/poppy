import React from 'react';
import { Pressable, Text } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type MaterialFabProps = {
  title?: string;
  onPress: () => void;
};

export function MaterialFab({ title = '+', onPress }: MaterialFabProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: theme.colors.accentMuted }}
      style={{
        position: 'absolute',
        right: theme.spacing[4],
        bottom: theme.spacing[4],
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.accent,
        elevation: 6
      }}
    >
      <Text style={{ color: '#FFF', fontSize: 24, fontFamily: theme.fonts.medium }}>{title}</Text>
    </Pressable>
  );
}
