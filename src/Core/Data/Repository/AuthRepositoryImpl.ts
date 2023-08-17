import { Unsubscribe } from 'redux';
import { UserInfo } from '../../Domain/Model/AuthModel';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { AuthDataSource } from '../Datasource/Auth/AuthDatasource';

export class AuthRepositoryImpl implements AuthRepository {
  private authDataSource: AuthDataSource;

  constructor(authDataSource: AuthDataSource) {
    this.authDataSource = authDataSource;
  }

  async auth(username: string, password: string): Promise<UserInfo> {
    const currentUser = await this.authDataSource.getCurrentUser();

    if (currentUser?.userProfile?.username === username) return currentUser;

    const user = await this.authDataSource.authUser(username, password);

    if (!user) throw new Error('Error: User not found.');

    this.authDataSource.setCurrentUser(user);

    return user;
  }

  getCurrentUser(): UserInfo | undefined {
    return this.authDataSource.getCurrentUser();
  }

  subscribeCurrentUser(handler: () => void): Unsubscribe {
    return this.authDataSource.subscribeCurrentUser(handler);
  }

  async logout(): Promise<void> {
      this.authDataSource.clearCurrentUser();
  }
}
