import { create } from 'zustand';

import { getJsonValue, setJsonValue } from '@/utils/storage';

type UiPersistedState = {
  activeServerId: string;
  activeChannelId: string;
  membersOpen: boolean;
};

type UiState = UiPersistedState & {
  leftRailOpen: boolean;
  setActiveServer: (serverId: string) => void;
  setActiveChannel: (channelId: string) => void;
  setMembersOpen: (open: boolean) => void;
  setLeftRailOpen: (open: boolean) => void;
};

const PERSIST_KEY = 'ui-state-v1';

const initialState: UiPersistedState =
  getJsonValue<UiPersistedState>(PERSIST_KEY) ?? {
    activeServerId: 'server-1',
    activeChannelId: 'channel-1',
    membersOpen: true
  };

function persist(partial: UiPersistedState) {
  setJsonValue(PERSIST_KEY, partial);
}

export const useUiStore = create<UiState>((set, get) => ({
  ...initialState,
  leftRailOpen: false,
  setActiveServer: (serverId) => {
    const next = { ...get(), activeServerId: serverId };
    persist({
      activeServerId: next.activeServerId,
      activeChannelId: next.activeChannelId,
      membersOpen: next.membersOpen
    });
    set({ activeServerId: serverId });
  },
  setActiveChannel: (channelId) => {
    const next = { ...get(), activeChannelId: channelId };
    persist({
      activeServerId: next.activeServerId,
      activeChannelId: next.activeChannelId,
      membersOpen: next.membersOpen
    });
    set({ activeChannelId: channelId });
  },
  setMembersOpen: (membersOpen) => {
    const next = { ...get(), membersOpen };
    persist({
      activeServerId: next.activeServerId,
      activeChannelId: next.activeChannelId,
      membersOpen: next.membersOpen
    });
    set({ membersOpen });
  },
  setLeftRailOpen: (leftRailOpen) => set({ leftRailOpen })
}));
