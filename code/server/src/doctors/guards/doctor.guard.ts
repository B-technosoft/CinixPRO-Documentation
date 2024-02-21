import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { jwtConstants } from 'src/constants';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Role } from 'src/users/enums/role.enums';

@Injectable()
export class DoctorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<PayloadInterface>(
        token,
        {
          secret: jwtConstants.secret,
        },
      );

      const { role } = payload;

      if (role !== Role.Doctor) {
        return false;
      }

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
