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
import { ReceptionistProfileService } from 'src/profiles/services/receptionist_profile/receptionist_profile.service';
import { CreateReceptionistSuperAdminDto } from 'src/receptionist/dto/create-receptionist-super_admin.dto';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('receptionists/profile')
@UseGuards(RolesGuard)
@Roles(Role.Receptionist)
export class ReceptionistProfileController {
  constructor(
    private readonly receptionistProfileService: ReceptionistProfileService,
  ) {}

  @Get('/')
  async getReceptionistProfile(@Request() req: any) {
    return await this.receptionistProfileService.getReceptionistProfile(
      req.user,
    );
  }

  @Patch('/update')
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
  async updateReceptionistProfile(
    @Request() req: any,
    @Body() body: CreateReceptionistSuperAdminDto,
    @UploadedFile() profilePhoto: Express.Multer.File,
  ) {
    return await this.receptionistProfileService.updateReceptionistProfile(
      req.user,
      body,
      profilePhoto,
    );
  }
}
