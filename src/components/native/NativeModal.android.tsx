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
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    sheet: {
      width: '100%',
      borderTopLeftRadius: theme.radius[4],
      borderTopRightRadius: theme.radius[4],
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing[4],
      paddingTop: theme.spacing[4],
      paddingBottom: theme.spacing[5]
    }
  });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onRequestClose}>
      <Pressable style={styles.backdrop} onPress={onRequestClose}>
        <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
