import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindAllFilterDto } from 'helper/find-all-filter.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { LocalAuthGuard } from 'auth/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() authenticateUser: AuthenticateUserDto,
  ): Promise<{ accessToken: string; email: string }> {
    return this.usersService.signIn(authenticateUser);
  }

  @Get()
  findAll(@Query() filterDto: FindAllFilterDto): Promise<User[]> {
    // TODO: add @GetUser() user: User
    return this.usersService.findAll(filterDto);
  }

  @Get('/profile')
  @UseGuards(LocalAuthGuard)
  getUserProfile(): Promise<{ message: string }> {
    return this.usersService.getUserProfile();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
