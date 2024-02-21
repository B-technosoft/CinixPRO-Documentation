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
import { SpecializationsService } from './specializations.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Controller('specializations')
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Post('/create')
  createSpecialization(
    @Body() createSpecializationDto: CreateSpecializationDto,
  ) {
    return this.specializationsService.createSpecialization(
      createSpecializationDto,
    );
  }

  @Get('/')
  getAllSpecializations() {
    return this.specializationsService.getAllSpecializations();
  }

  @Get('/:id')
  getSpecialization(@Param('id', ParseIntPipe) id: number) {
    return this.specializationsService.getSpecialization(id);
  }

  @Patch('/update/:id')
  updateSpecialization(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecializationDto: UpdateSpecializationDto,
  ) {
    return this.specializationsService.updateSpecialization(
      id,
      updateSpecializationDto,
    );
  }

  @Delete('/delete/:id')
  removeSpecialization(@Param('id', ParseIntPipe) id: number) {
    return this.specializationsService.removeSpecialization(id);
  }
}
