import React, { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NativeButton } from '@/components/native/NativeButton';
import { NativeInput } from '@/components/native/NativeInput';
import { useAuthStore } from '@/state/authStore';
import { useTheme } from '@/theme/ThemeProvider';

export function AuthScreen() {
  const [phone, setPhone] = useState('+1 ');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const { login } = useAuthStore();
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background,
          padding: theme.spacing[5]
        },
        card: {
          width: '100%',
          maxWidth: 420,
          borderRadius: theme.radius[3],
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: theme.spacing[5],
          gap: theme.spacing[3]
        },
        title: {
          color: theme.colors.textPrimary,
          fontSize: 28,
          fontFamily: theme.fonts.bold
        },
        subtitle: {
          color: theme.colors.textSecondary,
          fontSize: 14,
          lineHeight: 20,
          fontFamily: theme.fonts.regular
        }
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to poppy</Text>
        <Text style={styles.subtitle}>
          {step === 'phone'
            ? 'Sign in with your Telegram phone number.'
            : `Enter the verification code sent to ${phone}.`}
        </Text>

        {step === 'phone' ? (
          <>
            <NativeInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            <NativeButton title="Send Code" onPress={() => setStep('code')} />
          </>
        ) : (
          <>
            <NativeInput
              label="SMS Code"
              value={code}
              onChangeText={setCode}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            />
            <NativeButton title="Sign In" onPress={() => login(phone)} disabled={code.length < 4} />
            <NativeButton title="Back" variant="ghost" onPress={() => setStep('phone')} />
          </>
        )}
      </View>
    </View>
  );
}
