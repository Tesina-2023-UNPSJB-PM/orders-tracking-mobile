import { Button } from '@rneui/themed';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { useAuthModelController } from '../Hook/useAuthModelController';

type LogoutButtonComponentProps = {
  navigation: any;
  authRepository: AuthRepository;
};

export function LogoutButtonComponent({
  navigation,
  authRepository,
}: LogoutButtonComponentProps) {
  const {logout} = useAuthModelController(authRepository);
  return <Button title="Logout" onPress={() => logout(navigation)} />;
}
