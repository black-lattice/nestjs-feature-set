import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrLoginDTO } from './dto/qrlogin.dto';
import { UserService } from 'src/user/user.service';

@Controller('qrcode')
export class QrcodeController {
  constructor(
    private readonly qrcodeService: QrcodeService,
    private readonly userService: UserService,
  ) {}
  // 生成二维码
  @Get('generate')
  async generate(): Promise<any> {
    const url = 'http://192.168.5.54:3000/qrcode-login/qrcode-login.html';
    return await this.qrcodeService.generator(url);
  }

  // 查询二维码状态
  @Get('check')
  check(@Query('id') id: string, @Res() res: any) {
    const info = this.qrcodeService.getStatus(id);
    return res
      .set({ 'set-Cookie': info.userInfo?.token || '' })
      .json({ status: info.status });
  }

  // 扫描二维码
  @Get('scan')
  scan(@Query('id') id: string) {
    this.qrcodeService.setStatus(id, { status: 'scan-wait-confirm' });
    return this.qrcodeService.getStatus(id);
  }

  // 取消授权
  @Get('cancel')
  cancel(@Query('id') id: string) {
    this.qrcodeService.setStatus(id, { status: 'scan-cancel' });
    return this.qrcodeService.getStatus(id);
  }

  // 确认授权
  @Post('confirm')
  async confirm(@Body() body: QrLoginDTO): Promise<any> {
    const { id, ...userInfo } = body;
    const token = await this.userService.login(userInfo);
    if (!token) {
      throw new NotFoundException('用户不存在');
    }
    this.qrcodeService.setStatus(id, {
      status: 'scan-confirm',
      userInfo: { token },
    });
  }
}
