import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type NativeInputProps = TextInputProps & {
  label?: string;
};

export function NativeInput({ label, ...props }: NativeInputProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      gap: theme.spacing[1]
    },
    label: {
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.medium,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5
    },
    input: {
      minHeight: 44,
      borderRadius: theme.radius[2],
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textPrimary,
      paddingHorizontal: theme.spacing[3],
      fontFamily: theme.fonts.regular,
      fontSize: 16
    }
  });

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}
