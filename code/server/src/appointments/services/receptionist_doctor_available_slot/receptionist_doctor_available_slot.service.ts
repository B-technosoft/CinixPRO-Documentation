import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entitys/appointment.entity';
import { AvailableTime } from 'src/doctors/entitys/available_time.entity';
import { DoctorsService } from 'src/doctors/services/doctors/doctors.service';
import { timeToMinutes } from 'src/utils/time_to_minutes';
import { Repository } from 'typeorm';

import * as dayjs from 'dayjs';

@Injectable()
export class ReceptionistDoctorAvailableSlotService {
  constructor(
    private readonly doctorService: DoctorsService,
    @InjectRepository(AvailableTime)
    private readonly availableTimeRepository: Repository<AvailableTime>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async getPatientDoctorAvailableSlot(
    doctorId: number,
    availableTimeId: number,
    appointmentDate?: string,
  ) {
    try {
      if (!appointmentDate) {
        throw new BadRequestException(
          'appointmentDate is required is query parameter',
        );
      }

      const {
        id: dId,
        slotTime,
        availableDays,
      } = await this.doctorService.getDoctorByIdWithRelationship(doctorId);

      if (slotTime === 0) {
        throw new BadRequestException('Updating the slot time');
      }

      const appointmentDateName = dayjs(appointmentDate).format('dddd');

      if (
        !availableDays.some(
          (availableDay) => availableDay.day === appointmentDateName,
        )
      ) {
        throw new BadRequestException('Check The Doctor Available Days');
      }

      const availableTimes = await this.availableTimeRepository
        .createQueryBuilder('availableTime')
        .innerJoinAndSelect('availableTime.doctor', 'doctor')
        .select([
          'availableTime.id',
          'availableTime.timeFrom',
          'availableTime.timeTo',
        ])
        .where('availableTime.id = :availableTimeId', {
          availableTimeId: availableTimeId,
        })
        .andWhere('doctor.id = :doctorId', { doctorId: dId })
        .getMany();

      const appointments = await this.appointmentRepository.find({
        where: {
          doctor: {
            id: dId,
          },
          appointmentDate: appointmentDate as any,
          isCancel: false,
          isComplete: false,
        },
        select: {
          appointmentDate: true,
          appointmentStartTime: true,
          appointmentEndTime: true,
          isCancel: true,
          isComplete: true,
        },
      });

      return availableTimes
        .map((availableTime) => {
          const startMinutes = timeToMinutes(availableTime.timeFrom);
          const endMinutes = timeToMinutes(availableTime.timeTo);

          const intervals = [];

          for (let i = startMinutes; i < endMinutes; i += slotTime) {
            const startTime = new Date(0, 0, 0, Math.floor(i / 60), i % 60);
            const endTime = new Date(
              0,
              0,
              0,
              Math.floor((i + slotTime) / 60),
              (i + slotTime) % 60,
            );

            const isUsed = appointments.some((appointment) => {
              const appointmentStartTime = timeToMinutes(
                appointment.appointmentStartTime,
              );

              const appointmentEndTime = timeToMinutes(
                appointment.appointmentEndTime,
              );

              const startMinutes =
                startTime.getHours() * 60 + startTime.getMinutes();
              const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();

              return (
                startMinutes === appointmentStartTime &&
                endMinutes === appointmentEndTime
              );
            });

            intervals.push({
              id: availableTime.id,
              timeFrom: startTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              timeTo: endTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              isUsed,
            });
          }

          return intervals;
        })
        .flat();
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
