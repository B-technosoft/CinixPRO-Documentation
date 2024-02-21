import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export interface PatientFormComponentInterface {
  onSubmit: (data: any) => void;
  control: any;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: any;
  profilePhoto?: string;
}
