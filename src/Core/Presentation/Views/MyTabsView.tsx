import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeView } from './HomeView';
import { OrdersMapView } from './OrdersMapView';
import { Icon } from '@rneui/themed';

const Tab = createMaterialBottomTabNavigator();

export function MyTabsView({
  authRepository,
  locationRepository,
  serviceOrdersRepository,
}: any) {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#C9ADA7' }}
      inactiveColor="#4A4E69">
      <Tab.Screen
        name="Home"
        options={{tabBarIcon: () => <Icon name={'home'}/>}}
        children={props => (
          <HomeView
            {...props}
            authRepository={authRepository}
            serviceOrdersRepository={serviceOrdersRepository}
          />
        )}
      />
      <Tab.Screen
        name="Maps"
        options={{tabBarIcon: () => <Icon name={'route'}/>}}
        children={() => (
          <OrdersMapView
            locationRepository={locationRepository}
            serviceOrdersRepository={serviceOrdersRepository}
          />
        )}
      />
    </Tab.Navigator>
  );
}
