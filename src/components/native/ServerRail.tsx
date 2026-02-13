import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NativeBadge } from '@/components/native/NativeBadge';
import type { ChatServer } from '@/types/chat';
import { useTheme } from '@/theme/ThemeProvider';

type ServerRailProps = {
  servers: ChatServer[];
  activeServerId: string;
  onSelectServer: (serverId: string) => void;
};

export function ServerRail({ servers, activeServerId, onSelectServer }: ServerRailProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        rail: {
          width: 84,
          backgroundColor: theme.colors.surface,
          borderRightWidth: 1,
          borderColor: theme.colors.border,
          paddingVertical: theme.spacing[2],
          gap: theme.spacing[2]
        },
        serverButton: {
          alignItems: 'center',
          justifyContent: 'center'
        },
        activePill: {
          width: 5,
          height: 32,
          borderTopRightRadius: theme.radius[2],
          borderBottomRightRadius: theme.radius[2],
          backgroundColor: theme.colors.accent,
          position: 'absolute',
          left: 0
        },
        icon: {
          width: 48,
          height: 48,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.elevated
        },
        iconText: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.bold,
          fontSize: 12
        },
        badgeWrap: {
          position: 'absolute',
          right: 10,
          bottom: -2
        }
      }),
    [theme]
  );

  return (
    <View style={styles.rail}>
      {servers.map((server) => {
        const active = server.id === activeServerId;

        return (
          <Pressable
            key={server.id}
            style={styles.serverButton}
            onPress={() => onSelectServer(server.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            {active ? <View style={styles.activePill} /> : null}
            <View style={[styles.icon, active && { backgroundColor: theme.colors.accentMuted }]}>
              <Text style={styles.iconText}>{server.icon}</Text>
              <View style={styles.badgeWrap}>
                <NativeBadge value={server.unreadCount} />
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
