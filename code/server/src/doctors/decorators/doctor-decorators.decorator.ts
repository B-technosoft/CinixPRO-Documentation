import { SetMetadata } from '@nestjs/common';

export const IS_DOCTOR_KEY = 'IsDoctor';

export const Doctor = () => SetMetadata(IS_DOCTOR_KEY, true);
