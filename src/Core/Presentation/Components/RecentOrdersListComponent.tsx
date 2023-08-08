import {Card, ListItem} from '@rneui/base';
import {Icon, makeStyles} from '@rneui/themed';
import {View} from 'react-native';
import {RecentActivityListItem} from '../Hook/useServiceOrderItemModelController';

type RecentOrdersListComponentProps = {
  recentActivityListItems: RecentActivityListItem[];
};

export function RecentOrdersListComponent({
  recentActivityListItems,
}: RecentOrdersListComponentProps) {
  const styles = useStyles();
  
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Tu Última Actividad</Card.Title>
      <Card.Divider></Card.Divider>
      <View>
        {recentActivityListItems.map(
          ({title, subtitle, statusIcon, statusColor}) => (
            <ListItem key={`${title}`} bottomDivider>
              <Icon name={statusIcon} color={statusColor} type="antdesign" />
              <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
              </ListItem.Content>
              {/* <ListItem.Chevron /> */}
            </ListItem>
          ),
        )}
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
