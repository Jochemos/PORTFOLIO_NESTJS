import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export default class RegisterValidatorPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.validate(value);

    if (result.error) {
      const errorMessage = result.error.details.map((d) => d.message);
      throw new BadRequestException(errorMessage);
    }

    return value;
  }
}
