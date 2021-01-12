import { IsBoolean, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(8, 16)
  password?: string;

  @IsOptional()
  @Length(2, 16)
  nickname?: string;

  @IsOptional()
  introduction?: string;

  @IsOptional()
  profileImgUrl?: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}
