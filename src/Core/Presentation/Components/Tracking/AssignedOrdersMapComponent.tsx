/* eslint-disable react/react-in-jsx-scope */
import { makeStyles } from '@rneui/themed';
import { Image, Text, View } from 'react-native';
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
    ({ key, iconColor, iconSrc, ...markerProps }, index) => (
      <Marker key={key} {...markerProps} onPress={() => onOrderSelected(key)}>
        {key != selectedOrderKey ? (
          <View>
            <Image
              source={{
                uri: iconSrc,
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>{index + 1}</Text>
          </View>
        ) : (
          <View>
            <CircleBorder
              style={styles.circleBorderStyle}
              size={32}
              borderWidth={3}
              borderColor={iconColor}>
              <Image
                source={{
                  uri: iconSrc,
                }}
                style={styles.imageStyle}
              />
            </CircleBorder>
            <Text style={styles.circleTextStyle}>{index + 1}</Text>
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
  imageStyle: { width: 24, height: 24 },
  circleTextStyle: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 12,
    alignSelf: 'center',
    height: 12,
    overflow: 'visible',
  },
  textStyle: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 12,
    alignSelf: 'center',
  },
  circleBorderStyle: {
    marginTop: 12,
  },
}));
