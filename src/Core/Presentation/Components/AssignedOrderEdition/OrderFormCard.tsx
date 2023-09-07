import { Button } from '@rneui/base';
import { Card, CheckBox, makeStyles } from '@rneui/themed';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { ServiceOrderDetail } from '../../../Domain/Model/ServiceOrderDetailModel';
import { OrderAttachmentItemComponent } from './OrderAttachmentItemComponent';

export type OrderFormCardComponentProps = {
  serviceOrder: ServiceOrderDetail;
};

export function OrderFormCardComponent({
  serviceOrder,
}: OrderFormCardComponentProps) {
  const [finish, setFinish] = useState(false);
  const styles = useStyles();

  const [cancelationReason, onChangeCancelationReason] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState('');

  const data = [
    { key: '1', value: 'Cliente fuera de domicilio' },
    { key: '2', value: 'Otros' },
  ];
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleContainer.sectionTitle}>
            Datos a completar
          </Text>
        </View>
      </View>

      <CheckBox
        containerStyle={{
          backgroundColor: 'white',
          margin: 0,
          padding: 0,
          alignSelf: 'flex-start',
        }}
        textStyle={{ ...styles.text, marginLeft: 0, paddingLeft: 0 }}
        checked={finish}
        onPress={() => setFinish(!finish)}
        title="Finalizar"
        iconRight={true}
      />

      <View>
        <Text style={{ ...styles.text, marginBottom: 4 }}>Motivos</Text>
        <SelectList
          inputStyles={{
            ...styles.black,
            textAlign: 'left',
            alignSelf: 'flex-start',
          }}
          dropdownStyles={{ borderColor: '#E5E5E5' }}
          dropdownTextStyles={styles.text}
          boxStyles={styles.select}
          setSelected={(val: any) => setSelected(val)}
          data={data}
          save="value"
          placeholder="Seleccionar motivo"
          searchPlaceholder=""
        />
      </View>

      <View>
        <Text style={{ ...styles.text, marginBottom: 4 }}>Observaciones</Text>
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
          Fecha y hora de actualización
        </Text>
        <Button
          titleStyle={{
            width: '100%',
            alignItems: 'flex-start',
            textAlign: 'left',
            ...styles.black,
          }}
          buttonStyle={{
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            padding: 0,
            margin: 0,
          }}
          containerStyle={styles.input}
          title={dayjs.utc(date).format('DD/MM/YYYY')}
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

      <OrderAttachmentItemComponent></OrderAttachmentItemComponent>
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
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
  },
  sectionTitleContainer: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    sectionTitle: { fontSize: 16.5 },
    width: '100%',
  },
  text: { fontSize: 12.5, marginBottom: 2, fontWeight: 'normal' },
  black: { fontSize: 12.5, fontWeight: 'bold', color: '#828282' },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 4,
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  select: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    //marginBottom: 4,
    alignItems: 'center',
    // justifyContent: 'center',
  },
}));
