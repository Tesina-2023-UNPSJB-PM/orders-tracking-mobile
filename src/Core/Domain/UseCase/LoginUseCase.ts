import { UserProfile } from '../Model/AuthModel';
import { AuthRepository } from '../Repository/AuthRepository';

export async function login(
  username: string,
  password: string,
  authRepository: AuthRepository,
): Promise<UserProfile> {
  return authRepository
    .auth(username, password)
    .then(({ userProfile }) => userProfile);
}
