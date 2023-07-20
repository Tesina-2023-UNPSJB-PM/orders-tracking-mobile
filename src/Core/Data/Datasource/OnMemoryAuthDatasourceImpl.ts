import {Unsubscribe} from 'redux';
import {User} from '../../Domain/Model/AuthModel';
import {clearCurrentUser, setCurrentUser} from '../Redux/Actions/UserActions';
import store from '../Redux/Store';
import {AuthDataSource} from './AuthDatasource';

export class OnMemoryAuthDataSourceImpl implements AuthDataSource {
  private _users: User[] = [
    {
      username: 'juanmenitti',
      password: 'juan1234',
      firstName: 'Juan',
      lastName: 'Menitti',
    },
    {
      username: 'tomasarza',
      password: 'tomas1234',
      firstName: 'Tomas',
      lastName: 'Arza',
    },
  ];

  async setCurrentUser(user: User): Promise<void> {
    store.dispatch(setCurrentUser(user));
  }

  clearCurrentUser(): void {
    store.dispatch(clearCurrentUser());
  }

  getCurrentUser(): User | undefined {
    const {user} = store.getState();
    return user.currentUser;
  }

  async getUser(username: string, password: string): Promise<User | undefined> {
    return this._users.find(
      ({username: _username, password: _password}) =>
        _username === username && _password === password,
    );
  }

  subscribeCurrentUser(handler: () => void): Unsubscribe {
    return store.subscribe(handler);
  }
}
