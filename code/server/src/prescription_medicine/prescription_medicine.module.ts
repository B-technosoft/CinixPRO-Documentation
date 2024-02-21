import { Module } from '@nestjs/common';
import { PrescriptionMedicineService } from './prescription_medicine.service';
import { PrescriptionMedicineController } from './prescription_medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionMedicine } from './entities/prescription_medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionMedicine])],
  controllers: [PrescriptionMedicineController],
  providers: [PrescriptionMedicineService],
  exports: [PrescriptionMedicineService],
})
export class PrescriptionMedicineModule {}
