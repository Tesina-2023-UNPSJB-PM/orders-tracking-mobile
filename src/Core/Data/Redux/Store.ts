import { createStore } from 'redux';
import { UserInfo } from '../../Domain/Model/AuthModel';
import UserReducer from './Reducers/UserReducer';
import { MasterData } from '../../Domain/Model/MasterDataModel';

export type ApplicationState = {
  currentUser: UserInfo | undefined;
  masterData: MasterData | undefined;
};

const store = createStore(UserReducer);

export default store;
