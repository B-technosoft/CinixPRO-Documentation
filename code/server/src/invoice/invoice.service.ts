import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { AppointmentsService } from 'src/appointments/services/appointments/appointments.service';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { InvoiceItemService } from 'src/invoice_item/invoice_item.service';
import { CreateInvoiceItemDto } from 'src/invoice_item/dto/create-invoice_item.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly patientService: PatientsService,
    private readonly appointmentService: AppointmentsService,
    private readonly doctorsService: DoctorsService,
    private readonly invoiceItemService: InvoiceItemService,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const { appointmentId, doctorId, patientId, invoiceItems } =
      createInvoiceDto;

    const doctor = await this.doctorsService.getDoctorById(doctorId);

    const appointment =
      await this.appointmentService.findAppointmentById(appointmentId);

    const patient = await this.patientService.getPatientById(patientId);

    const invoice = this.invoiceRepository.create({
      appointment,
      doctor,
      patient,
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

    return {
      message: 'Invoice created successfully',
      result: { ...result, InvoiceItems: invoiceItemResults },
    };
  }

  async findAllInvoices() {
    return await this.invoiceRepository.find({
      relations: ['patient', 'appointment', 'doctor', 'invoiceItem'],
    });
  }

  async findOneInvoice(id: number) {
    const result = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['patient', 'appointment', 'doctor', 'invoiceItem'],
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async updateInvoice(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const result = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['patient', 'appointment', 'doctor', 'invoiceItem'],
    });

    if (!result) {
      throw new NotFoundException();
    }

    Object.assign(result, updateInvoiceDto);

    return {
      message: 'Invoice is update successfully',
      result: await this.invoiceRepository.save(result),
    };
  }

  async removeInvoice(id: number) {
    const result = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['patient', 'appointment', 'doctor', 'invoiceItem'],
    });

    if (!result) {
      throw new NotFoundException();
    }

    return {
      message: 'Invoice is removed successfully',
      result: await this.invoiceRepository.remove(result),
    };
  }

  async findInvoiceById(id: number) {
    try {
      return await this.invoiceRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
