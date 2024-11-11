import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  private excludePassword(user: User): Omit<User, 'password'> {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(this.excludePassword);
  }

  findById(id: string): Omit<User, 'password'> {
    const user = this.users.find((user: User) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return this.excludePassword(user);
  }

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return this.excludePassword(newUser);
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    const user = this.users.find((user: User) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Incorrect password');
    }
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return this.excludePassword(user);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user: User) => user.id === id);
    if (userIndex === -1) throw new NotFoundException('User not found');
    this.users.splice(userIndex, 1);
  }
}
