import { Injectable } from '@nestjs/common';
import { CreateAvailableDayDto } from './dto/create-available_day.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailableDay } from './entities/available_day.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctors/entitys/doctor.entity';

@Injectable()
export class AvailableDayService {
  constructor(
    @InjectRepository(AvailableDay)
    private readonly availableDayRepository: Repository<AvailableDay>,
  ) {}

  async createAvailableDay(createAvailableDayDto: CreateAvailableDayDto) {
    const availableDay = await this.availableDayRepository.create(
      createAvailableDayDto,
    );

    return await this.availableDayRepository.save(availableDay);
  }

  async updateAvailableDay(
    id: number,
    updateData: {
      day: string;
      doctor: Doctor;
    },
  ) {
    const data = await this.availableDayRepository.findOneByOrFail({
      id,
    });

    Object.assign(data, updateData);

    return await this.availableDayRepository.save(data);
  }

  async removesAvailableDay(ids: number[]) {
    return await this.availableDayRepository.delete(ids);
  }
}
