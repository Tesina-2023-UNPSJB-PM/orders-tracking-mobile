import { Card } from '@rneui/base';
import { makeStyles } from '@rneui/themed';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { useAuthModelController } from '../Hook/useAuthModelController';

type HomeViewProps = {
  authRepository: AuthRepository;
};

export function HomeView({authRepository}: HomeViewProps) {
  const styles = useStyles();
  const {getCurrentUser, subscribeCurrentUser} =
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
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>Bienvenido/a {currentUser?.username}</Card.Title>
        <Card.Divider></Card.Divider>
        <Text>Tienes 5 órdenes asignadas.</Text>
        <Text>Llevas resueltas 10 órdenes en el último mes.</Text>
      </Card>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    //justifyContent: 'center',
  },

  card: {
    width: '80%',
    borderWidth: 0,
    borderRadius: 5,
  }
}));
