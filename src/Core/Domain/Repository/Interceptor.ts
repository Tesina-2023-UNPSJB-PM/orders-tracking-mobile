export interface AppInterceptor {
  initialize(): Promise<void>;
}
