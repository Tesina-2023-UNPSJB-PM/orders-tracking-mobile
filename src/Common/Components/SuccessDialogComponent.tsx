import { Dialog, Text } from '@rneui/themed';
import { Alert } from 'react-native';

export type SuccessDialogComponentProps = {
  title: string;
  description: string;
  doneButtonTitle: string;
  doneButtonHandler: Function;
  isLoading: boolean;
  isVisible: boolean;
};

export function SuccessDialogComponent({
  title,
  description,
  doneButtonTitle,
  doneButtonHandler,
  isLoading,
  isVisible
}: SuccessDialogComponentProps) {
  return (
    isLoading ? (
      <Dialog isVisible={isVisible}>
        <Dialog.Loading />
      </Dialog>
    ) : (
      <Dialog isVisible={isVisible}>
        <Dialog.Title title={title} />
        <Text>{description}</Text>
        <Dialog.Actions>
          <Dialog.Button
            title={doneButtonTitle}
            onPress={() => doneButtonHandler()}
          />
        </Dialog.Actions>
      </Dialog>
    )
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
