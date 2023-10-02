import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { makeStyles } from '@rneui/themed';
import { ScrollView, View } from 'react-native';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { OrderInfoCardComponent } from '../Components/AssignedOrderEdition/OrderInfoCard';

export type ServiceOrderInfoModalParams = {
  route: any;
};

/**
 * Shows a modal for Service Order Delivery Confirmation.
 * @param {*} param0
 * @returns
 */
export const ServiceOrderInfoModal = ({
  route,
}: ServiceOrderInfoModalParams) => {
  const styles = useStyles();
  const serviceOrder = route.params.serviceOrder as ServiceOrderDetail;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <OrderInfoCardComponent
          serviceOrder={serviceOrder}></OrderInfoCardComponent>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
  },
  buttonsContainer: {
    marginHorizontal: 10,
    marginBottom: 0,
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleButton: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  cancelButton: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    width: '100%',
  },
  titleSecondaryButton: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
    borderRadius: 16,
    height: 32,
    width: '100%',
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  sectionTitleContainer: {
    paddingBottom: 4,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    sectionTitle: { fontSize: 16.5 },
  },
  lastSection: {
    flex: 1,
    height: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 4,
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  text: { fontSize: 12.5, marginBottom: 2 },
  black: { fontSize: 12.5, fontWeight: 'bold' },
  shadowProp: {
    shadowColor: theme.colors.background,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}));
