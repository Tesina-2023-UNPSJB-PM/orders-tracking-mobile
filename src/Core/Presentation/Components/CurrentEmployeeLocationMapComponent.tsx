import { Icon } from '@rneui/themed';
import { Marker } from 'react-native-maps';

type CurrentEmployeeLocationMapComponentProps = {
  coordinate:
    | {
        latitude: number;
        longitude: number;
      }
    | undefined;
};

export function CurrentEmployeeLocationMapComponent({
  coordinate,
}: CurrentEmployeeLocationMapComponentProps) {
  return (
    coordinate && (
      <Marker title="Tu posición actual!" coordinate={coordinate}>
        <Icon name="man" type="entypo" size={25} />
      </Marker>
    )
  );
}
