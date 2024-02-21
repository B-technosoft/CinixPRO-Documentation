import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReceptionistService } from './receptionist.service';
import { LoginDto } from 'src/users/dtos/login.dto';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Public } from 'src/users/decorators/public.decorator';

@Controller('receptionist')
@UseGuards(RolesGuard)
export class ReceptionistController {
  constructor(private readonly receptionistService: ReceptionistService) {}

  @Post('/login')
  @Public()
  async loginReceptionists(@Body() loginbody: LoginDto) {
    return await this.receptionistService.loginReceptionists(loginbody);
  }
}
