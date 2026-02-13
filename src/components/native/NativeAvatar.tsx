import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Presence } from '@/types/chat';
import { useTheme } from '@/theme/ThemeProvider';

type NativeAvatarProps = {
  name: string;
  color: string;
  presence?: Presence;
  size?: number;
};

export function NativeAvatar({ name, color, presence, size = 40 }: NativeAvatarProps) {
  const { theme } = useTheme();

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((token) => token[0])
    .join('')
    .toUpperCase();

  const presenceColor =
    presence === 'online' ? theme.colors.online : presence === 'away' ? theme.colors.away : theme.colors.textSecondary;

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: '#FFFFFF',
      fontFamily: theme.fonts.bold,
      fontSize: Math.max(12, Math.round(size * 0.35))
    },
    indicator: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: Math.max(10, Math.round(size * 0.28)),
      height: Math.max(10, Math.round(size * 0.28)),
      borderRadius: 999,
      backgroundColor: presenceColor,
      borderWidth: 2,
      borderColor: theme.colors.surface
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{initials}</Text>
      {presence ? <View style={styles.indicator} /> : null}
    </View>
  );
}
