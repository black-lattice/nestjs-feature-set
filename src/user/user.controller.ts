import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfoResponse } from './dto/user-info.vo';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { TokenResponse } from './vo/token.vo';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // 注册
  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: '注册', type: UserInfoResponse })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserInfoResponse> {
    return this.userService.register(registerDTO);
  }

  // 登陆
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: '登陆', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Res() res: any): Promise<any> {
    const token = this.userService.login(loginDTO);
    return res.set({ 'set-Cookie': token });
  }
}
