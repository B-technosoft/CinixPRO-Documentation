import { Body, Controller, Post } from '@nestjs/common';
import { SuperAdminsService } from 'src/super_admins/services/super_admins/super_admins.service';
import { Public } from 'src/users/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from 'src/users/dtos/login.dto';

@Controller('super-admins')
export class SuperAdminsController {
  constructor(private readonly superAdminsService: SuperAdminsService) {}

  @Post('register')
  async registerSuperAdmins(@Body() body: CreateUserDto) {
    return await this.superAdminsService.registerSuperAdmin(body);
  }

  @Post('login')
  @Public()
  async loginSuperAdmin(@Body() body: LoginDto) {
    return await this.superAdminsService.loginSuperAdmin(body);
  }
}
