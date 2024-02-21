import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CountsSuperAdminService } from 'src/counts/services/counts_super_admin/counts_super_admin.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('super-admin/counts')
@UseGuards(RolesGuard)
@Roles(Role.SuperAdmin)
export class CountsSuperAdminController {
  constructor(
    private readonly countsSuperAdminService: CountsSuperAdminService,
  ) {}

  @Get('/')
  async countForSuperAdmin(@Query('query') query: string) {
    return await this.countsSuperAdminService.countForSuperAdmin(query);
  }
}
