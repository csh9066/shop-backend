import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Vertificiation } from './vertification.entity';

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    private usersService: UsersService,
    @InjectRepository(Vertificiation)
    private vertificationRepository: Repository<Vertificiation>,
  ) {}

  async join(createUserDto: CreateUserDto) {
    const exisitEmail = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (exisitEmail) {
      throw new ConflictException('이미 존재하는 이메일 입니다.');
    }

    const exisitNickname = await this.usersService.findByNickanme(
      createUserDto.nickname,
    );
    if (exisitNickname) {
      throw new ConflictException('이미 존재하는 닉네임 입니다.');
    }

    const newUser = await this.usersService.create(createUserDto);
    const vertification = await this.vertificationRepository.create({
      user: newUser,
    });
    await this.vertificationRepository.save(vertification);

    await this.mailerService.sendMail({
      to: newUser.email,
      subject: '이메일 인증',
      html: `<a href="localhost:3005/auth/join/vertificaition/${vertification.token}">인증 하기</a>`,
    });
  }

  async vertifyEmail(token: string) {
    const verification = await this.vertificationRepository.findOne(
      { token },
      { relations: ['user'] },
    );
    if (!verification) {
      throw new NotFoundException('인증 토큰이 존재하지 않습니다.');
    }

    await this.usersService.updateById(verification.user.id, {
      verified: true,
    });

    await this.vertificationRepository.delete({
      token: verification.token,
    });
  }
}
