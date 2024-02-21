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
import { DegreesService } from './degrees.service';
import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';

@Controller('degrees')
export class DegreesController {
  constructor(private readonly degreesService: DegreesService) {}

  @Post('/create')
  async createDegree(@Body() createDegreeDto: CreateDegreeDto) {
    return await this.degreesService.createDegree(createDegreeDto);
  }

  @Get('/')
  async findAllDegree() {
    return await this.degreesService.findAllDegree();
  }

  @Get('/:id')
  async findOneDegree(@Param('id', ParseIntPipe) id: number) {
    return await this.degreesService.findOneDegree(id);
  }

  @Patch('/update/:id')
  async updateDegree(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDegreeDto: UpdateDegreeDto,
  ) {
    return await this.degreesService.updateDegree(id, updateDegreeDto);
  }

  @Delete('/delete/:id')
  async removeDegree(@Param('id', ParseIntPipe) id: number) {
    return await this.degreesService.removeDegree(id);
  }
}
