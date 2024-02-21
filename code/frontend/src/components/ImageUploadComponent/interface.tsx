import { Control } from "react-hook-form";

export interface ImageUploadInterface {
  control: Control<any>;
  name: string;
  defaultValue?: string;
}
