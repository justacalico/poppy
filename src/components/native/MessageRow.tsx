import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NativeAvatar } from '@/components/native/NativeAvatar';
import type { ChatMessage, ChatUser } from '@/types/chat';
import { useTheme } from '@/theme/ThemeProvider';
import { formatMessageTime } from '@/utils/time';

type MessageRowProps = {
  message: ChatMessage;
  author: ChatUser | undefined;
  onLongPress?: (message: ChatMessage) => void;
};

export function MessageRow({ message, author, onLongPress }: MessageRowProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          gap: theme.spacing[3],
          paddingHorizontal: theme.spacing[4],
          paddingVertical: theme.spacing[2]
        },
        body: {
          flex: 1,
          gap: theme.spacing[1]
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[2]
        },
        author: {
          color: author?.color ?? theme.colors.textPrimary,
          fontFamily: theme.fonts.bold,
          fontSize: 14
        },
        time: {
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.regular,
          fontSize: 12
        },
        text: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.regular,
          fontSize: 15,
          lineHeight: 22
        },
        reactions: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing[2],
          marginTop: theme.spacing[1]
        },
        reactionPill: {
          minHeight: 28,
          borderRadius: theme.radius[5],
          paddingHorizontal: theme.spacing[2],
          borderWidth: 1,
          borderColor: theme.colors.border,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.surface
        },
        reactionText: {
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.medium,
          fontSize: 13
        }
      }),
    [author?.color, theme]
  );

  if (!author) {
    return null;
  }

  return (
    <Pressable style={styles.row} onLongPress={() => onLongPress?.(message)}>
      <NativeAvatar name={author.name} color={author.color} presence={author.presence} size={38} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.author}>{author.name}</Text>
          <Text style={styles.time}>{formatMessageTime(message.createdAt)}</Text>
        </View>
        <Text style={styles.text}>{message.body}</Text>
        {message.reactions.length > 0 ? (
          <View style={styles.reactions}>
            {message.reactions.map((reaction) => (
              <View
                key={`${message.id}-${reaction.emoji}`}
                style={[styles.reactionPill, reaction.reacted && { backgroundColor: theme.colors.accentMuted }]}
              >
                <Text style={styles.reactionText}>
                  {reaction.emoji} {reaction.count}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
