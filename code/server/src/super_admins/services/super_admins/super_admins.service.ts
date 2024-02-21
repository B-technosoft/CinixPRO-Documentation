import * as bcrypt from 'bcryptjs';

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/users/enums/role.enums';
import { LoginDto } from 'src/users/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from 'src/super_admins/entitys/super_admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuperAdminDto } from 'src/super_admins/dtos/create-super_admin.dto';

@Injectable()
export class SuperAdminsService {
  constructor(
    @InjectRepository(SuperAdmin)
    private readonly superAdminRepository: Repository<SuperAdmin>,
    private readonly jwtService: JwtService,
  ) {}

  async registerSuperAdmin(superAdminDto: CreateSuperAdminDto) {
    const existing = await this.getSuperAdminByEmail(superAdminDto.email);

    if (existing) {
      throw new ConflictException(
        `Doctor are already existing with this email ${existing.email}`,
      );
    }

    const { password } = superAdminDto;

    const saltOrRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const userData = {
      ...superAdminDto,
      password: hashPassword,
      role: Role.SuperAdmin,
    };

    const result = this.superAdminRepository.create(userData);

    const superAdminDataResult = await this.superAdminRepository.save(result);

    const payload = {
      id: superAdminDataResult.id,
      email: superAdminDataResult.email,
      role: superAdminDataResult.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: superAdminDataResult.id,
        name: superAdminDataResult.name,
        email: superAdminDataResult.email,
        contact: superAdminDataResult.contact,
      },
    };
  }

  async loginSuperAdmin(superAdminDto: LoginDto) {
    const superAdminDataResult = await this.getSuperAdminByEmail(
      superAdminDto.email,
    );

    if (!superAdminDataResult) {
      throw new NotFoundException();
    }

    const compare = await bcrypt.compare(
      superAdminDto.password,
      superAdminDataResult.password,
    );

    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: superAdminDataResult.id,
      email: superAdminDataResult.email,
      role: superAdminDataResult.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      user: {
        id: superAdminDataResult.id,
        name: superAdminDataResult.name,
        email: superAdminDataResult.email,
        contact: superAdminDataResult.contact,
      },
    };
  }

  async getSuperAdminByEmail(email: string) {
    return await this.superAdminRepository.findOneBy({ email: email });
  }

  async getSuperAdminById(id: number) {
    try {
      return await this.superAdminRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Super Admin with ID ${id} not found`);
    }
  }
}
