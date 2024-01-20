import { useSafeAreaInsets } from 'react-native-safe-area-context';
/**
 * Based on: https://github.com/software-mansion/react-native-screens/tree/master/native-stack#measuring-headers-height-on-ios
 */
export function UseHeaderHeight() {
  const statusBarInset = useSafeAreaInsets().top; // inset of the status bar
  const smallHeaderInset = statusBarInset + 44; // inset to use for a small header since it's frame is equal to 44 + the frame of status bar
  const modalHeaderInset = statusBarInset + 66; // inset to use for a large header since it's frame is equal to 66 + the frame of status bar
  const largeHeaderInset = statusBarInset + 96; // inset to use for a large header since it's frame is equal to 96 + the frame of status bar
  const bottomInset = useSafeAreaInsets().bottom;
  return {
    statusBarInset,
    smallHeaderInset,
    largeHeaderInset,
    modalHeaderInset,
    bottomInset,
  };
}