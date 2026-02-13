export type RealtimeTransport = 'websocket' | 'mtproto';

export type RealtimeConfig = {
  transport: RealtimeTransport;
  reconnectBackoffMs: number;
};

export const realtimeDefaults: RealtimeConfig = {
  transport: 'websocket',
  reconnectBackoffMs: 1_500
};
