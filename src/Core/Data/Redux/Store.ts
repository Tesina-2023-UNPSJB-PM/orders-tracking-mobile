import { createStore } from 'redux';
import { User } from '../../Domain/Model/AuthModel';
import UserReducer from './Reducers/UserReducer';

export type ApplicationState = {
  currentUser: User | undefined;
};

const store = createStore(UserReducer);

export default store;
