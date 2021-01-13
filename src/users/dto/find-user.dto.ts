import { IsEmail, Length } from 'class-validator';

export class FindUserDto {
  id?: string;

  @IsEmail()
  email?: string;

  @Length(8, 16)
  password?: string;

  @Length(2, 16)
  nickname?: string;
}
