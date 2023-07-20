import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { AuthRepository } from '../Domain/Repository/AuthRepository';
import { useAuthModelController } from './Hook/useAuthModelController';

type HomeViewProps = {
  route: any;
  navigation: any;
  authRepository: AuthRepository;
};

export function HomeView({navigation, authRepository}: HomeViewProps) {
  const {getCurrentUser, subscribeCurrentUser, logout} =
    useAuthModelController(authRepository);
  const currentUser = getCurrentUser();

  useEffect(() => {
    subscribeCurrentUser(() => {
      const _currentUser = getCurrentUser();
      console.log(
        '🚀 ~ file: HomeView.tsx:18 ~ useAuthModelController ~ _currentUser:',
        _currentUser,
      );
    });
  });

  return (
    <View>
      <Text>Bienvenido {currentUser?.username}</Text>
    </View>
  );
}
