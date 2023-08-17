import { Avatar } from '@rneui/base';
import { makeStyles } from '@rneui/themed';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { useAuthModelController } from '../Hook/useAuthModelController';

type CurrentUserAvatarComponentProps = {
  authRepository: AuthRepository;
};

export function CurrentUserAvatarComponent({
  authRepository,
}: CurrentUserAvatarComponentProps) {
  const styles = useStyles();
  const {getCurrentUser} = useAuthModelController(authRepository);
  const currentUser = getCurrentUser();
  const title = `${currentUser?.userProfile?.firstName[0] ?? ''}${
    currentUser?.userProfile?.lastName[0] ?? ''
  }`;
  return (
    <Avatar size={32} rounded title={title} containerStyle={styles.avatar} />
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.colors.primary,
  },
}));
