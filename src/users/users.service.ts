import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindAllFilterDto } from 'helper/find-all-filter.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password, isAdmin } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = this.repository.create({
      email,
      name,
      password: hashedPassword,
      isAdmin: isAdmin === 'true' ? true : false,
    });

    await this.repository.save(user);

    return user;
  }

  async signIn(
    authenticateUser: AuthenticateUserDto,
  ): Promise<{ accessToken: string; email: string }> {
    const { email, password } = authenticateUser;

    const user = await this.repository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken, email: user.email };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async getUserProfile(): Promise<{ message: string }> {
    // TODO: add @GetUser() user: User
    return { message: 'success' };
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
    const { email, isAdmin, name, password } = updateUserDto;

    const user: User = await this.findOne(+id);

    if (email) {
      user.email = email;
    }

    if (isAdmin) {
      user.isAdmin = isAdmin === 'true';
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
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
