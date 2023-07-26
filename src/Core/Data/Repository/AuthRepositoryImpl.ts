import { Unsubscribe } from 'redux';
import { User } from '../../Domain/Model/AuthModel';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { AuthDataSource } from '../Datasource/AuthDatasource';

export class AuthRepositoryImpl implements AuthRepository {
  private authDataSource: AuthDataSource;

  constructor(authDataSource: AuthDataSource) {
    this.authDataSource = authDataSource;
  }

  async auth(username: string, password: string): Promise<User> {
    const currentUser = await this.authDataSource.getCurrentUser();

    if (currentUser?.username === username) return currentUser;

    const user = await this.authDataSource.authUser(username, password);

    if (!user) throw new Error('Error: User not found.');

    this.authDataSource.setCurrentUser(user);

    return user;
  }

  getCurrentUser(): User | undefined {
    return this.authDataSource.getCurrentUser();
  }

  subscribeCurrentUser(handler: () => void): Unsubscribe {
    return this.authDataSource.subscribeCurrentUser(handler);
  }

  async logout(): Promise<void> {
      this.authDataSource.clearCurrentUser();
  }
}
