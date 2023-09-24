import { makeStyles } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RecentActivityListItem } from '../../Domain/Model/RecentActivityListItemModel';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { CurrentStatusCardComponent } from '../Components/CurrentStatusCardComponent';
import { RecentOrdersListComponent } from '../Components/RecentOrdersListComponent';
import { useServiceOrderItemModelController } from '../Hook/useServiceOrderItemModelController';
import { RecentActivityListItemPipe } from '../Pipes/RecentActivityListItemPipe';
import { useNavigationState } from '@react-navigation/native';

type HomeViewProps = {
  authRepository: AuthRepository;
  serviceOrdersRepository: ServiceOrdersRepository;
};

export function HomeView({ serviceOrdersRepository }: HomeViewProps) {
  const styles = useStyles();

  const { getEmployeeOrdersSummary } = useServiceOrderItemModelController(
    serviceOrdersRepository,
  );

  const [assignedPendingOrders, setAssignedPendingOrders] = useState<number>();
  const [recentActivityListItem, setRecentActivityListItem] = useState<
    RecentActivityListItem[]
  >([]);

  const index = useNavigationState(state => state.index);

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (index !== 0) return;
    console.log("🚀 ~ file: HomeView.tsx:36 ~ useEffect ~ index:", index)

    getEmployeeOrdersSummary().then(
      ({ recentActivity, assignedServiceOrders }) => {
        setAssignedPendingOrders(assignedServiceOrders.length);
        setRecentActivityListItem(RecentActivityListItemPipe(recentActivity));
      },
    );
  }, [index]);

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

  tabButton: { color: theme.colors.secondary },
}));
