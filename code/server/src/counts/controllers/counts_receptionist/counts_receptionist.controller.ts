import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CountsReceptionistService } from 'src/counts/services/counts_receptionist/counts_receptionist.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enums';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('receptionist/counts')
@UseGuards(RolesGuard)
@Roles(Role.Receptionist)
export class CountsReceptionistController {
  constructor(
    private readonly countsReceptionistService: CountsReceptionistService,
  ) {}

  @Get('/')
  async countForReceptionist(@Request() req: any) {
    return await this.countsReceptionistService.countForReceptionist(req.user);
  }
}
