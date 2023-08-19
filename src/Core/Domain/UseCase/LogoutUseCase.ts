import { AuthRepository } from '../Repository/AuthRepository';

export async function logout(authRepository: AuthRepository): Promise<void> {
  return authRepository.logout();
}
