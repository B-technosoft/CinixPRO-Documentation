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
import { CreateInvoiceDto } from 'src/invoice/dto/create-invoice.dto';
import { UpdateInvoiceDto } from 'src/invoice/dto/update-invoice.dto';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { CreateInvoiceItemDto } from 'src/invoice_item/dto/create-invoice_item.dto';
import { InvoiceItemService } from 'src/invoice_item/invoice_item.service';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { PayloadInterface } from 'src/types/payload-interface.interface';
import { Brackets, Repository } from 'typeorm';
import { InvoicePdfService } from '../invoice_pdf/invoice_pdf.service';
import { v4 as uuidv4 } from 'uuid';
import { SearchQueryDto } from 'src/dtos/search-query.dto';
import { InvoiceItem } from 'src/invoice_item/entities/invoice_item.entity';

@Injectable()
export class ReceptionistInvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly InvoiceItemRepository: Repository<InvoiceItem>,
    private readonly patientService: PatientsService,
    private readonly appointmentService: AppointmentsService,
    private readonly doctorsService: DoctorsService,
    private readonly invoiceItemService: InvoiceItemService,
    private readonly receptionistService: ReceptionistService,
    private readonly invoicePdfService: InvoicePdfService,
  ) {}

  async createInvoiceForReceptionist(createInvoiceDto: CreateInvoiceDto) {
    const { appointmentId, doctorId, patientId, invoiceItems, ...extraData } =
      createInvoiceDto;

    const doctor = await this.doctorsService.getDoctorById(doctorId);

    const appointment =
      await this.appointmentService.findAppointmentById(appointmentId);
    const patient = await this.patientService.getPatientById(patientId);

    const fileName = `${uuidv4()}.pdf`;

    const invoice = this.invoiceRepository.create({
      appointment,
      doctor,
      patient,
      ...extraData,
      fileName,
    });

    const result = await this.invoiceRepository.save(invoice);

    const invoiceItemResults = await Promise.all(
      await invoiceItems.map(async (invoiceItem: CreateInvoiceItemDto) => {
        return await this.invoiceItemService.createInvoiceItem({
          ...invoiceItem,
          invoice: await result,
        });
      }),
    );

    const response = { ...result, invoiceItems: invoiceItemResults };

    await this.invoicePdfService.createInvoicePDF(response as any);

    return {
      message: 'Invoice created successfully',
      result: response,
    };
  }

  async findAllInvoicesForReceptionist(
    user: PayloadInterface,
    searchQuery: SearchQueryDto,
  ) {
    const receptionist = await this.receptionistService.findReceptionistById(
      user.id,
    );

    if (searchQuery.search) {
      return await this.invoiceRepository
        .createQueryBuilder('invoice')
        .innerJoinAndSelect('invoice.doctor', 'doctors')
        .innerJoinAndSelect('invoice.patient', 'patients')
        .innerJoinAndSelect('invoice.appointment', 'appointments')
        .innerJoin('doctors.receptionists', 'receptionists')
        .where('receptionists.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .andWhere(
          new Brackets((qb) => {
            qb.where('doctors.firstName Like :search', {
              search: `%${searchQuery.search}%`,
            })
              .orWhere('doctors.lastName Like :search', {
                search: `%${searchQuery.search}%`,
              })
              .orWhere('patients.firstName Like :search', {
                search: `%${searchQuery.search}%`,
              })
              .orWhere('patients.lastName Like :search', {
                search: `%${searchQuery.search}%`,
              });
          }),
        )
        .getMany();
    }

    return await this.invoiceRepository
      .createQueryBuilder('invoice')
      .innerJoinAndSelect('invoice.doctor', 'doctors')
      .innerJoinAndSelect('invoice.patient', 'patients')
      .innerJoinAndSelect('invoice.appointment', 'appointments')
      .innerJoinAndSelect('doctors.receptionists', 'receptionists')
      .where('receptionists.id = :receptionistId', {
        receptionistId: receptionist.id,
      })
      .getMany();
  }

  async findInvoiceByIdForReceptionist(
    user: PayloadInterface,
    invoiceId: number,
  ) {
    try {
      const receptionist = await this.receptionistService.findReceptionistById(
        user.id,
      );

      return await this.invoiceRepository
        .createQueryBuilder('invoice')
        .innerJoinAndSelect('invoice.doctor', 'doctors')
        .innerJoinAndSelect('invoice.patient', 'patients')
        .innerJoinAndSelect('invoice.appointment', 'appointment')
        .innerJoinAndSelect('invoice.invoiceItem', 'invoiceItem')
        .innerJoinAndSelect('doctors.receptionists', 'receptionists')
        .orderBy({
          'invoiceItem.id': 'ASC',
        })
        .where('receptionists.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .andWhere('invoice.id = :invoiceId', {
          invoiceId,
        })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateInvoiceForReceptionist(
    invoiceId: number,
    updateInvoiceDto: UpdateInvoiceDto,
  ) {
    try {
      const { appointmentId, doctorId, patientId, invoiceItems, ...extraData } =
        updateInvoiceDto;

      const invoice = await this.invoiceRepository.findOneOrFail({
        where: {
          id: invoiceId,
        },
        relations: {
          invoiceItem: true,
        },
      });

      const doctor = await this.doctorsService.getDoctorById(doctorId);

      const appointment =
        await this.appointmentService.findAppointmentById(appointmentId);
      const patient = await this.patientService.getPatientById(patientId);

      if (appointment.isCancel) {
        throw new BadRequestException(`Appointment is cancelled`);
      }

      if (!appointment.isComplete) {
        throw new BadRequestException(`Appointment is Not Complete`);
      }

      const updateInvoiceResult = await this.invoiceRepository
        .createQueryBuilder()
        .update(Invoice)
        .set({
          ...extraData,
          doctor: doctor,
          patient: patient,
          appointment: appointment,
        })
        .where('id = :id', { id: invoiceId })
        .execute();

      await Promise.resolve(
        invoiceItems.forEach(async (invoiceItem) => {
          if (invoiceItem.id) {
            const data = await this.InvoiceItemRepository.findOneByOrFail({
              id: invoiceItem.id,
            });

            Object.assign(data, {
              itemAmount: invoiceItem.itemAmount,
              itemTitle: invoiceItem.itemTitle,
            });

            return await this.InvoiceItemRepository.save(data);
          }

          return await this.InvoiceItemRepository.save({
            ...invoiceItem,
            invoice,
          });
        }),
      );

      const filteredInvoiceIds = await Promise.resolve(
        invoice.invoiceItem
          .map((invoiceItem) => invoiceItem.id)
          .filter(
            (currentInvoiceItemId) =>
              !invoiceItems.some(
                (invoiceItem) => invoiceItem.id === currentInvoiceItemId,
              ),
          ),
      );

      filteredInvoiceIds.length &&
        (await this.InvoiceItemRepository.delete(filteredInvoiceIds));

      if (updateInvoiceResult.affected === 0) {
        throw new NotFoundException('Prescription not found');
      }

      await this.invoiceRepository.preload(
        await this.invoiceRepository.findOneOrFail({
          where: {
            id: invoiceId,
          },
          relations: {
            invoiceItem: true,
            doctor: true,
            patient: true,
            appointment: true,
          },
        }),
      );

      const result = await this.invoiceRepository
        .createQueryBuilder('invoice')
        .leftJoinAndSelect('invoice.invoiceItem', 'invoiceItem')
        .leftJoinAndSelect('invoice.doctor', 'doctor')
        .leftJoinAndSelect('invoice.patient', 'patient')
        .leftJoinAndSelect('invoice.appointment', 'appointment')
        .where('invoice.id = :id', { id: invoiceId })
        .getOneOrFail();

      const resultData = {
        ...result,
        invoiceItems: result.invoiceItem,
      };

      await this.invoicePdfService.updateInvoicePDF(
        resultData as any,
        result.fileName,
      );

      return await result;
    } catch (error) {
      console.error(error);

      if (error.status === 400) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new NotFoundException('Invoice not found');
    }
  }

  async removeInvoiceForReceptionist(
    invoiceId: number,
    user: PayloadInterface,
  ) {
    try {
      const receptionist = await this.receptionistService.findReceptionistById(
        user.id,
      );

      const invoice = await this.invoiceRepository
        .createQueryBuilder('invoice')
        .innerJoin('invoice.doctor', 'doctors')
        .innerJoin('invoice.patient', 'patients')
        .innerJoin('doctors.receptionists', 'receptionists')
        .where('receptionists.id = :receptionistId', {
          receptionistId: receptionist.id,
        })
        .andWhere('invoice.id = :invoiceId', { invoiceId })
        .getOneOrFail();

      await this.invoicePdfService.removePDF(invoice.fileName);

      return await this.invoiceRepository.remove(invoice);
    } catch (error) {
      throw new NotFoundException('Invoice not found');
    }
  }
}
