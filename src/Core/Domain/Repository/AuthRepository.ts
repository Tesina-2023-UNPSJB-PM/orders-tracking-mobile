import { Unsubscribe } from 'redux';
import { UserInfo } from '../Model/AuthModel';

/**
 * Repository managing the history of TicTacToe steps.
 * Each step consists of a board.
 */
export interface AuthRepository {
  auth(username: string, password: string): Promise<UserInfo>;

  getCurrentUser(): UserInfo | undefined;

  subscribeCurrentUser(handler: () => void): Unsubscribe;

  logout(): Promise<void>;
}
