import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RegisterPatientDto } from 'src/patients/dto/register-patient.dto';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { Public } from 'src/users/decorators/public.decorator';

import { LoginDto } from 'src/users/dtos/login.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Public()
  @Post('register')
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
  async registerPatient(
    @UploadedFile() profilePhoto: Express.Multer.File,
    @Body() body: RegisterPatientDto,
  ) {
    return await this.patientsService.registerPatient(profilePhoto, body);
  }

  @Public()
  @Post('login')
  async loginPatient(@Body() body: LoginDto) {
    return await this.patientsService.loginPatient(body);
  }
}
