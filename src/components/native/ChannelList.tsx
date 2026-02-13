import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ChatChannel } from '@/types/chat';
import { useTheme } from '@/theme/ThemeProvider';

type ChannelListProps = {
  channels: ChatChannel[];
  activeChannelId: string;
  onSelectChannel: (channelId: string) => void;
};

export function ChannelList({ channels, activeChannelId, onSelectChannel }: ChannelListProps) {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const grouped = channels.reduce<Record<string, ChatChannel[]>>((acc, channel) => {
    const list = acc[channel.category] ?? [];
    list.push(channel);
    acc[channel.category] = list;
    return acc;
  }, {});

  const styles = useMemo(
    () =>
      StyleSheet.create({
        panel: {
          width: 260,
          backgroundColor: theme.colors.surface,
          borderRightWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: theme.spacing[2],
          paddingTop: theme.spacing[3],
          gap: theme.spacing[2]
        },
        categoryButton: {
          paddingVertical: theme.spacing[1],
          paddingHorizontal: theme.spacing[2],
          borderRadius: theme.radius[1]
        },
        categoryText: {
          color: theme.colors.textSecondary,
          fontSize: 12,
          textTransform: 'uppercase',
          fontFamily: theme.fonts.medium,
          letterSpacing: 0.8
        },
        channelButton: {
          borderRadius: theme.radius[1],
          minHeight: 34,
          justifyContent: 'center',
          paddingHorizontal: theme.spacing[2],
          marginBottom: theme.spacing[1]
        },
        channelText: {
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.medium,
          fontSize: 14
        },
        unreadDot: {
          width: 7,
          height: 7,
          borderRadius: 999,
          backgroundColor: theme.colors.accent,
          marginLeft: 'auto'
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[2]
        }
      }),
    [theme]
  );

  return (
    <View style={styles.panel}>
      {Object.entries(grouped).map(([category, items]) => {
        const isCollapsed = collapsed[category];

        return (
          <View key={category}>
            <Pressable
              style={styles.categoryButton}
              onPress={() => setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }))}
            >
              <Text style={styles.categoryText}>{isCollapsed ? `+ ${category}` : `- ${category}`}</Text>
            </Pressable>

            {!isCollapsed
              ? items.map((channel) => {
                  const active = channel.id === activeChannelId;
                  return (
                    <Pressable
                      key={channel.id}
                      style={[styles.channelButton, active && { backgroundColor: theme.colors.accentMuted }]}
                      onPress={() => onSelectChannel(channel.id)}
                    >
                      <View style={styles.row}>
                        <Text style={[styles.channelText, active && { color: theme.colors.textPrimary }]}># {channel.name}</Text>
                        {channel.unreadCount > 0 ? <View style={styles.unreadDot} /> : null}
                      </View>
                    </Pressable>
                  );
                })
              : null}
          </View>
        );
      })}
    </View>
  );
}
