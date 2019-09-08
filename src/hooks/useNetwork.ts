/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';

export interface NetworkState {
  online?: boolean;
  since?: Date;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: string;
  rtt?: number;
  type?: string;
}

export const on = (obj: any, ...args: any[]): void => obj.addEventListener(...args);

export const off = (obj: any, ...args: any[]): void => obj.removeEventListener(...args);

const getConnection = (): NetworkState | null => {
  if (typeof navigator !== 'object') {
    return null;
  }

  const nav = navigator as any;

  return nav.connection || nav.mozConnection || nav.webkitConnection;
};

const getConnectionState = (): NetworkState => {
  const connection = getConnection();

  if (!connection) {
    return {};
  }

  const {
    downlink,
    downlinkMax,
    effectiveType,
    type,
    rtt,
  } = connection;

  return {
    downlink,
    downlinkMax,
    effectiveType,
    type,
    rtt,
  };
};

/**
 * Hook that returns network information
 *
 * @example
 *
 * const network = useNetwork();
 */

const useNetwork = (initialState: NetworkState = {}): NetworkState => {
  const [state, setState] = useState<NetworkState>(initialState);

  useEffect((): (() => void) => {
    let localState = state;

    const localSetState = (patch: NetworkState): void => {
      localState = { ...localState, ...patch };
      setState(localState);
    };

    const connection = getConnection();

    const onOnline = (): void => {
      localSetState({
        online: true,
        since: new Date(),
      });
    };

    const onOffline = (): void => {
      localSetState({
        online: false,
        since: new Date(),
      });
    };

    const onConnectionChange = (): void => {
      localSetState(getConnectionState());
    };

    on(window, 'online', onOnline);
    on(window, 'offline', onOffline);

    if (connection) {
      on(connection, 'change', onConnectionChange);

      localSetState({
        ...state,
        online: navigator.onLine,
        since: undefined,
        ...getConnectionState(),
      });
    }

    return (): void => {
      off(window, 'online', onOnline);
      off(window, 'offline', onOffline);

      if (connection) {
        off(connection, 'change', onConnectionChange);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

export default useNetwork;
