import { Dispatch, SetStateAction } from 'react';

export interface SearchComponentInterface {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
