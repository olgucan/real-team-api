import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private readonly saltOrRounds = 10;
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      //return await this.userRepository.save(user);
      const savedUser = await this.userRepository.save(user);

      const { password, ...result } = savedUser;

      return result;
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
    }
  }
  async findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
