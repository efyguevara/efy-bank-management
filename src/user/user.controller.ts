import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): string {
    return this.userService.getAllUsers();
  }
  @Post('create-user')
  create(): string {
    return this.userService.create();
  }
  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }
  @Put('edit-user/:userId')
  edit(@Param('userId') userId: string): string {
    return this.userService.edit(userId);
  }
  @Delete('delete/:userId')
  delete(@Param('userId') userId: string): string {
    return this.userService.delete(userId);
  }
}
