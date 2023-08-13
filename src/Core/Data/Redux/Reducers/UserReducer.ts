import { combineReducers } from 'redux';
import { ActionsTypes } from '../Actions/ActionsConstants';
import { CurrentUserAction } from '../Actions/UserActions';
import { ApplicationState } from '../Store';

const INITIAL_STATE: ApplicationState = {
  currentUser: undefined,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: CurrentUserAction,
): ApplicationState => {
  switch (action.type) {
    case ActionsTypes.SET_CURRENT_USER:
      return {...state, currentUser: action.payload};
    case ActionsTypes.CLEAR_CURRENT_USER:
      return {...state, ...INITIAL_STATE};
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
});
