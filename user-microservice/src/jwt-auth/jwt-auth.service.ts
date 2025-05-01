import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateToken(paylaod : any): Promise<string> {
        return this.jwtService.sign(paylaod, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '7d',
        });
    }

    async generateTokenAsync(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '7d',
        });
    }

}
