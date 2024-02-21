import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/entitys/user.entity';
import { Role } from 'src/users/enums/role.enums';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userReposotory: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto, role: Role) {
    const existingUser = await this.getUserByEmail(userDto.email);

    if (existingUser) {
      throw new ConflictException(
        `User are already existing with this email ${existingUser.email}`,
      );
    }

    const user = this.userReposotory.create(userDto);

    user.role = role;

    return await this.userReposotory.save(user);
  }

  async getUserByEmail(email: string) {
    return await this.userReposotory.findOneBy({ email: email });
  }
}
