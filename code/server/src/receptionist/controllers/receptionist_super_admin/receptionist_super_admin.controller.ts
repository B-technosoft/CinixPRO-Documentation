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
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CountsReceptionistService } from 'src/counts/services/counts_receptionist/counts_receptionist.service';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { CreateReceptionistSuperAdminDto } from 'src/receptionist/dto/create-receptionist-super_admin.dto';
import { CreateReceptionistDto } from 'src/receptionist/dto/create-receptionist.dto';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { ReceptionistSuperAdminService } from 'src/receptionist/services/receptionist_super_admin/receptionist_super_admin.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('super-admin/receptionist')
@UseGuards(RolesGuard)
@Roles(Role.SuperAdmin)
export class ReceptionistSuperAdminController {
  constructor(
    private readonly receptionistSuperAdminService: ReceptionistSuperAdminService,
    private readonly receptionistService: ReceptionistService,
    private readonly countsReceptionistService: CountsReceptionistService,
  ) {}

  @Post('/register')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      storage: diskStorage({
        destination: 'media/receptionist',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async registerReceptionist(
    @UploadedFile() profilePhoto: Express.Multer.File,
    @Body() createReceptionistDto: CreateReceptionistDto,
  ) {
    return await this.receptionistService.registerReceptionist(
      profilePhoto,
      createReceptionistDto,
    );
  }

  @Get('/list')
  async fetchAllReceptionisSuperAdmin(@Query() search: SearchQueryDto) {
    return await this.receptionistSuperAdminService.fetchAllReceptionisSuperAdmin(
      search,
    );
  }

  @Get('/:id')
  async fetchReceptionistForSuperAdmin(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.receptionistSuperAdminService.fetchReceptionistForSuperAdmin(
      patientId,
    );
  }

  @Put('/update/:id')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      storage: diskStorage({
        destination: 'media/receptionist',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async updateReceptionistForSuperAdmin(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
    @Body() body: CreateReceptionistSuperAdminDto,
    @UploadedFile() profilePhoto: Express.Multer.File,
  ) {
    return await this.receptionistSuperAdminService.updateReceptionistForSuperAdmin(
      patientId,
      body,
      profilePhoto,
    );
  }

  @Delete('/delete/:id')
  async deleteReceptionistForSuperAdmin(
    @Request() req: any,
    @Param('id', ParseIntPipe)
    patientId: number,
  ) {
    return await this.receptionistSuperAdminService.deleteReceptionistForSuperAdmin(
      patientId,
    );
  }

  @Get('/count/:id')
  async getCountReceptionsById(@Param('id', ParseIntPipe) id: number) {
    const receptionis = await this.receptionistService.findReceptionistById(id);

    return await this.countsReceptionistService.countTotalAppointment(
      receptionis as any,
    );
  }

  @Get('/appointment-list/:id')
  async getAllAppointmentListDoctorById(@Param('id', ParseIntPipe) id: number) {
    return await this.receptionistSuperAdminService.getAllAppointmentListDoctorById();
  }
}
