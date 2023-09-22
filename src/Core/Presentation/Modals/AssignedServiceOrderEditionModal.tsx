import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import { makeStyles } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  SuccessDialogComponent
} from '../../../Common/Components/SuccessDialogComponent';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrderHistoryPost } from '../../Domain/Model/ServiceOrderHistoryPost';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { OrderFormCardComponent } from '../Components/AssignedOrderEdition/OrderFormCard';
import { OrderInfoCardComponent } from '../Components/AssignedOrderEdition/OrderInfoCard';
import { MAIN_ROUTES } from '../Constants/RoutesConstants';
import { Reason } from '../../Domain/Model/MasterDataModel';

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
  const [loading, setLoading] = useState(false);

  const [reasons, setReasons] = useState<Reason[]>([]);

  const onInfoUpdated = (serviceOrderHistoryPost: ServiceOrderHistoryPost) => {
    setHistoryPost(serviceOrderHistoryPost);
  };

  const onSaveHistoryPost = async () => {
    if (!historyPost) return;
    setSavingInfo(true);
    setLoading(true);
    await serviceOrdersRepository.addServiceOrderHistoryRecord(historyPost);
    setLoading(false);
  };

  useEffect(() => {
    serviceOrdersRepository.getMasterData().then((masterData) => {
      console.log("🚀 ~ file: AssignedServiceOrderEditionModal.tsx:59 ~ serviceOrdersRepository.getMasterData ~ masterData:", masterData)
      setReasons(masterData.reasons)
    })
  },[])

  return (
    <View style={styles.container}>
      <SuccessDialogComponent
        title="Actualizando información"
        description="Su información fue actualizada correctamente!"
        isLoading={loading}
        isVisible={savingInfo}
        doneButtonTitle="Aceptar"
        doneButtonHandler={() => {
          setSavingInfo(false);
          navigation.navigate(MAIN_ROUTES.HOME);
        }}></SuccessDialogComponent>

      <ScrollView>
        <OrderInfoCardComponent
          serviceOrder={serviceOrder}></OrderInfoCardComponent>
        <OrderFormCardComponent
          serviceOrder={serviceOrder}
          reasons={reasons}
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
