import { User } from '@db/persistance';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  RegisterUserWithEmailDto,
  RegisterUserWithPhoneDto,
  LoginUserWithEmailDto,
  LoginUserWithPhoneDto,
  ConfirmLoginUserWithEmailDto,
} from '@outler/common';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('AUTH_SERVICE') private readonly _authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this._authClient.subscribeToResponseOf('email_register');
    this._authClient.subscribeToResponseOf('phone_register');
    this._authClient.subscribeToResponseOf('email_login');
    this._authClient.subscribeToResponseOf('phone_login');
    this._authClient.subscribeToResponseOf('confirm_email_login');
    await this._authClient.connect();
  }

  async onModuleDestroy() {
    await this._authClient.close();
  }

  registerUserWithEmail(
    registerUserWithEmailDto: RegisterUserWithEmailDto,
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      this._authClient
        .send('email_register', registerUserWithEmailDto)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  registerUserWithPhone(registerUserWithPhoneDto: RegisterUserWithPhoneDto) {
    return new Promise((resolve, reject) => {
      this._authClient
        .send('phone_register', registerUserWithPhoneDto)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  loginUserWithEmail(loginUserWithEmailDto: LoginUserWithEmailDto) {
    return new Promise((resolve, reject) => {
      this._authClient.send('email_login', loginUserWithEmailDto).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  loginUserWithPhone(loginUserWithPhoneDto: LoginUserWithPhoneDto) {
    return new Promise((resolve, reject) => {
      this._authClient.send('phone_login', loginUserWithPhoneDto).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  confirmLoginUserWithEmail(
    confirmLoginUserWithEmailDto: ConfirmLoginUserWithEmailDto,
  ) {
    return new Promise((resolve, reject) => {
      this._authClient
        .send('confirm_email_login', confirmLoginUserWithEmailDto)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }
}
