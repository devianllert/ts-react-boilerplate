import { useState, useEffect } from 'react';

export interface GeoLocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error?: Error | PositionError;
}

/**
 * Hook that returns current geolocation
 *
 * @example
 *
 * const geolocation = useCurrentGeolocation();
 */

const useCurrentGeolocation = (options?: PositionOptions): GeoLocationState => {
  const [state, setState] = useState<GeoLocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });

  const onEvent: PositionCallback = (event): void => {
    setState({
      loading: false,
      accuracy: event.coords.accuracy,
      altitude: event.coords.altitude,
      altitudeAccuracy: event.coords.altitudeAccuracy,
      heading: event.coords.heading,
      latitude: event.coords.latitude,
      longitude: event.coords.longitude,
      speed: event.coords.speed,
      timestamp: event.timestamp,
    });
  };

  const onEventError: PositionErrorCallback = (error): void => {
    setState((oldState: GeoLocationState): GeoLocationState => ({ ...oldState, loading: false, error }));
  };

  useEffect((): void => {
    if (!navigator.geolocation) {
      setState((oldState: GeoLocationState): GeoLocationState => ({
        ...oldState,
        loading: false,
        error: Error('Geolocation is not supported'),
      }));

      return;
    }

    navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);
  }, [options]);

  return state;
};

export default useCurrentGeolocation;
