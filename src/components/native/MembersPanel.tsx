import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NativeAvatar } from '@/components/native/NativeAvatar';
import type { ChatUser } from '@/types/chat';
import { useTheme } from '@/theme/ThemeProvider';

type MembersPanelProps = {
  members: ChatUser[];
};

export function MembersPanel({ members }: MembersPanelProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        panel: {
          width: 280,
          borderLeftWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          padding: theme.spacing[3],
          gap: theme.spacing[2]
        },
        header: {
          color: theme.colors.textSecondary,
          textTransform: 'uppercase',
          fontFamily: theme.fonts.medium,
          fontSize: 12,
          letterSpacing: 0.8
        },
        member: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[2],
          borderRadius: theme.radius[2],
          padding: theme.spacing[2]
        },
        memberName: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.medium,
          fontSize: 14
        },
        memberRole: {
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.regular,
          fontSize: 12
        }
      }),
    [theme]
  );

  return (
    <View style={styles.panel}>
      <Text style={styles.header}>Members</Text>
      {members.map((member) => (
        <Pressable key={member.id} style={styles.member}>
          <NativeAvatar name={member.name} color={member.color} presence={member.presence} size={34} />
          <View>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
