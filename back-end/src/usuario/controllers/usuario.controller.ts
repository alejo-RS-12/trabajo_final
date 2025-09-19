import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../usuario.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.usersService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.usersService.login(body.email, body.contrasena);
  }
}
