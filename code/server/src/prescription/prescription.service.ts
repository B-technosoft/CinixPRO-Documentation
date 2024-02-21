import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { AppointmentsService } from 'src/appointments/services/appointments/appointments.service';
import { PrescriptionMedicineService } from 'src/prescription_medicine/prescription_medicine.service';
import { TestReportService } from 'src/test_report/test_report.service';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private readonly patientService: PatientsService,
    private readonly appointmentsService: AppointmentsService,
    private readonly prescriptionMedicineService: PrescriptionMedicineService,
    private readonly testReportService: TestReportService,
  ) {}

  async createPrescription() {}

  async findAllPrescriptions() {
    return await this.prescriptionRepository.find({
      relations: ['patient', 'appointment', 'testReport'],
    });
  }

  async findOnePrescription(id: number) {
    const result = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['patient', 'appointment', 'testReport'],
    });

    return await result;
  }

  async updatePrescription(
    id: number,
    updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    const result = await this.findPrescriptionById(id);

    Object.assign(result, updatePrescriptionDto);

    return {
      message: 'Prescription Update successfully',
      result: await this.prescriptionRepository.save(result),
    };
  }

  async removePrescription(id: number) {
    const result = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['patient', 'appointment'],
    });

    return {
      message: 'Prescription remove successfully',
      result: await this.prescriptionRepository.remove(result),
    };
  }

  async findPrescriptionById(id: number) {
    try {
      return await this.prescriptionRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findPrescriptionByIdRelations(id: number) {
    try {
      return await this.prescriptionRepository.findOneOrFail({
        where: { id },
        relations: {
          appointment: true,
          doctor: true,
          patient: true,
          prescriptionMedicine: true,
          testReport: true,
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
