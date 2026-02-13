import type { ChatMessage } from '@/types/chat';

export type TelegramClient = {
  loginWithPhone: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<void>;
  fetchDialogs: () => Promise<unknown[]>;
  subscribeToMessages: (channelId: string, callback: (message: ChatMessage) => void) => () => void;
};

export const telegramClient: TelegramClient = {
  loginWithPhone: async (_phone) => {
    throw new Error('Not implemented: integrate MTProto auth flow');
  },
  verifyCode: async (_phone, _code) => {
    throw new Error('Not implemented: integrate MTProto verification flow');
  },
  fetchDialogs: async () => {
    throw new Error('Not implemented: connect to Telegram dialog API');
  },
  subscribeToMessages: (_channelId, _callback) => {
    return () => undefined;
  }
};
