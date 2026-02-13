import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

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
      backgroundColor: 'rgba(7, 10, 16, 0.65)',
      padding: theme.spacing[4]
    },
    card: {
      width: '100%',
      maxWidth: 620,
      borderRadius: theme.radius[3],
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing[4]
    }
  });

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <Pressable style={styles.backdrop} onPress={onRequestClose}>
        <View style={styles.card}>{children}</View>
      </Pressable>
    </Modal>
  );
}
