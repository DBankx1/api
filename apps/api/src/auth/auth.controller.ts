import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterUserWithEmailDto,
  RegisterUserWithPhoneDto,
  LoginUserWithEmailDto,
  LoginUserWithPhoneDto,
  ConfirmLoginUserWithEmailDto,
} from '@outler/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly _service: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register/email')
  async registerUserWithEmail(
    @Body() registerUserWithEmailDto: RegisterUserWithEmailDto,
  ) {
    return await this._service.registerUserWithEmail(registerUserWithEmailDto);
  }

  @Post('register/phone')
  async registerUserWithPhone(
    @Body() registerUserWithPhone: RegisterUserWithPhoneDto,
  ) {
    return await this._service.registerUserWithPhone(registerUserWithPhone);
  }

  @Post('login/email')
  async loginUserWithEmail(
    @Body() loginUserWithEmailDto: LoginUserWithEmailDto,
  ) {
    return await this._service.loginUserWithEmail(loginUserWithEmailDto);
  }

  @Post('login/phone')
  async loginUserWithPhone(
    @Body() loginUserWithPhoneDto: LoginUserWithPhoneDto,
  ) {
    return await this._service.loginUserWithPhone(loginUserWithPhoneDto);
  }

  @Post('login/confirm/email')
  async confirmLoginUserWithEmail(
    @Body() confirmLoginUserWithEmailDto: ConfirmLoginUserWithEmailDto,
  ) {
    return await this._service.confirmLoginUserWithEmail(
      confirmLoginUserWithEmailDto,
    );
  }
}
