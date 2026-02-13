export type Presence = 'online' | 'away' | 'offline';

export type ChatUser = {
  id: string;
  name: string;
  username: string;
  role: 'owner' | 'admin' | 'member';
  color: string;
  presence: Presence;
};

export type ChatServer = {
  id: string;
  name: string;
  icon: string;
  unreadCount: number;
};

export type ChatChannel = {
  id: string;
  serverId: string;
  category: string;
  name: string;
  unreadCount: number;
};

export type MessageReaction = {
  emoji: string;
  count: number;
  reacted: boolean;
};

export type ChatMessage = {
  id: string;
  channelId: string;
  authorId: string;
  body: string;
  createdAt: string;
  editedAt?: string;
  replyToId?: string;
  reactions: MessageReaction[];
};

export type MessagePage = {
  items: ChatMessage[];
  nextCursor: string | null;
};
