import { Unsubscribe } from "redux";
import { User } from "../../Domain/Model/AuthModel";

/**
 * DataSource access interface
 * Assuming network access, all methods are asynchronous.
 */
export interface AuthDataSource {
  clearCurrentUser(): void;
  setCurrentUser(user: User): void;
  getCurrentUser(): User | undefined;
  findUser(username: string, password: string): Promise<User | undefined>;
  subscribeCurrentUser(handler: () => void): Unsubscribe;
}
