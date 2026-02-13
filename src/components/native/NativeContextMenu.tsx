import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NativeModal } from '@/components/native/NativeModal';
import { useTheme } from '@/theme/ThemeProvider';

export type NativeContextAction = {
  id: string;
  label: string;
  onPress: () => void;
};

type NativeContextMenuProps = {
  actions: NativeContextAction[];
  children: React.ReactNode;
};

export function NativeContextMenu({ actions, children }: NativeContextMenuProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const styles = StyleSheet.create({
    action: {
      minHeight: 42,
      borderRadius: theme.radius[2],
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing[3],
      marginTop: theme.spacing[2]
    },
    text: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fonts.medium
    }
  });

  return (
    <>
      <Pressable delayLongPress={220} onLongPress={() => setOpen(true)}>
        {children}
      </Pressable>
      <NativeModal visible={open} onRequestClose={() => setOpen(false)}>
        <View>
          {actions.map((action) => (
            <Pressable
              key={action.id}
              style={styles.action}
              onPress={() => {
                action.onPress();
                setOpen(false);
              }}
            >
              <Text style={styles.text}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      </NativeModal>
    </>
  );
}
