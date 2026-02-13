export type ThemeMode = 'light' | 'dark';

export type FontTokens = {
  regular: string;
  medium: string;
  bold: string;
  mono: string;
};

export type ThemeColors = {
  background: string;
  surface: string;
  elevated: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  accentMuted: string;
  danger: string;
  success: string;
  online: string;
  away: string;
  mention: string;
};

export type Theme = {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: number[];
  radius: number[];
  fonts: FontTokens;
};
