import { Body, Controller, Post } from '@nestjs/common';
import { ForgetPasswordDTO } from 'src/forgot_password/dto/forget_password-dto.dto';
import { ForgetPasswordService } from 'src/forgot_password/services/forget_password/forget_password.service';
import { Public } from 'src/users/decorators/public.decorator';

@Controller()
@Public()
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Post('/super-admins/forget-password')
  async superAdminForgetPassword(@Body() body: ForgetPasswordDTO) {
    return await this.forgetPasswordService.superAdminsServiceForgetPassword(
      body,
    );
  }

  @Post('/doctor/forget-password')
  async doctorForgetPassword(@Body() body: ForgetPasswordDTO) {
    return await this.forgetPasswordService.doctorForgetPassword(body);
  }

  @Post('/patient/forget-password')
  async patientForgetPassword(@Body() body: ForgetPasswordDTO) {
    return await this.forgetPasswordService.patientForgetPassword(body);
  }

  @Post('/receptionist/forget-password')
  async receptionistForgetPassword(@Body() body: ForgetPasswordDTO) {
    return await this.forgetPasswordService.receptionistForgetPassword(body);
  }
}
