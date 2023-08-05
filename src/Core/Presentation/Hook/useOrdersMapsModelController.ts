import {
  LocationRepository,
  WatchPositionOptions,
} from '../../Domain/Repository/LocationRepository';

export function useOrdersMapsModelController(
  locationRepository: LocationRepository,
) {
  const watchPosition = (options: WatchPositionOptions) => {
    return locationRepository.watchPosition(options);
  };

  return {
    watchPosition,
  };
}
