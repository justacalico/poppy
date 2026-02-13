# poppy

Native-first Telegram client scaffold with Discord-inspired layout, built on React Native + TypeScript.

## Current Scope

This repository contains a production-oriented foundation with:

- Strict TypeScript React Native app shell
- React Navigation 6 root navigation flow
- TanStack Query provider and data hooks
- Zustand UI/auth state stores
- MMKV-backed storage adapter with safe fallback
- Reanimated-powered responsive 3-pane chat layout
- Native component library primitives:
  - `NativeButton`, `NativeInput`, `NativeModal`, `NativeContextMenu`, `NativeList`, `NativeAvatar`, `NativeBadge`
- Discord-like interface primitives:
  - server rail, channel list, central message stream, members panel, quick switcher
- Platform modules/stubs for iOS, Android, Web, Desktop, TV, and XR

## Tech Stack

- React Native + Expo (TypeScript strict mode)
- React Navigation 6+
- Reanimated 3+
- FlashList
- TanStack Query
- Zustand
- MMKV

## Project Structure

```text
src/
  components/
    native/
    ios/
    android/
    web/
    desktop/
    tv/
    xr/
  navigation/
  providers/
  screens/
  services/
    telegram/
    notifications/
    media/
  state/
  theme/
  utils/
```

## Getting Started

```bash
npm install
npm start
```

Platform commands:

```bash
npm run ios
npm run android
npm run web
```

## Quality Gates

```bash
npm run lint
npm run typecheck
npm test
```

## What Is Stubbed (Next Build Phases)

- Real Telegram MTProto authentication/session handling
- Real-time socket transport and reconciliation
- Media capture/upload pipeline
- Push notification registration and quick replies
- Platform-native deep integrations (menu bar/system tray/title bar widgets/TV voice/XR input)

## Native Feel Notes

- iOS/Android have platform-specific modal behavior files
- Android components use ripple interactions
- Desktop/Web quick switcher shortcut hook is included (`Cmd/Ctrl+K`)
- Layout adapts between compact and wide modes with spring transitions

