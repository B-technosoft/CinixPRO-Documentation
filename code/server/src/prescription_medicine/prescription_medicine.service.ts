import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionMedicineDto } from './dto/create-prescription_medicine.dto';
import { UpdatePrescriptionMedicineDto } from './dto/update-prescription_medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionMedicine } from './entities/prescription_medicine.entity';

@Injectable()
export class PrescriptionMedicineService {
  constructor(
    @InjectRepository(PrescriptionMedicine)
    private readonly prescriptionMedicineRepository: Repository<PrescriptionMedicine>,
  ) {}

  async createPrescriptionMedicine(
    createPrescriptionMedicineDto: CreatePrescriptionMedicineDto,
  ) {
    const prescriptionMedicine =
      await this.prescriptionMedicineRepository.create(
        createPrescriptionMedicineDto,
      );

    return await this.prescriptionMedicineRepository.save(prescriptionMedicine);
  }

  async findAllPrescriptionMedicines() {
    return await this.prescriptionMedicineRepository.find();
  }

  async findOnePrescriptionMedicine(id: number) {
    return this.findPrescriptionMedicationById(id);
  }

  async updatePrescriptionMedicine(
    id: number,
    updatePrescriptionMedicineDto: UpdatePrescriptionMedicineDto,
  ) {
    const result = await this.findPrescriptionMedicationById(id);

    Object.assign(result, updatePrescriptionMedicineDto);

    return {
      message: 'Prescription Medicine Update successfully',
      result: await this.prescriptionMedicineRepository.save(result),
    };
  }

  async removePrescriptionMedicine(id: number) {
    const result = await this.findPrescriptionMedicationById(id);

    const remove = await this.prescriptionMedicineRepository.remove(result);

    return remove;
  }

  async findPrescriptionMedicationById(id: number) {
    try {
      return await this.prescriptionMedicineRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
