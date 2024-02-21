export interface LoginFormInterface {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  signUp?: boolean;
  role?: string;
  email?: string | null;
  password?: string | null;
}
