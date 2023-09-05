import {
  Body,
  Controller,
  Post,
  UseFilters,
  ExceptionFilter,
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
  constructor(private _service: AuthService) {}

  @Post('register/email')
  registerUserWithEmail(
    @Body() registerUserWithEmailDto: RegisterUserWithEmailDto,
  ) {
    return this._service.registerUserWithEmail(registerUserWithEmailDto);
  }

  @Post('register/phone')
  registerUserWithPhone(
    @Body() registerUserWithPhone: RegisterUserWithPhoneDto,
  ) {
    return this._service.registerUserWithPhone(registerUserWithPhone);
  }

  @Post('login/email')
  loginUserWithEmail(@Body() loginUserWithEmailDto: LoginUserWithEmailDto) {
    return this._service.loginUserWithEmail(loginUserWithEmailDto);
  }

  @Post('login/phone')
  loginUserWithPhone(@Body() loginUserWithPhoneDto: LoginUserWithPhoneDto) {
    return this._service.loginUserWithPhone(loginUserWithPhoneDto);
  }

  @Post('login/confirm/email')
  confirmLoginUserWithEmail(
    @Body() confirmLoginUserWithEmailDto: ConfirmLoginUserWithEmailDto,
  ) {
    return this._service.confirmLoginUserWithEmail(
      confirmLoginUserWithEmailDto,
    );
  }
}
