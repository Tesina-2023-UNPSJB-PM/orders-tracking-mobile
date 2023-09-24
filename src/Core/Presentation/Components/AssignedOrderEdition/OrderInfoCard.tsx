import { Card, Icon, makeStyles } from '@rneui/themed';
import { Text, View } from 'react-native';
import { ServiceOrderDetail } from '../../../Domain/Model/ServiceOrderDetailModel';

export type AssignedOrderEditionProps = {
  serviceOrder: ServiceOrderDetail;
};
export function OrderInfoCardComponent({
  serviceOrder,
}: AssignedOrderEditionProps) {
  const styles = useStyles();
  const { number, description, status, type, customer, destination } =
    serviceOrder;
  const { name: serviceType } = type;
  const { firstName, lastName, phones: [phone] = ['-'] } = customer;
  const { description: addressDescription } = destination.address;
  const { description: statusDescription } = status;
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleContainer.sectionTitle}>
            Info. del Servicio
          </Text> 
        </View>

        <Text numberOfLines={2} style={styles.text}>
          Orden de Servicio: <Text style={styles.black}>{number}</Text>
        </Text>
        <Text numberOfLines={2} style={styles.text}>
          Tipo de Servicio: <Text style={styles.black}>{serviceType}</Text>
        </Text>
        <Text numberOfLines={2} style={styles.text}>
          Estado: <Text style={styles.black}>{statusDescription}</Text>
        </Text>
        <Text numberOfLines={4} style={styles.text}>
          Descripción: <Text style={styles.black}>{description}</Text>
        </Text>
        <Text style={styles.text}>
          Nombre y Apellido:{' '}
          <Text style={styles.black}>{`${firstName} ${lastName}`}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Teléfono: <Text style={styles.black}>{phone}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={2}>
          Domicilio: <Text style={styles.black}>{addressDescription} </Text>
        </Text>
      </View>
    </Card>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 5,
   // marginVertical: 5,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: 10,
    //marginBottom: 8,
    borderRadius: 10,
  },
  sectionTitleContainer: {
    paddingBottom: 4,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    sectionTitle: { fontSize: 16.5 },
    width: '100%',
  },
  text: { fontSize: 12.5, marginBottom: 2 },
  black: { fontSize: 12.5, fontWeight: 'bold' },
}));
