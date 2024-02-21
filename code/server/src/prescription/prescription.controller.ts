import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post('/create')
  async createPrescription(@Body() _: CreatePrescriptionDto) {}

  @Get('/')
  async findAllPrescriptions() {
    return await this.prescriptionService.findAllPrescriptions();
  }

  @Get('/:id')
  async findOnePrescription(@Param('id', ParseIntPipe) id: number) {
    return await this.prescriptionService.findOnePrescription(id);
  }

  @Patch('/update/:id')
  async updatePrescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return await this.prescriptionService.updatePrescription(
      id,
      updatePrescriptionDto,
    );
  }

  @Delete('/delete/:id')
  async removePrescription(@Param('id', ParseIntPipe) id: number) {
    return await this.prescriptionService.removePrescription(id);
  }
}
