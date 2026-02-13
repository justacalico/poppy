import { telegramService } from '@/services/telegram/mockTelegramService';

describe('telegramService', () => {
  it('fetches paginated messages', async () => {
    const firstPage = await telegramService.fetchMessages('channel-1', null);
    expect(firstPage.items.length).toBeGreaterThan(0);
    expect(firstPage.nextCursor).not.toBeNull();

    const secondPage = await telegramService.fetchMessages('channel-1', firstPage.nextCursor);
    expect(secondPage.items.length).toBeGreaterThan(0);
  });
});
