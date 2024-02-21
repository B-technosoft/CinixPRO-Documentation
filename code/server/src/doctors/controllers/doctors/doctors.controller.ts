import { Body, Controller, Post } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { Public } from 'src/users/decorators/public.decorator';
import { LoginDto } from 'src/users/dtos/login.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}

  @Public()
  @Post('/login')
  async loginSuperAdmin(@Body() body: LoginDto) {
    return await this.doctorService.loginDoctor(body);
  }
}
