import { Injectable } from '@nestjs/common';
import { publicData } from 'src/utils/public';

@Injectable()
export class PublicService {
  async getGender(): Promise<string[]> {
    return publicData.genders;
  }

  async getDiet(): Promise<string[]> {
    return publicData.diets;
  }

  async getBloodGroup(): Promise<string[]> {
    return publicData.bloodGroups;
  }

  async getAvailableDay(): Promise<string[]> {
    return publicData.availableDay;
  }

  async getPaymentStatus(): Promise<string[]> {
    return publicData.paymentStatus;
  }

  async getPaymentMode(): Promise<string[]> {
    return publicData.paymentMode;
  }

  async getTimeSlot(): Promise<number[]> {
    return publicData.timeSlot;
  }
}
