import { Platform } from 'react-native';

import type { Theme, ThemeMode } from './types';

const platformFonts = {
  regular: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto',
    windows: 'Segoe UI',
    default: 'Inter'
  }) ?? 'Inter',
  medium: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto Medium',
    windows: 'Segoe UI Semibold',
    default: 'Inter'
  }) ?? 'Inter',
  bold: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto Bold',
    windows: 'Segoe UI Bold',
    default: 'Inter'
  }) ?? 'Inter',
  mono: Platform.select({
    ios: 'SF Mono',
    android: 'Roboto Mono',
    windows: 'Cascadia Code',
    default: 'JetBrains Mono'
  }) ?? 'JetBrains Mono'
};

const sharedSpacing = [4, 8, 12, 16, 20, 24, 32, 40, 48];
const sharedRadius = [4, 8, 12, 16, 24, 32];

export const themes: Record<ThemeMode, Theme> = {
  light: {
    mode: 'light',
    colors: {
      background: Platform.select({ ios: '#F2F2F7', android: '#FFFFFF', default: '#F6F7FB' }) ?? '#F6F7FB',
      surface: Platform.select({ ios: '#FFFFFF', android: '#FAFAFA', default: '#FFFFFF' }) ?? '#FFFFFF',
      elevated: '#E9ECF4',
      textPrimary: '#121419',
      textSecondary: '#576075',
      border: '#D8DEEB',
      accent: '#1C67FF',
      accentMuted: '#D9E6FF',
      danger: '#CC2D30',
      success: '#2A8D52',
      online: '#2A8D52',
      away: '#D39B00',
      mention: '#FFF1C2'
    },
    spacing: sharedSpacing,
    radius: sharedRadius,
    fonts: platformFonts
  },
  dark: {
    mode: 'dark',
    colors: {
      background: Platform.select({ ios: '#000000', android: '#000000', default: '#0E1014' }) ?? '#0E1014',
      surface: Platform.select({ ios: '#111216', android: '#15171D', default: '#171A22' }) ?? '#171A22',
      elevated: '#232734',
      textPrimary: '#F3F5FA',
      textSecondary: '#A5ADC0',
      border: '#303645',
      accent: '#6BA2FF',
      accentMuted: '#1B2A4D',
      danger: '#FF7275',
      success: '#67D99A',
      online: '#67D99A',
      away: '#FFC661',
      mention: '#4A3E1A'
    },
    spacing: sharedSpacing,
    radius: sharedRadius,
    fonts: platformFonts
  }
};
