import { Icon, makeStyles } from '@rneui/themed';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { IMarker } from '../../../../Common/Interfaces/IMarker';

const CircleBorder = ({ size, borderWidth, borderColor, children }: any) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: 0.5 * size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor,
      borderWidth,
    }}>
    {children}
  </View>
);

type AssignedOrdersMapComponentProps = {
  assignedOrdersMarkers?: IMarker[];
  selectedOrderKey?: string;
  onOrderSelected: (childdata: string) => void;
};

export function AssignedOrdersMapComponent({
  assignedOrdersMarkers,
  selectedOrderKey = '',
  onOrderSelected,
}: AssignedOrdersMapComponentProps) {
  const styles = useStyles();
  return assignedOrdersMarkers?.map(({ key, iconName, ...markerProps }) => (
    <Marker key={key} {...markerProps} onPress={() => onOrderSelected(key)}>
      {key == selectedOrderKey ? (
        <CircleBorder
          size={styles.circleStyle.size}
          borderWidth={styles.circleStyle.borderWith}
          borderColor={styles.circleStyle.borderColor}>
          <Icon name={iconName} size={14} type="material-community"></Icon>
        </CircleBorder>
      ) : (
        <Icon name={iconName} size={14} type="material-community"></Icon>
      )}
    </Marker>
  ));
}

const useStyles = makeStyles(theme => ({
  circleStyle: {
    size: 28,
    borderWith: 3,
    borderColor: theme.colors.primary,
  },
}));