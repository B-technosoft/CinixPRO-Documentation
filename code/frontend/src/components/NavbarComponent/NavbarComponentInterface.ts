import { Role } from "../../enums/role.enums";

export interface NavbarComponentInterface {
  role: Role;
  profileIsFetching: boolean;
  profilePhoto?: string;
  name: string;
  logout: () => void;
}
