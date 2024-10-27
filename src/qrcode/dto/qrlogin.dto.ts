import { ApiProperty } from '@nestjs/swagger';
import { LoginDTO } from 'src/user/dto/login.dto';
export class QrLoginDTO extends LoginDTO {
  @ApiProperty({
    description: 'uuid',
  })
  id: string;
}
