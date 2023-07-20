import {User} from '../Model/AuthModel';
import {AuthRepository} from '../Repository/AuthRepository';

export async function login(
  username: string,
  password: string,
  authRepository: AuthRepository,
): Promise<User> {
  return authRepository.auth(username, password);
}
