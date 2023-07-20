import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthRepository} from '../../Domain/Repository/AuthRepository';
import {login} from '../../Domain/UseCase/LoginUseCase';
import { Unsubscribe } from 'redux';

export function useAuthModelController(authRepository: AuthRepository) {
  const logout = (navigation: NativeStackNavigationProp<any, 'Login'>) => {
    authRepository.logout();
    navigation.navigate('Auth');
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
    navigation.navigate('Home');
  };

  return {
    subscribeCurrentUser,
    getCurrentUser,
    handleClickOnLogin,
    logout
  };
}
