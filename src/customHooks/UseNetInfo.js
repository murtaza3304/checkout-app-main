import { useLayoutEffect, useRef, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function UseNetInfo() {
  const [error, setError] = useState();
  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const [type, setType] = useState();
  const mounted = useRef(true);

  useLayoutEffect(() => {
    if (!mounted.current) {
      return;
    }

    const setNetworkState = (state) => {
      setIsConnected(state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
      setType(state.type);
    };

    NetInfo.fetch()
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((state) => setNetworkState(state))
      .catch((error) => setError(error));

    const onConnectivityChange = (state) => setNetworkState(state);

    const unsubscribe = NetInfo.addEventListener(onConnectivityChange);

    return () => {
      unsubscribe();
      mounted.current = false;
    };
  }, []);

  return [isConnected, isInternetReachable, type, error];
}