import { Injectable } from '@nestjs/common';
import { SuperAdminsService } from 'src/super_admins/services/super_admins/super_admins.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';

@Injectable()
export class SuperAdminProfileService {
  constructor(private readonly superAdminsService: SuperAdminsService) {}

  async getSuperAdminProfile(user: PayloadInterface) {
    return await this.superAdminsService.getSuperAdminById(user.id);
  }
}
