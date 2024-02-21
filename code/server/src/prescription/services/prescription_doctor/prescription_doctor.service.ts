import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsService } from 'src/appointments/services/appointments/appointments.service';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { CreatePrescriptionDto } from 'src/prescription/dto/create-prescription.dto';
import { UpdatePrescriptionDto } from 'src/prescription/dto/update-prescription.dto';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { PrescriptionService } from 'src/prescription/prescription.service';
import { PrescriptionMedicine } from 'src/prescription_medicine/entities/prescription_medicine.entity';
import { PrescriptionMedicineService } from 'src/prescription_medicine/prescription_medicine.service';
import { TestReport } from 'src/test_report/entities/test_report.entity';
import { TestReportService } from 'src/test_report/test_report.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';
import { PrescriptionPdfService } from '../prescription_pdf/prescription_pdf.service';
import { v4 as uuidv4 } from 'uuid';
import { SearchQueryDto } from 'src/dtos/search-query.dto';

@Injectable()
export class PrescriptionDoctorService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(PrescriptionMedicine)
    private readonly prescriptionMedicineRepository: Repository<PrescriptionMedicine>,
    @InjectRepository(TestReport)
    private readonly testReportRepository: Repository<TestReport>,
    private readonly patientService: PatientsService,
    private readonly appointmentsService: AppointmentsService,
    private readonly prescriptionMedicineService: PrescriptionMedicineService,
    private readonly doctorsService: DoctorsService,
    private readonly testReportService: TestReportService,
    private readonly prescriptionService: PrescriptionService,
    private readonly prescriptionPdfService: PrescriptionPdfService,
  ) {}

  async fetchAllPrescriptionForDoctor(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const doctor = await this.doctorsService.getDoctorById(user.id);

    if (searchQuery.search) {
      return await this.prescriptionRepository
        .createQueryBuilder('prescription')
        .innerJoinAndSelect('prescription.doctor', 'doctor')
        .innerJoinAndSelect('prescription.patient', 'patient')
        .innerJoinAndSelect('prescription.appointment', 'appointment')
        .where('doctor.id = :doctorId', { doctorId: doctor.id })
        .andWhere(
          new Brackets((qb) => {
            qb.where('patient.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            }).orWhere('patient.lastName Like :search', {
              search: `%${searchQuery.search}%`,
            });
          }),
        )
        .getMany();
    }

    return await this.prescriptionRepository
      .createQueryBuilder('prescription')
      .innerJoinAndSelect('prescription.doctor', 'doctor')
      .innerJoinAndSelect('prescription.patient', 'patient')
      .innerJoinAndSelect('prescription.appointment', 'appointment')
      .where('doctor.id = :doctorId', {
        doctorId: doctor.id,
      })
      .getMany();
  }

  async fetchPrescriptionByIdForDoctor(
    user: PayloadInterface,
    prescriptionId: number,
  ) {
    try {
      const doctor = await this.doctorsService.getDoctorById(user.id);

      return await this.prescriptionRepository
        .createQueryBuilder('prescription')
        .innerJoinAndSelect('prescription.doctor', 'doctor')
        .innerJoinAndSelect('prescription.patient', 'patient')
        .leftJoinAndSelect(
          'prescription.prescriptionMedicine',
          'prescriptionMedicines',
        )
        .leftJoinAndSelect('prescription.testReport', 'testReports')
        .leftJoinAndSelect('prescription.appointment', 'appointment')
        .where('doctor.id = :doctorId', {
          doctorId: doctor.id,
        })
        .andWhere('prescription.id = :prescriptionId', {
          prescriptionId: prescriptionId,
        })
        .orderBy({
          'prescriptionMedicines.id': 'ASC',
          'testReports.id': 'ASC',
        })
        .getOneOrFail();
    } catch (error) {
      console.log(error);

      throw new NotFoundException();
    }
  }

  async createPrescriptionForDoctor(
    user: PayloadInterface,
    createPrescriptionDto: CreatePrescriptionDto,
  ) {
    const {
      patientid,
      appointmentid,
      prescriptionMedicines,
      testReports,
      ...extraData
    } = createPrescriptionDto;

    console.log(user.id);

    const doctor = await this.doctorsService.getDoctorById(user.id);

    const patient = await this.patientService.getPatientById(patientid);

    const appointment =
      await this.appointmentsService.findAppointmentById(appointmentid);

    if (appointment.isCancel) {
      throw new BadRequestException(`Appointment is cancelled`);
    }

    if (!appointment.isComplete) {
      throw new BadRequestException(`Appointment is not complete`);
    }

    const result = {};

    const fileName = `${uuidv4()}.pdf`;

    const prescription = await this.prescriptionRepository.create({
      ...extraData,
      appointment,
      patient,
      doctor,
      fileName,
    });

    const resultPrescrption =
      await this.prescriptionRepository.save(prescription);

    result['prescription'] = prescription;

    result['prescriptionMedicines'] = await Promise.all(
      await prescriptionMedicines.map(async (prescriptionMedicine: any) => {
        return await this.prescriptionMedicineService.createPrescriptionMedicine(
          {
            ...prescriptionMedicine,
            prescription: resultPrescrption,
          },
        );
      }),
    );

    if (testReports) {
      result['testReports'] = await Promise.all(
        await testReports.map(async (testReport: any) => {
          return await this.testReportService.createTestReport({
            ...testReport,
            prescription: resultPrescrption,
          });
        }),
      );
    }

    this.prescriptionPdfService.createPrescriptionPDF(result as any, fileName);

    return {
      message: 'Prescription is created successfully',
      result: result,
    };
  }

  async updatePrescriptionByIdForDoctor(
    user: PayloadInterface,
    prescriptionId: number,
    updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    try {
      const doctor = await this.doctorsService.getDoctorById(user.id);

      const {
        patientid,
        appointmentid,
        prescriptionMedicines,
        testReports,
        ...extraData
      } = updatePrescriptionDto;

      const prescription = await this.prescriptionRepository.findOneOrFail({
        where: { id: prescriptionId, doctor: doctor },
        relations: {
          prescriptionMedicine: true,
          testReport: true,
        },
      });

      const currentPrescriptionMedicineIds =
        prescription.prescriptionMedicine.map(
          (prescriptionMedicine) => prescriptionMedicine.id,
        );

      const currentTestReportIds = prescription.testReport.map(
        (testReport) => testReport.id,
      );

      const resultPatiemt = await this.patientService.getPatientById(patientid);

      const resultAppointment =
        await this.appointmentsService.findAppointmentById(appointmentid);

      if (resultAppointment.isCancel) {
        throw new BadRequestException(`Appointment is cancelled`);
      }

      if (!resultAppointment.isComplete) {
        throw new BadRequestException(`Appointment is Not Complete`);
      }

      const updatePrescriptionResult = await this.prescriptionRepository
        .createQueryBuilder()
        .update(Prescription)
        .set({
          ...extraData,
          patient: resultPatiemt,
          appointment: resultAppointment,
        })
        .where('id = :id', { id: prescriptionId })
        .execute();

      prescriptionMedicines.forEach(async (prescriptionMedicine) => {
        if (prescriptionMedicine.id) {
          const data =
            await this.prescriptionMedicineService.findPrescriptionMedicationById(
              prescriptionMedicine.id,
            );

          Object.assign(data, {
            medicineName: prescriptionMedicine.medicineName,
            medicineNote: prescriptionMedicine.medicineNote,
          });

          return await this.prescriptionMedicineRepository.save(data);
        }

        const data = await this.prescriptionMedicineRepository.create({
          ...prescriptionMedicine,
          prescription,
        });

        return await this.prescriptionMedicineRepository.save(data);
      });

      const filteredPrescriptionMedicineIds =
        currentPrescriptionMedicineIds.filter(
          (currentPrescriptionMedicineId) =>
            !prescriptionMedicines.some(
              (medicine) => medicine.id === currentPrescriptionMedicineId,
            ),
        );

      filteredPrescriptionMedicineIds.length &&
        (await this.prescriptionMedicineRepository.delete(
          filteredPrescriptionMedicineIds,
        ));

      testReports.forEach(async (testReport) => {
        if (testReport.id) {
          const data = await this.testReportService.findTestReportById(
            testReport.id,
          );

          Object.assign(data, {
            testReportName: testReport.testReportName,
            testReportNote: testReport.testReportNote,
          });

          return await this.testReportRepository.save(data);
        }

        const data = await this.testReportRepository.create({
          ...testReport,
          prescription,
        });

        return await this.testReportRepository.save(data);
      });

      const filteredTestReportIds = currentTestReportIds.filter(
        (currentTestReportId) =>
          !testReports.some((medicine) => medicine.id === currentTestReportId),
      );

      filteredTestReportIds.length &&
        (await this.testReportRepository.delete(filteredTestReportIds));

      if (updatePrescriptionResult.affected === 0) {
        throw new NotFoundException('Prescription not found');
      }

      const result =
        await this.prescriptionService.findPrescriptionByIdRelations(
          prescriptionId,
        );

      this.prescriptionPdfService.updatePrescriptionPDF(
        result as any,
        result.fileName,
      );

      return result;
    } catch (error) {
      console.error(error);

      if (error.status === 400) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new NotFoundException();
    }
  }

  async deletePrescriptionByIdForDoctor(
    user: PayloadInterface,
    prescriptionId: number,
  ) {
    try {
      const doctor = await this.doctorsService.getDoctorById(user.id);

      const prescription = await this.prescriptionRepository.findOne({
        where: {
          id: prescriptionId,
          doctor: doctor,
        },
      });

      if (!prescription) {
        throw new NotFoundException('Prescription not found');
      }

      await this.prescriptionRepository.remove(prescription);

      await this.prescriptionPdfService.removePDF(prescription.fileName);

      return {
        message: 'Prescription deleted successfully',
      };
    } catch (error) {
      console.log(error);

      throw new NotFoundException();
    }
  }
}
