import {makeStyles} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AuthRepository} from '../../Domain/Repository/AuthRepository';
import {ServiceOrdersRepository} from '../../Domain/Repository/ServiceOrdersRepository';
import {CurrentStatusCardComponent} from '../Components/CurrentStatusCardComponent';
import {RecentOrdersListComponent} from '../Components/RecentOrdersListComponent';
import {
  RecentActivityListItem,
  useServiceOrderItemModelController,
} from '../Hook/useServiceOrderItemModelController';
import {RecentActivityListItemPipe} from '../Pipes/RecentActivityListItemPipe';

type HomeViewProps = {
  authRepository: AuthRepository;
  serviceOrdersRepository: ServiceOrdersRepository;
};

export function HomeView({serviceOrdersRepository}: HomeViewProps) {
  const styles = useStyles();

  const {getEmployeeOrdersSummary} = useServiceOrderItemModelController(
    serviceOrdersRepository,
  );

  const [assignedPendingOrders, setAssignedPendingOrders] = useState<number>();
  const [recentActivityListItem, setRecentActivityListItem] = useState<
    RecentActivityListItem[]
  >([]);

  useEffect(() => {
    getEmployeeOrdersSummary().then(
      ({recentActivity, assignedServiceOrders}) => {
        setAssignedPendingOrders(assignedServiceOrders.length);
        setRecentActivityListItem(RecentActivityListItemPipe(recentActivity));
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <CurrentStatusCardComponent
          assignedPendingOrders={
            assignedPendingOrders
          }></CurrentStatusCardComponent>
      </View>

      <View style={styles.list}>
        <RecentOrdersListComponent
          recentActivityListItems={
            recentActivityListItem
          }></RecentOrdersListComponent>
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
