import { Button } from '@rneui/base';
import { makeStyles } from '@rneui/themed';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrderHistoryPost } from '../../Domain/Model/ServiceOrderHistoryPost';
import { OrderFormCardComponent } from '../Components/AssignedOrderEdition/OrderFormCard';
import { OrderInfoCardComponent } from '../Components/AssignedOrderEdition/OrderInfoCard';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MAIN_ROUTES } from '../Constants/RoutesConstants';
import { createSuccessDialogAlert } from '../../../Common/Components/SuccessDialogComponent';
import { LoadingDialogComponent } from '../../../Common/Components/LoadingDialogComponent';

export type AssignedServiceOrderEditionModalParams = {
  route: any;
  serviceOrder?: ServiceOrderDetail;
  serviceOrdersRepository: ServiceOrdersRepository;
};

/**
 * Shows a modal for Service Order Delivery Confirmation.
 * @param {*} param0
 * @returns
 */
export const AssignedServiceOrderEditionModal = ({
  route,
  serviceOrdersRepository,
}: AssignedServiceOrderEditionModalParams) => {
  const styles = useStyles();
  const serviceOrder = route.params.serviceOrder as ServiceOrderDetail;
  const [historyPost, setHistoryPost] =
    useState<ServiceOrderHistoryPost | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [savingInfo, setSavingInfo] = useState(false);

  const onInfoUpdated = (serviceOrderHistoryPost: ServiceOrderHistoryPost) => {
    setHistoryPost(serviceOrderHistoryPost);
  };

  const onSaveHistoryPost = async () => {
    if (!historyPost) return;
    setSavingInfo(true);
    await serviceOrdersRepository.addServiceOrderHistoryRecord(historyPost);
    setSavingInfo(false);
    createSuccessDialogAlert(
      'Orden de servicio actualizada!',
      'La orden de servicio fue actualizada con exito!',
      { text: 'aceptar', onPress: () => navigation.navigate(MAIN_ROUTES.HOME) },
    );
  };

  return (
    <View style={styles.container}>
      <LoadingDialogComponent
        title="Actualizando información"
        description="Espere..."
        isVisible={savingInfo}></LoadingDialogComponent>

      <ScrollView>
        <OrderInfoCardComponent
          serviceOrder={serviceOrder}></OrderInfoCardComponent>
        <OrderFormCardComponent
          serviceOrder={serviceOrder}
          onInfoUpdated={onInfoUpdated}></OrderFormCardComponent>

        <View style={styles.buttonsContainer}>
          <Button
            titleStyle={styles.titleButton}
            buttonStyle={styles.confirmButton}
            title="GUARDAR INFORMACIÓN"
            onPress={() => onSaveHistoryPost()}></Button>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    //marginVertical: 20,
    // borderWidth: 1,
    // borderColor: 'black',
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
    //flexDirection: 'row',
    //width: '100%',
    justifyContent: 'flex-end',
    //alignItems: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'black',
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
