import { UserInfo } from '../../../Domain/Model/AuthModel';
import { ActionsTypes } from './ActionsConstants';

export type CurrentUserAction = {
    type: string,
    payload?: UserInfo;
}

export const setCurrentUser = (user: UserInfo) => ({
  type: ActionsTypes.SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = () => ({
  type: ActionsTypes.CLEAR_CURRENT_USER,
});
