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
import { DoctorProfileService } from 'src/profiles/services/doctor_profile/doctor_profile.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { DoctorProfileDto } from '../../dto/doctor-profile.dto';
import { SerializeInterceptor } from '../../../users/interceptors/serialize.interceptor';
import { UpdateDoctorProfileDto } from 'src/profiles/dto/update-doctor-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('doctors/profile')
@UseGuards(RolesGuard)
@Roles(Role.Doctor)
export class DoctorProfileController {
  constructor(private readonly doctorProfileService: DoctorProfileService) {}

  @Get('/')
  @UseInterceptors(new SerializeInterceptor(DoctorProfileDto))
  async getDoctorProfile(@Request() req: any) {
    return await this.doctorProfileService.getDoctorProfile(req.user);
  }

  @Patch('/update')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      storage: diskStorage({
        destination: 'media/doctor',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async updateDoctorProfile(
    @Request() req: any,
    @Body() body: UpdateDoctorProfileDto,
    @UploadedFile() profilePhoto: Express.Multer.File,
  ) {
    return await this.doctorProfileService.updateDoctorProfile(
      req.user,
      body,
      profilePhoto,
    );
  }
}
