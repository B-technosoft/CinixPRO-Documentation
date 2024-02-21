import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CountsDoctorService } from 'src/counts/services/counts_doctor/counts_doctor.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('doctor/counts')
@UseGuards(RolesGuard)
@Roles(Role.Doctor)
export class CountsDoctorController {
  constructor(private readonly countsDoctorService: CountsDoctorService) {}

  @Get('/')
  async countForDoctor(@Request() req: any) {
    return await this.countsDoctorService.countForDoctor(req.user);
  }
}
