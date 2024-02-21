import { Module } from '@nestjs/common';
import { SuperAdminsController } from './controllers/super_admins/super_admins.controller';
import { SuperAdminsService } from './services/super_admins/super_admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmin } from './entitys/super_admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuperAdmin])],
  controllers: [SuperAdminsController],
  providers: [SuperAdminsService],
  exports: [SuperAdminsService],
})
export class SuperAdminsModule {}
