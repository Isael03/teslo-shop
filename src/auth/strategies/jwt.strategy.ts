import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly configService: ConfigService
  ) {
    const secret = configService.get<string>('JWT_SECRET')!;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload:JwtPayload): Promise<User> {
    const {id} = payload;

    const user = await this.userRepository.findOneBy({ id });

    if(!user) throw new UnauthorizedException('Token not valid');

    if(!user.isActive) throw new UnauthorizedException('User is inactive');

    return user;
  }
}