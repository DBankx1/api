import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  RegisterUserWithEmailDto,
  RegisterUserWithPhoneDto,
  LoginUserWithEmailDto,
  LoginUserWithPhoneDto,
  ConfirmLoginUserWithEmailDto,
} from '@outler/common';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @MessagePattern('email_register')
  handleRegisterUserWithEmail(data: RegisterUserWithEmailDto) {
    return this._authService.handleRegisterUserWithEmail(data);
  }

  @MessagePattern('phone_register')
  handleRegisterUserWithPhone(data: RegisterUserWithPhoneDto) {
    return this._authService.handleRegisterUserWithPhone(data);
  }

  @MessagePattern('email_login')
  handleLoginUserWithEmail(data: LoginUserWithEmailDto) {
    return this._authService.handleLoginUserWithEmail(data);
  }

  @MessagePattern('phone_login')
  handleLoginUserWithPhone(data: LoginUserWithPhoneDto) {
    return this._authService.handleLoginUserWithPhone(data);
  }

  @MessagePattern('confirm_email_login')
  handleConfirmLoginUserWithEmail(data: ConfirmLoginUserWithEmailDto) {
    return this._authService.handleConfirmLoginUserWithEmail(data);
  }
}
