import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export interface DoctorFormComponentInterface {
  onSubmit: (data: any) => void;
  control: any;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: any;
  availableDaysIsFetching: boolean;
  availableDays: any[];
  slotsTimeIsFetching: boolean;
  slotsTime: any;
  availableTimes: any[];
  onClickAddTimeBtn: () => void;
  onClickRemoveTimeBtn: (index: number) => void;
  doctorData?: {
    profilePhoto: string;
  };
}
