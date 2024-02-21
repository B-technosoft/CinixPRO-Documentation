import { Module } from '@nestjs/common';
import { AvailableDayService } from './available_day.service';
import { AvailableDayController } from './available_day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailableDay } from './entities/available_day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvailableDay])],
  controllers: [AvailableDayController],
  providers: [AvailableDayService],
  exports: [AvailableDayService],
})
export class AvailableDayModule {}
