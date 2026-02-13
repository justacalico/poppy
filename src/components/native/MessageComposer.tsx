import React, { useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { NativeButton } from '@/components/native/NativeButton';
import { NativeInput } from '@/components/native/NativeInput';
import { useTheme } from '@/theme/ThemeProvider';

type MessageComposerProps = {
  onSend: (text: string) => Promise<void>;
};

export function MessageComposer({ onSend }: MessageComposerProps) {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const canSend = text.trim().length > 0 && !sending;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        shell: {
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[2],
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          flexDirection: Platform.OS === 'web' ? 'row' : 'column',
          alignItems: 'center',
          gap: theme.spacing[2]
        },
        inputWrap: {
          flex: 1,
          width: '100%'
        },
        sendWrap: {
          width: Platform.OS === 'web' ? 120 : '100%'
        }
      }),
    [theme]
  );

  return (
    <View style={styles.shell}>
      <View style={styles.inputWrap}>
        <NativeInput
          value={text}
          onChangeText={setText}
          placeholder="Message #channel"
          multiline
          onSubmitEditing={async () => {
            if (!canSend) {
              return;
            }
            setSending(true);
            await onSend(text.trim());
            setText('');
            setSending(false);
          }}
        />
      </View>
      <View style={styles.sendWrap}>
        <NativeButton
          title={sending ? 'Sending...' : 'Send'}
          onPress={async () => {
            if (!canSend) {
              return;
            }
            setSending(true);
            await onSend(text.trim());
            setText('');
            setSending(false);
          }}
          disabled={!canSend}
          fullWidth
        />
      </View>
    </View>
  );
}
