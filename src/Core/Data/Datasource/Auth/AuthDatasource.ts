import { Unsubscribe } from 'redux';
import { UserInfo } from '../../../Domain/Model/AuthModel';

/**
 * DataSource access interface
 * Assuming network access, all methods are asynchronous.
 */
export interface AuthDataSource {
  clearCurrentUser(): void;
  setCurrentUser(user: UserInfo): void;
  getCurrentUser(): UserInfo | undefined;
  authUser(username: string, password: string): Promise<UserInfo | undefined>;
  subscribeCurrentUser(handler: () => void): Unsubscribe;
}
