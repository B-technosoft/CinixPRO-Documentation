import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/users/decorators/public.decorator';
import { PublicService } from './public.service';

@Controller('public')
@Public()
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('/gender')
  async getGender() {
    console.log({
      result: await this.publicService.getGender(),
    });

    return {
      result: await this.publicService.getGender(),
    };
  }

  @Get('/diet')
  async getDiet() {
    return {
      result: await this.publicService.getDiet(),
    };
  }

  @Get('/blood-group')
  async getBloodGroup() {
    return {
      result: await this.publicService.getBloodGroup(),
    };
  }

  @Get('/available-day')
  async getAvailableDay() {
    return {
      result: await this.publicService.getAvailableDay(),
    };
  }

  @Get('/payment-status')
  async getPaymentStatus() {
    return {
      result: await this.publicService.getPaymentStatus(),
    };
  }

  @Get('/payment-mode')
  async getPaymentMode() {
    return {
      result: await this.publicService.getPaymentMode(),
    };
  }

  @Get('/time-slot')
  async getTimeSlot() {
    return {
      result: await this.publicService.getTimeSlot(),
    };
  }
}
