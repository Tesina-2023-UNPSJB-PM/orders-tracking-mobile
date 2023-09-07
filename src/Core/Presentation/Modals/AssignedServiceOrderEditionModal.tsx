import { Button } from '@rneui/base';
import { Chip, makeStyles } from '@rneui/themed';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { OrderFormCardComponent } from '../Components/AssignedOrderEdition/OrderFormCard';
import { OrderInfoCardComponent } from '../Components/AssignedOrderEdition/OrderInfoCard';

export type AssignedServiceOrderEditionModalParams = {
  serviceOrder: ServiceOrderDetail;
};

/**
 * Shows a modal for Service Order Delivery Confirmation.
 * @param {*} param0
 * @returns
 */
export const AssignedServiceOrderEditionModal = ({ route }: any) => {
  const styles = useStyles();
  const serviceOrder = route.params.serviceOrder as ServiceOrderDetail;
  const { number, description, status, type, customer, destination } =
    serviceOrder;
  const { name: serviceType } = type;
  const { firstName, lastName, phones: [phone] = ['-'] } = customer;
  const { description: addressDescription } = destination.address;
  const { description: statusDescription } = status;

  const [selectedImage, setSelectedImage] = useState('');

  

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <OrderInfoCardComponent
          serviceOrder={serviceOrder}></OrderInfoCardComponent>
        <OrderFormCardComponent
          serviceOrder={serviceOrder}></OrderFormCardComponent>
        {/* <View
          style={[
            styles.sectionContainer,
            styles.shadowProp,
            styles.lastSection,
          ]}>
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleContainer.sectionTitle}>
                Documentos
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Chip
                title="Mi Imagen"
                icon={{
                  name: 'close',
                  type: 'antdesign',
                  size: 20,
                  color: 'white',
                }}
                iconRight
              />
              <Chip
                title="Mi Documento"
                icon={{
                  name: 'close',
                  type: 'antdesign',
                  size: 20,
                  color: 'white',
                }}
                iconRight
              />
            </View>
          </View>
          <View>
            <Button
              titleStyle={styles.titleSecondaryButton}
              buttonStyle={styles.secondaryButton}
              title={'Adjuntar Documento'}
              onPress={openImagePicker}></Button>
            <Button
              titleStyle={styles.titleSecondaryButton}
              buttonStyle={styles.secondaryButton}
              title={'Tomar Foto'}
              onPress={handleCameraLaunch}></Button>
          </View>
        </View> */}

        <View style={styles.buttonsContainer}>
          <Button
            titleStyle={styles.titleButton}
            buttonStyle={styles.confirmButton}
            title="GUARDAR INFORMACIÓN"
            onPress={() => console.log('onConfirm')}></Button>
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
