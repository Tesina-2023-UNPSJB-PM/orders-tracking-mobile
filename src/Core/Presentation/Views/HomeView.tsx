import {Card, Tab} from '@rneui/base';
import {makeStyles} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AuthRepository} from '../../Domain/Repository/AuthRepository';
import {useAuthModelController} from '../Hook/useAuthModelController';
import {CurrentStatusCardComponent} from '../Components/CurrentStatusCardComponent';
import {RecentOrdersListComponent} from '../Components/RecentOrdersListComponent';

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
      <View style={styles.card}>
        <CurrentStatusCardComponent></CurrentStatusCardComponent>
      </View>

      <View style={styles.list}>
        <RecentOrdersListComponent></RecentOrdersListComponent>
      </View>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },

  card: {
    width: '100%',
  },

  list: {
    marginTop: 12,
    width: '100%',
  },

  tabButton: {color: theme.colors.secondary},
}));
