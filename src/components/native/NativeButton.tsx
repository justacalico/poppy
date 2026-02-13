import React from 'react';
import { Platform, Pressable, PressableProps, StyleSheet, Text, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';

import { useTheme } from '@/theme/ThemeProvider';

type NativeButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'ghost' | 'danger';
  fullWidth?: boolean;
};

export function NativeButton({
  title,
  variant = 'primary',
  fullWidth = true,
  onPress,
  style,
  disabled,
  ...rest
}: NativeButtonProps) {
  const { theme } = useTheme();

  const palette = {
    primary: {
      bg: theme.colors.accent,
      fg: '#FFFFFF',
      border: theme.colors.accent
    },
    ghost: {
      bg: theme.colors.surface,
      fg: theme.colors.textPrimary,
      border: theme.colors.border
    },
    danger: {
      bg: theme.colors.danger,
      fg: '#FFFFFF',
      border: theme.colors.danger
    }
  }[variant];

  const styles = StyleSheet.create({
    button: {
      minHeight: 44,
      borderRadius: theme.radius[2],
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: palette.bg,
      borderColor: palette.border,
      paddingHorizontal: theme.spacing[4],
      width: fullWidth ? '100%' : undefined,
      opacity: disabled ? 0.5 : 1
    },
    text: {
      fontSize: 15,
      color: palette.fg,
      fontFamily: theme.fonts.medium
    }
  });

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      android_ripple={{ color: theme.colors.accentMuted }}
      style={({ pressed }) => [styles.button, pressed && !disabled && { transform: [{ scale: 0.985 }] }, style as ViewStyle]}
      onPress={async (event) => {
        if ((Platform.OS === 'ios' || Platform.OS === 'android') && !disabled) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        onPress?.(event);
      }}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
