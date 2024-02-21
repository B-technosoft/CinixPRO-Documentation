import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PatientDoctorService } from 'src/doctors/services/patient_doctor/patient_doctor.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { PatientDoctorDto } from 'src/patients/dto/patient-doctor.dto';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { SerializeInterceptor } from 'src/users/interceptors/serialize.interceptor';

@Controller('patient/doctor')
@UseGuards(RolesGuard)
@Roles(Role.Patient)
export class PatientDoctorController {
  constructor(private readonly patientDoctorService: PatientDoctorService) {}

  @Get('/list')
  @UseInterceptors(new SerializeInterceptor(PatientDoctorDto))
  async fetchAllDoctorForPatient(
    @Request() req: any,
    @Query() search: SearchQueryDto,
  ) {
    return await this.patientDoctorService.fetchAllDoctorForPatient(
      req.user,
      search,
    );
  }
}
