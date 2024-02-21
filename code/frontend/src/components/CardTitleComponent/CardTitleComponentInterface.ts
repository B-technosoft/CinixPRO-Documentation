import { Dispatch, SetStateAction } from "react";

export interface CardTitleComponentInterface {
  title?: string;
  route?: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
