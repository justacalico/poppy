import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { ChannelHeader } from '@/components/native/ChannelHeader';
import { ChannelList } from '@/components/native/ChannelList';
import { MembersPanel } from '@/components/native/MembersPanel';
import { MessageComposer } from '@/components/native/MessageComposer';
import { MessageRow } from '@/components/native/MessageRow';
import { NativeInput } from '@/components/native/NativeInput';
import { NativeList } from '@/components/native/NativeList';
import { NativeModal } from '@/components/native/NativeModal';
import { ServerRail } from '@/components/native/ServerRail';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { telegramService } from '@/services/telegram/mockTelegramService';
import { useUiStore } from '@/state/uiStore';
import { useTheme } from '@/theme/ThemeProvider';
import type { ChatMessage } from '@/types/chat';

const SPRING_CONFIG = {
  damping: 22,
  stiffness: 220,
  mass: 0.8
};

export function ChatScreen() {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [quickSwitcherOpen, setQuickSwitcherOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {
    activeServerId,
    activeChannelId,
    membersOpen,
    leftRailOpen,
    setActiveServer,
    setActiveChannel,
    setMembersOpen,
    setLeftRailOpen
  } = useUiStore();

  const isCompact = width < 980;
  const showMembersInline = width >= 1320 && !isCompact;

  const membersWidth = useSharedValue(showMembersInline || membersOpen ? 280 : 0);

  useEffect(() => {
    const next = showMembersInline || membersOpen ? 280 : 0;
    membersWidth.value = withSpring(next, SPRING_CONFIG);
  }, [membersOpen, membersWidth, showMembersInline]);

  const membersStyle = useAnimatedStyle(() => ({
    width: membersWidth.value,
    opacity: membersWidth.value > 0 ? 1 : 0
  }));

  const serversQuery = useQuery({
    queryKey: ['servers'],
    queryFn: telegramService.getServers
  });

  const channelsQuery = useQuery({
    queryKey: ['channels', activeServerId],
    queryFn: () => telegramService.getChannels(activeServerId)
  });

  const membersQuery = useQuery({
    queryKey: ['members', activeServerId],
    queryFn: () => telegramService.getMembers(activeServerId)
  });

  const messagesQuery = useInfiniteQuery({
    queryKey: ['messages', activeChannelId],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => telegramService.fetchMessages(activeChannelId, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });

  const sendMutation = useMutation({
    mutationFn: async (body: string) => telegramService.sendMessage(activeChannelId, 'user-1', body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['messages', activeChannelId] });
    }
  });

  const channels = useMemo(() => channelsQuery.data ?? [], [channelsQuery.data]);
  const channelName = channels.find((channel) => channel.id === activeChannelId)?.name ?? 'general';

  const members = useMemo(() => membersQuery.data ?? [], [membersQuery.data]);
  const membersById = useMemo(() => Object.fromEntries(members.map((member) => [member.id, member])), [members]);

  const messages = useMemo(() => {
    const all = messagesQuery.data?.pages.flatMap((page) => page.items) ?? [];

    if (!searchText.trim()) {
      return all;
    }

    return all.filter((message) => message.body.toLowerCase().includes(searchText.toLowerCase()));
  }, [messagesQuery.data?.pages, searchText]);

  const quickSwitcherChannels = channels.filter((channel) => channel.name.includes(searchText.toLowerCase()));

  useKeyboardShortcuts({
    onQuickSwitcher: () => setQuickSwitcherOpen(true)
  });

  useEffect(() => {
    const firstChannel = channels[0];

    if (!firstChannel) {
      return;
    }

    const exists = channels.some((channel) => channel.id === activeChannelId);

    if (!exists) {
      setActiveChannel(firstChannel.id);
    }
  }, [activeChannelId, channels, setActiveChannel]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          flex: 1,
          backgroundColor: theme.colors.background
        },
        body: {
          flex: 1,
          flexDirection: 'row'
        },
        center: {
          flex: 1,
          backgroundColor: theme.colors.background
        },
        loadingWrap: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        },
        emptyState: {
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.medium,
          textAlign: 'center',
          marginTop: theme.spacing[5]
        },
        quickTitle: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.bold,
          fontSize: 20,
          marginBottom: theme.spacing[2]
        },
        quickItem: {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius[2],
          padding: theme.spacing[3],
          marginTop: theme.spacing[2]
        },
        quickText: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.medium
        },
        compactDrawer: {
          flexDirection: 'row',
          minHeight: 420
        },
        contextAction: {
          borderRadius: theme.radius[2],
          borderWidth: 1,
          borderColor: theme.colors.border,
          minHeight: 42,
          justifyContent: 'center',
          paddingHorizontal: theme.spacing[3],
          marginTop: theme.spacing[2]
        },
        contextActionText: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.medium
        }
      }),
    [theme]
  );

  const loading =
    serversQuery.isLoading || channelsQuery.isLoading || membersQuery.isLoading || messagesQuery.isLoading;

  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  const servers = serversQuery.data ?? [];

  return (
    <View style={styles.screen}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.body}>
        {!isCompact ? (
          <>
            <ServerRail
              servers={servers}
              activeServerId={activeServerId}
              onSelectServer={(serverId) => {
                setActiveServer(serverId);
              }}
            />
            <ChannelList
              channels={channels}
              activeChannelId={activeChannelId}
              onSelectChannel={setActiveChannel}
            />
          </>
        ) : null}

        <View style={styles.center}>
          <ChannelHeader
            channelName={channelName}
            compact={isCompact}
            onToggleLeftRail={() => setLeftRailOpen(true)}
            onToggleMembers={() => setMembersOpen(!membersOpen)}
            onOpenQuickSwitcher={() => setQuickSwitcherOpen(true)}
          />

          <NativeInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search messages"
            style={{ margin: theme.spacing[3], marginBottom: theme.spacing[2] }}
          />

          <NativeList
            data={messages}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.6}
            onEndReached={() => {
              if (messagesQuery.hasNextPage && !messagesQuery.isFetchingNextPage) {
                void messagesQuery.fetchNextPage();
              }
            }}
            ListEmptyComponent={<Text style={styles.emptyState}>No messages yet.</Text>}
            renderItem={({ item }) => (
              <MessageRow
                message={item}
                author={membersById[item.authorId]}
                onLongPress={(message) => setSelectedMessage(message)}
              />
            )}
          />

          <MessageComposer
            onSend={async (body) => {
              await sendMutation.mutateAsync(body);
            }}
          />
        </View>

        <Animated.View style={membersStyle}>{membersOpen || showMembersInline ? <MembersPanel members={members} /> : null}</Animated.View>
      </View>

      <NativeModal
        visible={quickSwitcherOpen}
        onRequestClose={() => {
          setQuickSwitcherOpen(false);
          setSearchText('');
        }}
      >
        <Text style={styles.quickTitle}>Quick Switcher</Text>
        <NativeInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Jump to channel..."
          autoFocus
        />
        {quickSwitcherChannels.map((channel) => (
          <Pressable
            key={channel.id}
            style={styles.quickItem}
            onPress={() => {
              setActiveChannel(channel.id);
              setQuickSwitcherOpen(false);
              setSearchText('');
            }}
          >
            <Text style={styles.quickText}># {channel.name}</Text>
          </Pressable>
        ))}
      </NativeModal>

      <NativeModal visible={leftRailOpen && isCompact} onRequestClose={() => setLeftRailOpen(false)}>
        <View style={styles.compactDrawer}>
          <ServerRail
            servers={servers}
            activeServerId={activeServerId}
            onSelectServer={(serverId) => {
              setActiveServer(serverId);
              setLeftRailOpen(false);
            }}
          />
          <ChannelList channels={channels} activeChannelId={activeChannelId} onSelectChannel={setActiveChannel} />
        </View>
      </NativeModal>

      <NativeModal visible={selectedMessage !== null} onRequestClose={() => setSelectedMessage(null)}>
        <Text style={styles.quickTitle}>Message Actions</Text>
        <Pressable style={styles.contextAction}>
          <Text style={styles.contextActionText}>Reply</Text>
        </Pressable>
        <Pressable style={styles.contextAction}>
          <Text style={styles.contextActionText}>Forward</Text>
        </Pressable>
        <Pressable style={styles.contextAction}>
          <Text style={styles.contextActionText}>Pin Message</Text>
        </Pressable>
      </NativeModal>
    </View>
  );
}
