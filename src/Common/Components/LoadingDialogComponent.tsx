import { Dialog, Text } from '@rneui/themed';
import { Alert } from 'react-native';

export type LoadingDialogComponentProps = {
  title: string;
  description: string;
  isVisible: boolean;
};

export function LoadingDialogComponent({
  title,
  description,
  isVisible
}: LoadingDialogComponentProps) {
  return (
    <Dialog isVisible={isVisible}>
      <Dialog.Title title={title} />
      <Text>{description}</Text>
      <Dialog.Loading />
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
