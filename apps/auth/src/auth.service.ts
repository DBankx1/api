import { SignUpType, User } from '@db/persistance';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  LOGIN_EMAIL_MESSAGE,
  LOGIN_PHONE_MESSAGE,
} from '@outler/common/messages';
import { StytchService } from '@outler/stytch';
import {
  RegisterUserWithEmailDto,
  RegisterUserWithPhoneDto,
  LoginUserWithEmailDto,
  LoginUserWithPhoneDto,
  ConfirmLoginUserWithEmailDto,
} from '@outler/common';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private _stytchService: StytchService;
  constructor(@InjectModel(User.name) private _userDbService: Model<User>) {
    this._stytchService = new StytchService(
      process.env.STYTCH_PROJECT_ID,
      process.env.STYTCH_SECRET,
    );
  }

  async handleRegisterUserWithEmail(data: RegisterUserWithEmailDto) {
    try {
      // check if user exists
      var existingUser = await this._userDbService.findOne({
        email: data.email,
      });

      if (existingUser) {
        throw new BadRequestException(
          `User with email ${data.email} already exists`,
        );
      }

      var response = await this._stytchService.loginOrRegisterUserWithEmail(
        data.email,
      );

      var createdUser = new this._userDbService({
        stytchUserId: response.user_id,
        signUpType: SignUpType.Email,
        isEmailVerified: true,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await createdUser.save();

      return createdUser.toJSON();
    } catch (error) {
      Logger.error('Error occurred registering user with email', error);
      throw error;
    }
  }

  async handleRegisterUserWithPhone(data: RegisterUserWithPhoneDto) {
    try {
      // check if user with phone exists
      var existingUser = await this._userDbService.findOne({
        phone: data.phone,
      });

      if (existingUser) {
        throw new BadRequestException(
          `User with phone number ${data.phone} already exists`,
        );
      }

      var response = await this._stytchService.loginOrRegisterUserWithPhone(
        data.phone,
      );

      var createdUser = new this._userDbService({
        stytchUserId: response.user_id,
        signUpType: SignUpType.Phone,
        isEmailVerified: false,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await createdUser.save();

      return createdUser.toJSON();
    } catch (error) {
      Logger.error('Error occurred registering user with phone', error);
      throw error;
    }
  }

  async handleLoginUserWithEmail(data: LoginUserWithEmailDto) {
    try {
      await this._stytchService.loginOrRegisterUserWithEmail(data.email);
      return LOGIN_EMAIL_MESSAGE;
    } catch (error) {
      Logger.error('Error occurred logging in user with email', error);
      throw error;
    }
  }

  async handleLoginUserWithPhone(data: LoginUserWithPhoneDto) {
    try {
      await this._stytchService.loginOrRegisterUserWithPhone(data.phone);
      return LOGIN_PHONE_MESSAGE;
    } catch (error) {
      Logger.error('Error occurred logging in user with email', error);
      throw error;
    }
  }

  async handleConfirmLoginUserWithEmail(data: ConfirmLoginUserWithEmailDto) {
    try {
      var response = await this._stytchService.confirmLoginUserWithEmail(
        data.token,
      );
      return response;
    } catch (error) {
      Logger.error('Error occurred confirming log in user with email', error);
      throw error;
    }
  }
}
