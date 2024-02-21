import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SuperAdminProfileDto } from 'src/profiles/dto/super_admin-profile.dto';
import { SuperAdminProfileService } from 'src/profiles/services/super_admin_profile/super_admin_profile.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { SerializeInterceptor } from 'src/users/interceptors/serialize.interceptor';

@Controller('super-admin/profile')
@UseGuards(RolesGuard)
@Roles(Role.SuperAdmin)
export class SuperAdminProfileController {
  constructor(
    private readonly superAdminProfileService: SuperAdminProfileService,
  ) {}

  @Get('/')
  @UseInterceptors(new SerializeInterceptor(SuperAdminProfileDto))
  async getSuperAdminProfile(@Request() req: any) {
    return await this.superAdminProfileService.getSuperAdminProfile(req.user);
  }
}
