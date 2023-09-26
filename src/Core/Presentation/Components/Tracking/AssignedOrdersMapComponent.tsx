import { Icon, makeStyles } from '@rneui/themed';
import { Text, View } from 'react-native';
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
  return assignedOrdersMarkers?.map(
    ({ key, iconName, iconColor, ...markerProps }, index) => (
      <Marker key={key} {...markerProps} onPress={() => onOrderSelected(key)}>
        {/* <Icon
            name={iconName}
            color={iconColor}
            size={24}
            type="material-community"></Icon> */}
        {key != selectedOrderKey ? (
          <View>
            <Icon
              style={{
                marginTop: 12,
              }}
              name={iconName}
              color={iconColor}
              size={24}
              type="material-community"></Icon>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: 12,
                alignSelf: 'center',
              }}>
              {index + 1}
            </Text>
          </View>
        ) : (
          <View>
            <CircleBorder
              style={{
                marginTop: 12,
              }}
              size={32}
              borderWidth={3}
              borderColor={iconColor}>
              <Icon
                name={iconName}
                color={iconColor}
                size={24}
                type="material-community"></Icon>
            </CircleBorder>
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: 12,
                alignSelf: 'center',
                height: 12,
                overflow: 'visible',
              }}>
              {index + 1}
            </Text>
          </View>
        )}
      </Marker>
    ),
  );
}

const useStyles = makeStyles(theme => ({
  circleStyle: {
    size: 28,
    borderWith: 3,
    borderColor: theme.colors.primary,
  },
}));
