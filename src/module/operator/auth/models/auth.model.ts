import { ApiProperty } from '@nestjs/swagger';
import { Manager } from '../../../core/managers/entities/manager.entity';

export class ResponseAuthManager extends Manager {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmNDc5OGQ4LTI3NDMtNGY1MS04ZTgzLWU3NTc2M2Y2OWJjYyIsInN1YiI6ImFmNDc5OGQ4LTI3NDMtNGY1MS04ZTgzLWU3NTc2M2Y2OWJjYyIsImlhdCI6MTY2MzU1NDUyOH0.OGnKg4mwQgRynPTmZ3hNUOEdObNFWeEqJcqqSAjWvZk',
  })
  accessToken: string;
}
