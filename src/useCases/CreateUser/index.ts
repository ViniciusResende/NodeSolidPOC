import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const postgresUsersRepositoryProvider = new PostgresUsersRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepositoryProvider,
  mailtrapMailProvider,
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
