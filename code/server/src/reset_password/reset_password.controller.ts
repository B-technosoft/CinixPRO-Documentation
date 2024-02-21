import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';
import { ResetPasswordDto } from './dtos/reset_password.dto';
import { Public } from 'src/users/decorators/public.decorator';

@Controller('reset-password')
@Public()
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('/')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.resetPasswordService.resetPassword(body);
  }
}
