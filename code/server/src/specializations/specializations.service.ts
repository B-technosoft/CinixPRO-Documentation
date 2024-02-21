import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialization } from './entities/specialization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
  ) {}

  async createSpecialization(createSpecializationDto: CreateSpecializationDto) {
    const existing = await this.findSpecializationByName(
      createSpecializationDto.specializationName,
    );

    if (existing) {
      throw new ConflictException(
        `specialization ${createSpecializationDto.specializationName} is already exists`,
      );
    }

    const specialization = this.specializationRepository.create(
      createSpecializationDto,
    );

    return {
      message: 'Specialization is created successfully',
      appointment: await this.specializationRepository.save(specialization),
    };
  }

  async getAllSpecializations() {
    return {
      message: 'Specialization',
      results: await this.specializationRepository.find(),
    };
  }

  async getSpecialization(id: number) {
    return {
      message: 'Specialization',
      results: await this.getSpecializationById(id),
    };
  }

  async updateSpecialization(
    id: number,
    updateSpecializationDto: UpdateSpecializationDto,
  ) {
    const result = await this.getSpecializationById(id);

    Object.assign(result, updateSpecializationDto);

    return {
      message: 'Specialization Update successfully',
      result: await this.specializationRepository.save(result),
    };
  }

  async removeSpecialization(id: number) {
    const result = await this.getSpecializationById(id);

    const removeSpecialization =
      await this.specializationRepository.remove(result);

    return {
      message: 'Specialization is deleted successfully',
      appointment: removeSpecialization,
    };
  }

  async getSpecializationById(id: number) {
    try {
      return await this.specializationRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findSpecializationByName(name: string) {
    return await this.specializationRepository.findOneBy({
      specializationName: name,
    });
  }
}
