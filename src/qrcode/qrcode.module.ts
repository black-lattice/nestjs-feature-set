import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [UserModule],
  controllers: [QrcodeController],
  providers: [QrcodeService],
})
export class QrcodeModule {}
