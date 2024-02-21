import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';
import { Degree } from './entities/degree.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DegreesService {
  constructor(
    @InjectRepository(Degree)
    private readonly degreeRepository: Repository<Degree>,
  ) {}

  async createDegree(createDegreeDto: CreateDegreeDto) {
    try {
      const degree = this.degreeRepository.create(createDegreeDto);

      return {
        message: 'Degree is created successfully',
        results: await this.degreeRepository.save(degree),
      };
    } catch (error) {
      throw new ConflictException(
        `Degree ${createDegreeDto.degreeName} is already exists`,
      );
    }
  }

  async findAllDegree() {
    return {
      message: 'Degrees',
      results: await this.degreeRepository.find(),
    };
  }

  async findOneDegree(id: number) {
    return {
      message: 'Degree',
      results: await this.findDegreeById(id),
    };
  }

  async updateDegree(id: number, updateDegreeDto: UpdateDegreeDto) {
    const result = await this.findDegreeById(id);

    Object.assign(result, updateDegreeDto);

    return {
      message: 'Specialization Update successfully',
      result: await this.degreeRepository.save(result),
    };
  }

  async removeDegree(id: number) {
    const result = await this.findDegreeById(id);

    const removeSpecialization = await this.degreeRepository.remove(result);

    return {
      message: 'Degree is deleted successfully',
      appointment: removeSpecialization,
    };
  }

  async findDegreeById(id: number) {
    try {
      return await this.degreeRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
