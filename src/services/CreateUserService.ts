import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;

}
class UserRepository {
  public async execute({
    name,
    email,
    password,

  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmail = await usersRepository.findOne({
      where: { email },
    });
    if (checkEmail) {
      throw new Error('Opa, esse email já existe');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,

    });

    await usersRepository.save(user);

    return user;
  }
}

export default UserRepository;
