import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Source } from 'src/database/database.config';
import { Manager } from '../../managers/entities/manager.entity';
import { User } from '../../users/entities/user.entity';

@ValidatorConstraint({ async: true })
export class UserExistConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const check = await Source.connect()
      .getRepository(User)
      .findOne({
        where: { [validationArguments.property]: value },
      });
    if (!check) return false;
    return true;
  }
}

@ValidatorConstraint({ async: true })
export class UserNotExistConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const check = await Source.connect()
      .getRepository(User)
      .findOne({
        where: { [validationArguments.property]: value },
      });
    if (!check) return true;
    return false;
  }
}

@ValidatorConstraint({ async: true })
export class ManagerExistConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const check = await Source.connect()
      .getRepository(Manager)
      .findOne({
        where: { [validationArguments.property]: value },
      });
    if (!check) return false;
    return true;
  }
}

@ValidatorConstraint({ async: true })
export class ManagerNotExistConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const check = await Source.connect()
      .getRepository(Manager)
      .findOne({
        where: { [validationArguments.property]: value },
      });
    if (!check) return true;
    return false;
  }
}
