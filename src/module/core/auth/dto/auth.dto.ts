import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';
import {
  ManagerExistConstraint,
  ManagerNotExistConstraint,
  UserExistConstraint,
  UserNotExistConstraint,
} from '../constraints/auth.constraints';
import { AUTH_ERROR } from '../error/message.error';

export class ManagerLoginDto {
  @ApiProperty({
    description: 'Phone number',
    example: '0964816xxx',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  @Validate(ManagerExistConstraint, { message: AUTH_ERROR[8] })
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

export class UserLoginDto {
  @ApiProperty({
    description: 'Phone number',
    example: '0964816xxx',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  @Validate(UserExistConstraint, { message: AUTH_ERROR[8] })
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

export class RegisterManagerDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@just.engineer.com',
  })
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(ManagerNotExistConstraint, { message: AUTH_ERROR[6] })
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
  @Validate(ManagerNotExistConstraint, { message: AUTH_ERROR[7] })
  phone: string;
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
  @Validate(UserNotExistConstraint, { message: AUTH_ERROR[6] })
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
  @Validate(UserNotExistConstraint, { message: AUTH_ERROR[7] })
  phone: string;
}
