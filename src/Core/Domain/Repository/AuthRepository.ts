import { Unsubscribe } from 'redux';
import { User } from '../Model/AuthModel';

/**
 * Repository managing the history of TicTacToe steps.
 * Each step consists of a board.
 */
export interface AuthRepository {
  auth(username: string, password: string): Promise<User>;

  getCurrentUser(): User | undefined;

  subscribeCurrentUser(handler: () => void): Unsubscribe;

  logout(): Promise<void>;
}
