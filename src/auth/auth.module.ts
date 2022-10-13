import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy';
import { UserService } from 'src/user/user.service';
import { UtilsService } from 'src/utils/utils.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt'}),
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: process.env.JWT_EXPIRE}
        }), 
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserService, UtilsService]
})
export class AuthModule {}
