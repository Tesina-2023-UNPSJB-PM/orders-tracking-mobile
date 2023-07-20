import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {OnMemoryAuthDataSourceImpl} from '../Data/Datasource/OnMemoryAuthDatasourceImpl';
import {AuthRepositoryImpl} from '../Data/Repository/AuthRepositoryImpl';
import {LogoutButtonComponent} from './Components/LogoutButtonComponent';
import {AuthView} from './Views/AuthView';
import {HomeView} from './Views/HomeView';
import {AuthRepository} from '../Domain/Repository/AuthRepository';
import {MAIN_ROUTES} from './Constants/RoutesConstants';
import {useTheme} from '@rneui/themed';

const LogoutButtonHeader = (
  navigation: NativeStackNavigationProp<any, 'Logout'>,
  authRepository: AuthRepository,
) => (
  <LogoutButtonComponent
    navigation={navigation}
    authRepository={authRepository}></LogoutButtonComponent>
);

export function MainRoutesView() {
  const Stack = createNativeStackNavigator();
  const dataSource = new OnMemoryAuthDataSourceImpl();
  const authRepository = new AuthRepositoryImpl(dataSource);
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MAIN_ROUTES.AUTH}>
        <Stack.Screen name={MAIN_ROUTES.AUTH} options={{headerShown: false}}>
          {props => <AuthView {...props} authRepository={authRepository} />}
        </Stack.Screen>
        <Stack.Screen
          name={MAIN_ROUTES.HOME}
          options={({navigation}) => ({
            headerStyle: {backgroundColor: theme.colors.background},
            headerBackVisible: false,
            headerRight: () => LogoutButtonHeader(navigation, authRepository),
          })}>
          {props => <HomeView {...props} authRepository={authRepository} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
