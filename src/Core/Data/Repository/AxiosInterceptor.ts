import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Alert } from 'react-native';
import { MAIN_ROUTES } from '../../Presentation/Constants/RoutesConstants';
import { AppInterceptor } from '../../Domain/Repository/Interceptor';
import { AuthDataSource } from '../Datasource/_index';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';

export class AxiosInterceptor implements AppInterceptor {
  private navigation: NativeStackNavigationProp<any, string>;
  private authDataSource: AuthRepository;
  constructor(
    navigation: NativeStackNavigationProp<any, string>,
    authDataSource: AuthRepository,
  ) {
    this.navigation = navigation;
    this.authDataSource = authDataSource;
  }

  async initialize() {
    

    axios.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        console.log(err);
        
        Alert.alert(
          'Ha ocurrido un error',
          'Ha ocurrido un error inesperado, intente nuevamente.',
          [
            {
              text: 'Continuar',
              onPress: () =>
                this.authDataSource.getCurrentUser()
                  ? this.navigation.navigate(MAIN_ROUTES.HOME)
                  : this.navigation.navigate(MAIN_ROUTES.AUTH),
            },
          ],
        );
      },
    );
  }
}
