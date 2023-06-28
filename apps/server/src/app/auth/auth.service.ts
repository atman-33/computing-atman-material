import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '../users/models/user.model';

export interface TokenPayload {
    userId: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService) { }

    async login(user: User, response: Response) {
        const tokenPayload: TokenPayload = {
            userId: user._id,
        };

        const expires = new Date();
        // console.log(expires);
        expires.setSeconds(
            expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
        );
        // console.log(expires);

        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires
        });
    }

    logout(response: Response) {
        response.cookie('Autentication', '', {
            httpOnly: true,
            expires: new Date()
        });
    }
}
