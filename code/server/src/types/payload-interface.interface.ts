import { Role } from 'src/users/enums/role.enums';

export interface PayloadInterface {
  id: number;
  email: string;
  role: Role;
}
