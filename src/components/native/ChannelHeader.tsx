import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NativeButton } from '@/components/native/NativeButton';
import { useTheme } from '@/theme/ThemeProvider';

type ChannelHeaderProps = {
  channelName: string;
  onToggleLeftRail: () => void;
  onToggleMembers: () => void;
  onOpenQuickSwitcher: () => void;
  compact: boolean;
};

export function ChannelHeader({
  channelName,
  onToggleLeftRail,
  onToggleMembers,
  onOpenQuickSwitcher,
  compact
}: ChannelHeaderProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          minHeight: 58,
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing[3],
          gap: theme.spacing[2]
        },
        title: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.bold,
          fontSize: 18
        },
        actions: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[2]
        },
        actionText: {
          color: theme.colors.textSecondary,
          fontSize: 13,
          fontFamily: theme.fonts.medium
        },
        railButton: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius[2],
          paddingHorizontal: theme.spacing[2],
          minHeight: 34,
          alignItems: 'center',
          justifyContent: 'center'
        }
      }),
    [theme]
  );

  return (
    <View style={styles.header}>
      <View style={styles.actions}>
        {compact ? (
          <Pressable style={styles.railButton} onPress={onToggleLeftRail}>
            <Text style={styles.actionText}>Servers</Text>
          </Pressable>
        ) : null}
        <Text style={styles.title}># {channelName}</Text>
      </View>
      <View style={styles.actions}>
        <NativeButton title="Quick Switch" variant="ghost" fullWidth={false} onPress={onOpenQuickSwitcher} />
        <NativeButton title="Members" variant="ghost" fullWidth={false} onPress={onToggleMembers} />
      </View>
    </View>
  );
}
