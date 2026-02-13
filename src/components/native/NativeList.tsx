import React from 'react';
import { FlashList, FlashListProps } from '@shopify/flash-list';

export function NativeList<T>(props: FlashListProps<T>) {
  return <FlashList estimatedItemSize={72} keyboardShouldPersistTaps="handled" {...props} />;
}
