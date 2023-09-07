import React, { memo } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

import { Button, Chip, Icon, makeStyles } from '@rneui/themed';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';

const { width } = Dimensions.get('window');

const OUTER_CARD_HEIGHT = 230;
const OUTER_CARD_WIDTH = width;

const INNER_CARD_HEIGHT = 220;
const INNER_CARD_WIDTH = width * 0.8;

type SelectedOrderCardComponentOptions = {
  serviceOrder: ServiceOrderItem;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

const SelectedOrderCardComponent = ({
  serviceOrder,
  onCancel,
  onConfirm,
  onClose,
}: SelectedOrderCardComponentOptions) => {
  const styles = useStyles();
  const { number, description, status, destination, type } = serviceOrder;
  const { name: statusDescription } = status;
  const { address } = destination;
  const { description: addressDescription } = address;

  const { description: serviceType } = type;
  return (
    <View style={styles.outerCard}>
      <View style={styles.innerCard}>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text numberOfLines={1} style={styles.name}>
              {`Orden de Servicio #${number}`}
            </Text>
            <Pressable onPress={onClose}>
              <Icon name="close" type="antdesign" size={15} />
            </Pressable>
          </View>
          <View style={styles.bottom}>
            <View>
              <Chip
                title={statusDescription}
                icon={{
                  name: 'clockcircle',
                  type: 'antdesign',
                  size: 15,
                  color: 'white',
                }}
                iconRight
                titleStyle={styles.titleStyle}
                buttonStyle={{
                  ...styles.buttonStyle,
                  backgroundColor: '#e7cf3d',
                }}
                containerStyle={styles.containerStyle}
              />
            </View>
            {/* <Text numberOfLines={2} style={styles.text}>
              Solicitante:{' '}
              <Text style={styles.black}>{`${firstName} ${lastName}`}</Text>
            </Text> */}
            <Text numberOfLines={2} style={styles.text}>
              Tipo de Servicio: <Text style={styles.black}>{serviceType}</Text>
            </Text>

            {/* <Text style={styles.text} numberOfLines={1}>
              Teléfono: <Text style={styles.black}>{phone}</Text>
            </Text>*/}
            <Text style={styles.text} numberOfLines={2}>
              Dirección: <Text style={styles.black}>{addressDescription}</Text>
            </Text>
            <Text numberOfLines={4} style={styles.text}>
              Descripción: <Text style={styles.black}>{description}</Text>
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                titleStyle={styles.titleButton}
                buttonStyle={styles.confirmButton}
                title="Adjuntar Información"
                onPress={() => onConfirm()}></Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  outerCard: {
    flex: 1,
    height: OUTER_CARD_HEIGHT,
    width: OUTER_CARD_WIDTH,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  innerCard: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: -2 },
    height: INNER_CARD_HEIGHT,
    width: INNER_CARD_WIDTH,
    overflow: 'hidden',
    elevation: 6,
    padding: 10,
  },
  right: { flex: 1, paddingLeft: 10, alignItems: 'flex-start' },
  top: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  name: { fontSize: 16.5 },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  titleStyle: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonStyle: {
    borderRadius: 16,
    height: 32,
  },
  containerStyle: {
    marginTop: 2,
  },
  text: {
    fontSize: 11,
    marginVertical: 1,
    color: 'grey',
  },
  black: { color: 'black', textAlign: 'right' },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titleButton: {
    fontSize: 12.5,
    fontWeight: 'bold',
  },
  cancelTitleButton: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  cancelButton: {
    backgroundColor: theme.colors.background,
    color: theme.colors.primary,
    borderRadius: 16,
    //height: 32,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
   // height: 32,
  },
}));

export default memo(SelectedOrderCardComponent);
