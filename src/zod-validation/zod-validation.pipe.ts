import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ZodType } from 'zod/v4';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor (private readonly schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch(error) {
      throw new BadRequestException("Validation failed");
    }
  }
}
