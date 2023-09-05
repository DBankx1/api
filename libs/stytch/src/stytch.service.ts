import { Injectable } from '@nestjs/common';
import { Client } from 'stytch';
import { Logger } from '@nestjs/common';

@Injectable()
export class StytchService {
  private _client: Client;

  constructor(
    public readonly projectId: string,
    public readonly secret: string,
  ) {
    this._client = new Client({
      project_id: projectId,
      secret: secret,
    });
  }

  public async loginOrRegisterUserWithEmail(email: string) {
    try {
      var response = await this._client.magicLinks.email.loginOrCreate({
        email,
        signup_magic_link_url: process.env.APP_REGISTER_URL,
        login_magic_link_url: process.env.APP_LOGIN_URL,
        signup_expiration_minutes: 60,
        login_expiration_minutes: 5,
      });
      return response;
    } catch (error) {
      Logger.error(
        `Error occurred registering user with email ${email} to stytch`,
        error,
      );
      throw error;
    }
  }

  public async loginOrRegisterUserWithPhone(phone: string) {
    try {
      var response = await this._client.otps.sms.loginOrCreate({
        phone_number: phone,
        expiration_minutes: 10,
      });
      return response;
    } catch (error) {
      Logger.error(
        `Error occurred registering user with phone number ${phone} to stytch`,
        error,
      );
      throw error;
    }
  }

  public async confirmLoginUserWithEmail(token: string) {
    try {
      var response = await this._client.magicLinks.authenticate({
        token,
      });
      return response;
    } catch (error) {
      Logger.error(
        `Error occurred confirming user login with email to stytch`,
        error,
      );
      throw error;
    }
  }
}
