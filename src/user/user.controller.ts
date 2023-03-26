import { UserDto } from './user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.userService.save(userDto);
  }

  @Put(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<{ result: string }> {
    return this.userService.update(id, userDto);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<{ result: string }> {
    return this.userService.delete(id);
  }
}
