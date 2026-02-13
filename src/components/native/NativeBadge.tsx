import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type NativeBadgeProps = {
  value: number;
};

export function NativeBadge({ value }: NativeBadgeProps) {
  const { theme } = useTheme();

  if (value <= 0) {
    return null;
  }

  const styles = StyleSheet.create({
    badge: {
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      paddingHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.danger
    },
    text: {
      color: '#FFFFFF',
      fontSize: 11,
      fontFamily: theme.fonts.bold
    }
  });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{value > 99 ? '99+' : value}</Text>
    </View>
  );
}
