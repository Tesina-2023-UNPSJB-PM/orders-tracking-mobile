import axios from 'axios';
import { Unsubscribe } from 'redux';
import { UserInfo } from '../../../Domain/Model/AuthModel';
import {
  clearCurrentUser,
  setCurrentUser,
} from '../../Redux/Actions/UserActions';
import store from '../../Redux/Store';
import { AuthDataSource } from './AuthDatasource';

export class RestAuthDatasourceImpl implements AuthDataSource {
  async setCurrentUser(user: UserInfo): Promise<void> {
    store.dispatch(setCurrentUser(user));
  }

  clearCurrentUser(): void {
    store.dispatch(clearCurrentUser());
  }

  getCurrentUser(): UserInfo | undefined {
    const { user } = store.getState();
    return user.currentUser;
  }

  async authUser(
    username: string,
    password: string,
  ): Promise<UserInfo | undefined> {
    /** @todo add endpoints config file */
    const url = 'http://vps-3107443-x.dattaweb.com/api/tracking-so/auth/login';
    return axios
      .post<UserInfo>(url, { username, password })
      .then(({ data }) => data);
  }

  subscribeCurrentUser(handler: () => void): Unsubscribe {
    return store.subscribe(handler);
  }
}
