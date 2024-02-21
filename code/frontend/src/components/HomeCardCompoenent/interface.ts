import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type DetailsType = {
  title: string;
  isFetching: boolean;
  value: number | string;
  icon: IconDefinition;
};

export interface HomeCardCompoenentInterface {
  details: DetailsType[];
}
