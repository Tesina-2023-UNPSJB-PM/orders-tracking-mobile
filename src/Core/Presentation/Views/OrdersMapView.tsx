import {makeStyles} from '@rneui/themed';
import {Text, View} from 'react-native';

export function OrdersMapView() {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>En construcción!</Text>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
