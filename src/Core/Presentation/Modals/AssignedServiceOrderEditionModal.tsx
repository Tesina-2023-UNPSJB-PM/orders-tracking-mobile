import { Button } from '@rneui/base';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { makeStyles } from '@rneui/themed';

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
  const [cancelationReason, onChangeCancelationReason] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.sectionContainer, styles.shadowProp]}>
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
        </View>
        <View style={[styles.sectionContainer, styles.shadowProp]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleContainer.sectionTitle}>
              Info. del Solicitante
            </Text>
          </View>
          <Text style={styles.text}>
            Nombre y Apellido:{' '}
            <Text style={styles.black}>{`${firstName} ${lastName}`}</Text>
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            Teléfono: <Text style={styles.black}>{phone}</Text>
          </Text>
        </View>
        <View style={[styles.sectionContainer, styles.shadowProp]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleContainer.sectionTitle}>
              Domicilio de Entrega
            </Text>
          </View>
          <Text style={styles.text} numberOfLines={2}>
            Calle: <Text style={styles.black}>{addressDescription} </Text>
          </Text>
        </View>
        <View
          style={[
            styles.sectionContainer,
            styles.shadowProp,
            styles.lastSection,
          ]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleContainer.sectionTitle}>
              Confirmación
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.text, marginBottom: 4 }}>
              Observaciones
            </Text>
            <TextInput
              autoCorrect={false}
              style={{
                ...styles.input,
                paddingLeft: 12,
                fontSize: 12.5,
                justifyContent: 'center',
                textAlignVertical: 'center',
                fontWeight: 'bold',
              }}
              multiline={true}
              placeholder="Ingrese observaciones"
              onChangeText={onChangeCancelationReason}
            />
          </View>

          <View>
            <Text style={{ ...styles.text, marginBottom: 4 }}>
              Fecha y hora de visita
            </Text>
            <Button
              titleStyle={{
                color: 'black',
                width: '100%',
                alignItems: 'flex-start',
                textAlign: 'left',
                fontSize: 12.5,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                padding: 0,
                margin: 0,
              }}
              containerStyle={styles.input}
              title={dayjs.utc(date).format('DD/MM/YYYY HH:mm')}
              onPress={() => setOpen(true)}
            />
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            titleStyle={styles.titleButton}
            buttonStyle={styles.confirmButton}
            title="Guardar Información"
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
    marginVertical: 20,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
  },
  buttonsContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleButton: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  cancelButton: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    height: 32,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    height: 32,
    width: '100%'
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
