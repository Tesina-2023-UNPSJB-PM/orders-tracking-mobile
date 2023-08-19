import { createStore } from 'redux';
import { UserInfo } from '../../Domain/Model/AuthModel';
import UserReducer from './Reducers/UserReducer';

export type ApplicationState = {
  currentUser: UserInfo | undefined;
};

const store = createStore(UserReducer);

export default store;
