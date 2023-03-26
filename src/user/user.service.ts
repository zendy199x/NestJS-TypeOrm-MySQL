import { UserDto } from './user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async save(userDto: UserDto): Promise<UserDto> {
    const saveUser = await this.userRepository.save(userDto);
    return plainToInstance(UserDto, saveUser, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, userDto: UserDto): Promise<{ result: string }> {
    await this.userRepository.update(id, userDto);

    return {
      result: 'success',
    };
  }

  async findOne(id: string): Promise<UserDto> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return plainToInstance(UserDto, foundUser, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: string): Promise<{ result: string }> {
    await this.userRepository.softDelete(id);
    return {
      result: 'success',
    };
  }
}
