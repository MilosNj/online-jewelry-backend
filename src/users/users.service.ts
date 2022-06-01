import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllFilterDto } from 'src/products/dto/find-all-filter.dto';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { date, dateTime, email, isAdmin, name, password } = createUserDto;

    const user: User = this.repository.create({
      date,
      dateTime,
      email,
      isAdmin,
      name,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async findAll(filterDto: FindAllFilterDto): Promise<User[]> {
    const { search } = filterDto;

    const query: SelectQueryBuilder<User> =
      this.repository.createQueryBuilder('user');

    if (search) {
      query.andWhere('LOWER(user._id) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const users: User[] = await query.getMany();

    return users;
  }

  async findOne(id: number): Promise<User> {
    const found: User = await this.repository.findOne(+id);

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { date, dateTime, email, isAdmin, name, password } = updateUserDto;

    const user: User = await this.findOne(+id);

    if (date) {
      user.date = date;
    }

    if (dateTime) {
      user.dateTime = dateTime;
    }

    if (email) {
      user.email = email;
    }

    if (isAdmin) {
      user.isAdmin = isAdmin;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = password;
    }

    await this.repository.save(user);

    return user;
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult = await this.repository.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with "${id}" not found`);
    }
  }
}
