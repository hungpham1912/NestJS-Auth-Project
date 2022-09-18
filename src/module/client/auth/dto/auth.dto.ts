import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Phone number',
    example: '0964816xxx',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterUserDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@just.engineer.com',
  })
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Full name',
    example: 'Donlar Tump',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Phone number',
    example: '0964816xxx',
  })
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;
}
