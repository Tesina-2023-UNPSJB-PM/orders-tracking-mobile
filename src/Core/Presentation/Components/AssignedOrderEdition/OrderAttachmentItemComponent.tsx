import { Button, Card, Icon, ListItem, makeStyles } from '@rneui/themed';
import { useState } from 'react';
import { Text, View } from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export function OrderAttachmentItemComponent({
  onChangeAttachment,
}: {
  onChangeAttachment: (attachments: string) => void;
}) {
  const styles = useStyles();

  const [selectedImage, setSelectedImage] = useState({
    uri: '',
    fileName: '',
    base64: '',
  });
  const [selectedPhoto, setSelectedPhoto] = useState({
    uri: '',
    fileName: '',
    base64: '',
  });

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri ?? '';
        const fileName = response.assets?.[0]?.fileName ?? '';
        const base64 = response.assets?.[0]?.base64 ?? '';
        setSelectedImage({ uri, fileName, base64 });
      }
    });
  };

  const handleCameraLaunch = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri ?? '';
        const fileName = response.assets?.[0]?.fileName ?? '';
        const base64 = response.assets?.[0]?.base64 ?? '';
        setSelectedPhoto({ uri, fileName, base64 });
        onChangeAttachment(base64);
      }
    });
  };
  return (
    <View>
      {/* <View>
        <Text style={{ ...styles.text, marginBottom: 4 }}>Archivos</Text>
        <Button
          titleStyle={{
            alignItems: 'flex-start',
            textAlign: 'left',
            width: '90%',
            ...styles.black,
          }}
          buttonStyle={{
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            padding: 0,
            margin: 0,
          }}
          containerStyle={styles.input}
          iconRight={true}
          icon={{
            name: 'filetext1',
            type: 'antdesign',
            size: 15,
            color: '#828282',
          }}
          onPress={openImagePicker}>
          Seleccionar Archivo
        </Button>
      </View> */}

      {selectedImage.fileName.length > 0 && (
        <ListItem
          containerStyle={{
            backgroundColor: 'white',
            borderBottomColor: '#E5E5E5',
            borderBottomWidth: 1,
          }}>
          <ListItem.Content>
            <ListItem.Title style={{ ...styles.text }}>
              {selectedImage.fileName ?? '-'}
            </ListItem.Title>
          </ListItem.Content>
          <Icon name="filetext1" size={15} type="antdesign" color="grey" />
        </ListItem>
      )}

      <View>
        <Text style={{ ...styles.text, marginBottom: 4 }}>Fotos</Text>
        <Button
          titleStyle={{
            alignItems: 'flex-start',
            textAlign: 'left',
            width: '90%',
            ...styles.black,
          }}
          buttonStyle={{
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            padding: 0,
            margin: 0,
          }}
          containerStyle={styles.input}
          iconRight={true}
          icon={{
            name: 'camera',
            type: 'antdesign',
            size: 15,
            color: '#828282',
          }}
          onPress={handleCameraLaunch}>
          Tomar foto
        </Button>

        {selectedPhoto.fileName.length > 0 && (
          <ListItem
            containerStyle={{
              backgroundColor: 'white',
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
            }}>
            <ListItem.Content>
              <ListItem.Title style={{ ...styles.text }}>
                Imagen #1
              </ListItem.Title>
            </ListItem.Content>
            <Icon name="picture" size={15} type="antdesign" color="grey" />
          </ListItem>
        )}
      </View>
    </View>
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
