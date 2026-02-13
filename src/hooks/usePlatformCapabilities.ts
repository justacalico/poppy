import { Platform } from 'react-native';

export function usePlatformCapabilities() {
  const isTV = Platform.isTV;
  const isWeb = Platform.OS === 'web';
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const isDesktop = Platform.OS === 'macos' || Platform.OS === 'windows' || (isWeb && !isTV);

  return {
    isTV,
    isWeb,
    isIOS,
    isAndroid,
    isDesktop,
    supportsHover: isDesktop || isWeb,
    supportsRightClick: isDesktop || isWeb,
    supportsHaptics: isIOS || isAndroid
  };
}
