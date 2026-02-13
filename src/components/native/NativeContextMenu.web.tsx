import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
    menu: {
      position: 'absolute',
      right: 0,
      top: '100%',
      marginTop: theme.spacing[1],
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius[2],
      minWidth: 180,
      zIndex: 20,
      overflow: 'hidden'
    },
    item: {
      minHeight: 38,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing[3]
    },
    text: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fonts.medium
    }
  });

  return (
    <View style={{ position: 'relative' }}>
      <Pressable
        onPress={() => setOpen(false)}
        onContextMenu={(event: unknown) => {
          const maybeEvent = event as { preventDefault?: () => void };
          maybeEvent.preventDefault?.();
          setOpen(true);
        }}
      >
        {children}
      </Pressable>
      {open ? (
        <View style={styles.menu}>
          {actions.map((action) => (
            <Pressable
              key={action.id}
              style={styles.item}
              onPress={() => {
                action.onPress();
                setOpen(false);
              }}
            >
              <Text style={styles.text}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
