import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { useTheme } from '@/theme/ThemeProvider';

type NativeModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

export function NativeModal({ visible, onRequestClose, children }: NativeModalProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      padding: theme.spacing[4]
    },
    cardShell: {
      width: '100%',
      maxWidth: 540,
      borderRadius: theme.radius[4],
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    card: {
      padding: theme.spacing[4]
    }
  });

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <Pressable style={styles.backdrop} onPress={onRequestClose}>
        <View style={styles.cardShell}>
          <BlurView intensity={32} tint={theme.mode === 'dark' ? 'dark' : 'light'}>
            <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
              {children}
            </Pressable>
          </BlurView>
        </View>
      </Pressable>
    </Modal>
  );
}
