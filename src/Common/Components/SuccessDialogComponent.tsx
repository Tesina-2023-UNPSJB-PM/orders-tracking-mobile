import { Dialog, Text } from '@rneui/themed';
import { Alert } from 'react-native';

export type SuccessDialogComponentProps = {
  title: string;
  description: string;
  doneButtonTitle: string;
  doneButtonHandler: Function;
};

export function SuccessDialogComponent({
  title,
  description,
  doneButtonTitle,
  doneButtonHandler,
}: SuccessDialogComponentProps) {
  return (
    <Dialog>
      {/* <Dialog.Loading /> */}
      <Dialog.Title title={title} />
      <Text>{description}</Text>
      <Dialog.Actions>
        <Dialog.Button
          title={doneButtonTitle}
          onPress={() => doneButtonHandler()}
        />
      </Dialog.Actions>
    </Dialog>
  );
}

export const createSuccessDialogAlert = (
  title: string,
  description: string,
  doneButton: { text: string; onPress: () => void },
) => {
  const { text, onPress } = doneButton;
  Alert.alert(title, description, [{ text: text, onPress: () => onPress() }]);
};
