import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Unsubscribe } from 'redux';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { login } from '../../Domain/UseCase/LoginUseCase';
import { MAIN_ROUTES } from '../Constants/RoutesConstants';

export function useAuthModelController(authRepository: AuthRepository) {
  const logout = (navigation: NativeStackNavigationProp<any, 'Login'>) => {
    authRepository.logout();
    navigation.navigate(MAIN_ROUTES.AUTH);
  }

  const subscribeCurrentUser = (handler: () => void): Unsubscribe => {
    return authRepository.subscribeCurrentUser(handler);
  }
  const getCurrentUser = () => {
    return authRepository.getCurrentUser();
  };
  const handleClickOnLogin = async (
    navigation: NativeStackNavigationProp<any, 'Home'>,
    username: string,
    password: string,
  ) => {
    await login(username, password, authRepository);
    navigation.navigate(MAIN_ROUTES.TABS);
  };

  return {
    subscribeCurrentUser,
    getCurrentUser,
    handleClickOnLogin,
    logout
  };
}
