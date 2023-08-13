import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeView } from './HomeView';
import { OrdersMapView } from './OrdersMapView';

const Tab = createMaterialBottomTabNavigator();

export function MyTabsView({authRepository, locationRepository, serviceOrdersRepository}: any) {
  return (
    <Tab.Navigator barStyle={{backgroundColor: '#C9ADA7',}} inactiveColor='#4A4E69'>
      <Tab.Screen name="Home" children={props => <HomeView {...props}  authRepository={authRepository} serviceOrdersRepository={serviceOrdersRepository}/>}/>
      <Tab.Screen name="Maps" children={() => <OrdersMapView locationRepository={locationRepository}/>}/>
    </Tab.Navigator>
  );
}