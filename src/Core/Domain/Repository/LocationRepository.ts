export type WatchPositionOptions = any;
export type InitializeOptions = any;

export interface LocationRepository {
    initialize(options: InitializeOptions): void;

    watchPosition(options: WatchPositionOptions): any;
}