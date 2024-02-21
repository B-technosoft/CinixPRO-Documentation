import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patients/entitys/patient.entity';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { UpdatePatientProfileDto } from 'src/profiles/dto/update-patient-profile.dto';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PatientProfileService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly patientsService: PatientsService,
  ) {}

  async getPatientProfile(user: PayloadInterface) {
    return await this.patientsService.getPatientById(user.id);
  }

  async updatePatientProfile(
    user: PayloadInterface,
    updatePatientProfileDto: UpdatePatientProfileDto,
    profilePhoto: Express.Multer.File,
  ) {
    try {
      if (profilePhoto) {
        console.log(profilePhoto);

        updatePatientProfileDto['profilePhoto'] = profilePhoto.originalname;
      }

      const result = await this.patientRepository
        .createQueryBuilder()
        .update(Patient)
        .set(updatePatientProfileDto)
        .where('id = :patientId', {
          patientId: user.id,
        })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException(`Patient with ID ${user.id} not found`);
      }

      return { result: 'Patient Profile Updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while updating patient',
      );
    }
  }
}
