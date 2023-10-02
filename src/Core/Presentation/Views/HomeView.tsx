import { makeStyles } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { RecentActivityListItem } from '../../Domain/Model/RecentActivityListItemModel';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { CurrentStatusCardComponent } from '../Components/CurrentStatusCardComponent';
import { RecentOrdersListComponent } from '../Components/RecentOrdersListComponent';
import { useServiceOrderItemModelController } from '../Hook/useServiceOrderItemModelController';
import { RecentActivityListItemPipe } from '../Pipes/RecentActivityListItemPipe';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeViewProps = {
  authRepository: AuthRepository;
  serviceOrdersRepository: ServiceOrdersRepository;
};

export function HomeView({ serviceOrdersRepository }: HomeViewProps) {
  const styles = useStyles();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { getEmployeeOrdersSummary, getEmployeeOrderDetail } =
    useServiceOrderItemModelController(serviceOrdersRepository);

  const [assignedPendingOrders, setAssignedPendingOrders] = useState<number>();
  const [recentActivityListItem, setRecentActivityListItem] = useState<
    RecentActivityListItem[]
  >([]);

  const index = useNavigationState(state => state.index);

  useEffect(() => {
    if (index !== 0) return;

    getEmployeeOrdersSummary().then(
      ({ recentActivity, assignedServiceOrders }) => {
        setAssignedPendingOrders(assignedServiceOrders.length);
        setRecentActivityListItem(RecentActivityListItemPipe(recentActivity));
      },
    );
  }, [index]);

  const goToAssignedOrderDetailModal = async (orderId?: number) => {

    if (!orderId) return;

    const serviceOrder = await getEmployeeOrderDetail(orderId);

    navigation.navigate('ServiceOrderInfo', {
      serviceOrder,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <CurrentStatusCardComponent
            assignedPendingOrders={
              assignedPendingOrders
            }></CurrentStatusCardComponent>
        </View>

        <View style={styles.list}>
          <RecentOrdersListComponent
            recentActivityListItems={recentActivityListItem}
            onSelectOrder={(orderId: number) =>
              goToAssignedOrderDetailModal(orderId)
            }></RecentOrdersListComponent>
        </View>
      </View>
    </ScrollView>
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

  tabButton: { color: theme.colors.secondary },
}));
