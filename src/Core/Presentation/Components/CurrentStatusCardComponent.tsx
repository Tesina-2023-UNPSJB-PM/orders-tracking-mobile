import { Badge, Card } from '@rneui/base';
import { makeStyles } from '@rneui/themed';
import dayjs from 'dayjs';
import { Text, View } from 'react-native';

type CurrentStatusCardComponentProp = {
  assignedPendingOrders: number | undefined;
};

export function CurrentStatusCardComponent({
  assignedPendingOrders,
}: CurrentStatusCardComponentProp) {
  const styles = useStyles();
  
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContainer}>
        <View style={styles.dateContainer}>
          <Text>{dayjs().format('DD/MM/YYYY')}</Text>
        </View>
        <View style={styles.ordersContainer}>
          <Badge
            value={assignedPendingOrders}
            containerStyle={{marginEnd: 4}}
            badgeStyle={styles.ordersPendingBadge}
            textStyle={styles.ordersPendingText}></Badge>
          <Text>órdenes asignadas pendientes.</Text>
        </View>
      </View>
    </Card>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    borderWidth: 0,
    borderRadius: 5,
  },

  cardContainer: {
    flexDirection: 'column',
  },

  dateContainer: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    width: '100%',
  },

  ordersContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
  },

  ordersPendingText: {fontSize: 32, fontWeight: '600'},

  ordersPendingBadge: {
    height: 38,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
}));
