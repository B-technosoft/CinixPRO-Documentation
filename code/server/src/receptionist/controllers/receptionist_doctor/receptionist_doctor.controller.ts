import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { ReceptionistDoctorService } from 'src/receptionist/services/receptionist_doctor/receptionist_doctor.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('doctor/receptionist')
@UseGuards(RolesGuard)
@Roles(Role.Doctor)
export class ReceptionistDoctorController {
  constructor(
    private readonly receptionistDoctorService: ReceptionistDoctorService,
  ) {}

  @Get('/list')
  async fetchAllReceptionisDoctor(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.receptionistDoctorService.fetchAllReceptionisDoctor(
      req.user,
      search,
    );
  }

  @Get('/:id')
  async fetchReceptionistForDoctor(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.receptionistDoctorService.fetchReceptionistForDoctor(
      req.user,
      patientId,
    );
  }
}
