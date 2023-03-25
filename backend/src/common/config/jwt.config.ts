import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: 60,
  },
};

export const refreshTokenConfig: JwtSignOptions = {
  
    expiresIn: 3600 * 24,
  }
