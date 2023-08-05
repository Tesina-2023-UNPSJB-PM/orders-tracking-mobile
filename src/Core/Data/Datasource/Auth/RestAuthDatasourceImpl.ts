import {Unsubscribe} from 'redux';
import {User} from '../../../Domain/Model/AuthModel';
import {clearCurrentUser, setCurrentUser} from '../../Redux/Actions/UserActions';
import store from '../../Redux/Store';
import {AuthDataSource} from './AuthDatasource';
import axios from 'axios';

export class RestAuthDatasourceImpl implements AuthDataSource {
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

  async authUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    /** @todo add endpoints config file */
    const url = 'http://vps-3107443-x.dattaweb.com/api/auth/login';
    const user: User = {username, firstName: 'Pepe', lastName: 'Argento'}
    return axios.post(url, {username, password}).then(() => user);
  }

  subscribeCurrentUser(handler: () => void): Unsubscribe {
    return store.subscribe(handler);
  }
}
