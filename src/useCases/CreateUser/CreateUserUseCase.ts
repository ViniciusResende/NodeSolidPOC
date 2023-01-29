import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IMailProvider } from '../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../../entities/User';

export class CreateUserUseCase {
  private mailProvider: IMailProvider;
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository, mailProvider: IMailProvider) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = Boolean(
      await this.usersRepository.findByEmail(data.email),
    );

    if (userAlreadyExists) throw new Error('User already exists.');

    const newUser = new User(data);

    await this.usersRepository.save(newUser);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'App Team',
        email: 'team@app.com',
      },
      subject: 'Welcome abroad to our platform.',
      body: '<p>You are already able to login in our platform.</p>',
    });
  }
}
