import { createStore } from 'redux';
import UserReducer from './Reducers/UserReducer';
import { User } from '../../Domain/Model/AuthModel';

export type ApplicationState = {
    currentUser: User | undefined;
}

const store = createStore(UserReducer);

export default store;