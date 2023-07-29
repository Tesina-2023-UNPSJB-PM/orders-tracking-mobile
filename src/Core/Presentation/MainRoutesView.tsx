import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { RestAuthDatasourceImpl } from '../Data/Datasource/Auth/RestAuthDatasourceImpl';
import { AuthRepositoryImpl } from '../Data/Repository/AuthRepositoryImpl';
import { AuthRepository } from '../Domain/Repository/AuthRepository';
import { CurrentUserAvatarComponent } from './Components/CurrentUserAvatarComponent';
import { LogoutButtonComponent } from './Components/LogoutButtonComponent';
import { MAIN_ROUTES } from './Constants/RoutesConstants';
import { AuthView } from './Views/AuthView';
import { MyTabsView } from './Views/MyTabsView';

const LogoutButtonHeader = (
  navigation: NativeStackNavigationProp<any, 'Logout'>,
  authRepository: AuthRepository,
) => (
  <LogoutButtonComponent
    navigation={navigation}
    authRepository={authRepository}></LogoutButtonComponent>
);

const AvatarButtonHeader = (authRepository: AuthRepository) => (
  <CurrentUserAvatarComponent
    authRepository={authRepository}></CurrentUserAvatarComponent>
);

export function MainRoutesView() {
  const Stack = createNativeStackNavigator();
  const dataSource = new RestAuthDatasourceImpl();
  const authRepository = new AuthRepositoryImpl(dataSource);
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MAIN_ROUTES.AUTH}>
        <Stack.Screen name={MAIN_ROUTES.AUTH} options={{headerShown: false}}>
          {props => <AuthView {...props} authRepository={authRepository} />}
        </Stack.Screen>
        <Stack.Screen
          name={MAIN_ROUTES.TABS}
          options={({navigation}) => ({
            headerStyle: {backgroundColor: theme.colors.background},
            headerBackVisible: false,
            headerLeft: () => AvatarButtonHeader(authRepository),
            headerRight: () => LogoutButtonHeader(navigation, authRepository),
          })}>
          {props => <MyTabsView {...props} authRepository={authRepository}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
