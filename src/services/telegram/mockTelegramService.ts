import type { ChatChannel, ChatMessage, ChatServer, ChatUser, MessagePage } from '@/types/chat';

const users: ChatUser[] = [
  { id: 'user-1', name: 'Alice Martin', username: 'alice', role: 'owner', color: '#57A0FF', presence: 'online' },
  { id: 'user-2', name: 'Noah Reed', username: 'noah', role: 'admin', color: '#F58B54', presence: 'away' },
  { id: 'user-3', name: 'Priya Shah', username: 'priya', role: 'member', color: '#6FD5A2', presence: 'online' },
  { id: 'user-4', name: 'Evan Kim', username: 'evan', role: 'member', color: '#D8A4FF', presence: 'offline' }
];

const servers: ChatServer[] = [
  { id: 'server-1', name: 'Poppy HQ', icon: 'PH', unreadCount: 3 },
  { id: 'server-2', name: 'Design Ops', icon: 'DO', unreadCount: 0 },
  { id: 'server-3', name: 'Mobile Lab', icon: 'ML', unreadCount: 7 }
];

const channels: ChatChannel[] = [
  { id: 'channel-1', serverId: 'server-1', category: 'Text', name: 'general', unreadCount: 2 },
  { id: 'channel-2', serverId: 'server-1', category: 'Text', name: 'product', unreadCount: 1 },
  { id: 'channel-3', serverId: 'server-1', category: 'Voice', name: 'standup', unreadCount: 0 },
  { id: 'channel-4', serverId: 'server-2', category: 'Text', name: 'announcements', unreadCount: 0 },
  { id: 'channel-5', serverId: 'server-2', category: 'Text', name: 'ux-research', unreadCount: 0 },
  { id: 'channel-6', serverId: 'server-3', category: 'Text', name: 'android', unreadCount: 5 },
  { id: 'channel-7', serverId: 'server-3', category: 'Text', name: 'ios', unreadCount: 2 }
];

const sampleBodies = [
  'Shipping native-feeling interactions first keeps the app honest.',
  'Pinned: telemetry budget for message rendering is 16ms per frame.',
  'Voice notes waveform looks clean after downsampling to 120 bars.',
  'Can we add swipe-to-reply parity on Android predictive back?',
  'Thread summary: migration to TanStack Query cache keys completed.'
];

function seedMessagesForChannel(channelId: string, count: number): ChatMessage[] {
  const fallbackAuthor = users[0];
  const fallbackBody = sampleBodies[0] ?? 'Message';

  if (!fallbackAuthor) {
    return [];
  }

  return Array.from({ length: count }, (_, i) => {
    const author = users[i % users.length] ?? fallbackAuthor;
    const now = Date.now();
    const createdAt = new Date(now - (count - i) * 60_000).toISOString();

    return {
      id: `${channelId}-message-${i + 1}`,
      channelId,
      authorId: author.id,
      body: sampleBodies[i % sampleBodies.length] ?? fallbackBody,
      createdAt,
      reactions:
        i % 4 === 0
          ? [
              { emoji: '🔥', count: 3, reacted: false },
              { emoji: '👍', count: 6, reacted: i % 3 === 0 }
            ]
          : []
    };
  });
}

const channelMessages: Record<string, ChatMessage[]> = Object.fromEntries(
  channels.map((channel) => [channel.id, seedMessagesForChannel(channel.id, 180)])
);

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const telegramService = {
  getServers: async (): Promise<ChatServer[]> => {
    await sleep(60);
    return servers;
  },
  getChannels: async (serverId: string): Promise<ChatChannel[]> => {
    await sleep(60);
    return channels.filter((channel) => channel.serverId === serverId);
  },
  getMembers: async (_serverId: string): Promise<ChatUser[]> => {
    await sleep(60);
    return users;
  },
  getUserById: (id: string): ChatUser | undefined => users.find((user) => user.id === id),
  fetchMessages: async (channelId: string, cursor: string | null): Promise<MessagePage> => {
    await sleep(150);

    const list = channelMessages[channelId] ?? [];
    const pageSize = 30;
    const end = cursor ? Number(cursor) : list.length;
    const start = Math.max(0, end - pageSize);
    const items = list.slice(start, end).reverse();
    const nextCursor = start > 0 ? String(start) : null;

    return {
      items,
      nextCursor
    };
  },
  sendMessage: async (channelId: string, authorId: string, body: string): Promise<ChatMessage> => {
    await sleep(120);

    const message: ChatMessage = {
      id: `${channelId}-message-${Date.now()}`,
      channelId,
      authorId,
      body,
      createdAt: new Date().toISOString(),
      reactions: []
    };

    channelMessages[channelId] = [...(channelMessages[channelId] ?? []), message];

    return message;
  }
};
