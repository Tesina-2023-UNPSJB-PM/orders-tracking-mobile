import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnMemoryAuthDataSourceImpl } from '../Data/Datasource/OnMemoryAuthDatasourceImpl';
import { AuthRepositoryImpl } from '../Data/Repository/AuthRepositoryImpl';
import { AuthView } from './AuthView';
import { HomeView } from './HomeView';
import { LogoutButtonComponent } from './LogoutButtonComponent';

export function MainView() {
  const Stack = createNativeStackNavigator();
  const dataSource = new OnMemoryAuthDataSourceImpl();
  const authRepository = new AuthRepositoryImpl(dataSource);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" options={{headerShown: false}}>
          {props => <AuthView {...props} authRepository={authRepository} />}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          options={({navigation}) => ({
            headerBackVisible: false,
            headerRight: () => (
              <LogoutButtonComponent
                navigation={navigation}
                authRepository={authRepository}></LogoutButtonComponent>
            ),
          })}>
          {props => <HomeView {...props} authRepository={authRepository} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
