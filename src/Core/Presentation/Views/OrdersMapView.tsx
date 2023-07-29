import {makeStyles} from '@rneui/themed';
import {useEffect} from 'react';
import {Text, View} from 'react-native';

// import config in the header
import Config from 'react-native-config';

export function OrdersMapView() {
  const styles = useStyles();

  useEffect(() => {
    // or all variables
    console.log(Config);
  });
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
