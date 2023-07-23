import {Card, Icon, ListItem} from '@rneui/base';
import {makeStyles} from '@rneui/themed';
import {Text, View} from 'react-native';

export function RecentOrdersListComponent() {
  const styles = useStyles();
  const recentOrders = [
    {title: 'Orden de Servicio #1234', subtitle: '15:25'},
    {title: 'Orden de Servicio #1233', subtitle: '14:10'},
    {title: 'Orden de Servicio #1210', subtitle: '12:48'},
  ];
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Última Actividad</Card.Title>
      <Card.Divider></Card.Divider>
      <View>
        {recentOrders.map((recentOrder, index) => (
          <ListItem id={`${index}`} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{recentOrder.title}</ListItem.Title>
              <ListItem.Subtitle>{recentOrder.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  card: {
    borderWidth: 0,
    borderRadius: 5,
  },
}));
