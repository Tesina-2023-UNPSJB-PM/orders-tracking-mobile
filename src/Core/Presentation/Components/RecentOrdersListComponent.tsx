import { Card, ListItem } from '@rneui/base';
import { Icon, Text, makeStyles } from '@rneui/themed';
import { View } from 'react-native';
import { RecentActivityListItem } from '../../Domain/Model/RecentActivityListItemModel';

type RecentOrdersListComponentProps = {
  recentActivityListItems: RecentActivityListItem[];
  onSelectOrder: Function;
};

export function RecentOrdersListComponent({
  recentActivityListItems,
  onSelectOrder,
}: RecentOrdersListComponentProps) {
  const styles = useStyles();

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Tu Última Actividad</Card.Title>
      <Card.Divider></Card.Divider>
      <View>
        {recentActivityListItems.length > 0 ? (
          recentActivityListItems.map(
            ({ title, subtitle, statusIcon, statusColor, id }) => (
              <ListItem
                key={`${title}`}
                bottomDivider
                onPress={() => onSelectOrder(id)}>
                <Icon name={statusIcon} color={statusColor} type="antdesign" />
                <ListItem.Content>
                  <ListItem.Title>{title}</ListItem.Title>
                  <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ),
          )
        ) : (
          <Text>Todavía no tienes actividad registrada!</Text>
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
