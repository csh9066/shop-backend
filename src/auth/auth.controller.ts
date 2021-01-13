import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/join')
  async join(@Body() createUserDto: CreateUserDto) {
    await this.authService.join(createUserDto);
    return HttpStatus.CREATED;
  }

  @Get('/join/vertificaition/:token')
  async vertifyJoin(@Res() res: Response, @Param('token') token: string) {
    try {
      await this.authService.vertifyEmail(token);
      res.redirect('http://localhost:3000/hello');
    } catch (e) {
      res.redirect('http://localhost:3000/');
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}
