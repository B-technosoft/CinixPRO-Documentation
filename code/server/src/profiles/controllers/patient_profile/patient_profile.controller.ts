import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PatientProfileDto } from 'src/profiles/dto/patient-profile.dto';
import { UpdatePatientProfileDto } from 'src/profiles/dto/update-patient-profile.dto';
import { PatientProfileService } from 'src/profiles/services/patient_profile/patient_profile.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { SerializeInterceptor } from 'src/users/interceptors/serialize.interceptor';

@Controller('patients/profile')
@UseGuards(RolesGuard)
@Roles(Role.Patient)
export class PatientProfileController {
  constructor(private readonly patientProfileService: PatientProfileService) {}

  @Get('/')
  @UseInterceptors(new SerializeInterceptor(PatientProfileDto))
  async getPatientProfile(@Request() req: any) {
    return await this.patientProfileService.getPatientProfile(req.user);
  }

  @Patch('/update')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      storage: diskStorage({
        destination: 'media/patients',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async updatePatientProfile(
    @Request() req: any,
    @Body() body: UpdatePatientProfileDto,
    @UploadedFile() profilePhoto: Express.Multer.File,
  ) {
    return await this.patientProfileService.updatePatientProfile(
      req.user,
      body,
      profilePhoto,
    );
  }
}
