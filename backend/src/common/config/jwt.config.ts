import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: 86400000,
  },
};

export const refreshTokenConfig: JwtSignOptions = {
  
    expiresIn: 86400000,
  }
