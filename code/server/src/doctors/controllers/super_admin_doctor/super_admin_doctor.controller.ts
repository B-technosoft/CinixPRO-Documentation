import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateDoctorDto } from 'src/doctors/dto/create-doctor.dto';
import { UpdateDoctorSuperAdminDTO } from 'src/doctors/dto/update-doctor-super_admin.dto';
import { SuperAdminDoctorService } from 'src/doctors/services/super_admin_doctor/super_admin_doctor.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('super-admin/doctor')
@UseGuards(RolesGuard)
@Roles(Role.SuperAdmin)
export class SuperAdminDoctorController {
  constructor(
    private readonly superAdminDoctorService: SuperAdminDoctorService,
  ) {}

  @Post('/register')
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
  async registerDoctor(
    @UploadedFile() profilePhoto: Express.Multer.File,
    @Body() doctorDto: CreateDoctorDto,
  ) {
    return await this.superAdminDoctorService.registerDoctor(
      profilePhoto,
      doctorDto,
    );
  }

  @Get('/list')
  async fetchAllDoctotListForSuperAdmin(@Query() search: SearchQueryDto) {
    return await this.superAdminDoctorService.fetchAllDoctotListForSuperAdmin(
      search,
    );
  }

  @Put('/update/:id')
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
  async updateDoctorForSuperAdmin(
    @Param('id', ParseIntPipe) doctorId: number,
    @Body() body: UpdateDoctorSuperAdminDTO,
    @UploadedFile() profilePhoto: Express.Multer.File,
  ) {
    return await this.superAdminDoctorService.updateDoctorForSuperAdmin(
      doctorId,
      body,
      profilePhoto,
    );
  }

  @Delete('/delete/:id')
  async deleteDoctorForSuperAdmin(@Param('id', ParseIntPipe) doctorId: number) {
    return await this.superAdminDoctorService.deleteDoctorForSuperAdmin(
      doctorId,
    );
  }

  @Get('/:id')
  async getDoctorByIdForSuperAdmin(
    @Param('id', ParseIntPipe) doctorId: number,
  ) {
    return await this.superAdminDoctorService.getDoctorByIdForSuperAdmin(
      doctorId,
    );
  }
}
