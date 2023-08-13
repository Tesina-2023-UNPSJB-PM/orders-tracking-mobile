import { User } from '../../../Domain/Model/AuthModel';
import { ActionsTypes } from './ActionsConstants';

export type CurrentUserAction = {
    type: string,
    payload?: User;
}

export const setCurrentUser = (user: User) => ({
  type: ActionsTypes.SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = () => ({
  type: ActionsTypes.CLEAR_CURRENT_USER,
});
