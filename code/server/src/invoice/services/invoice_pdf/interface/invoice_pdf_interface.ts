export interface InvoiceData {
  fileName: string;
  paymentMode: string;
  paymentStatus: string;
  patient: Patient;
  appointment: Appointment;
  doctor: Doctor;
  id: number;
  invoiceDate: string;
  invoiceItems: InvoiceItem[];
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  email: string;
  contact: string;
  currentAddress: string;
  profilePhoto: string;
  height: string;
  weight: string;
  bloodPressure: string;
  pulse: string;
  respiration: string;
  allergy: string;
  password: string;
  bloodGroup: string;
  diet: string;
  role: string;
}

export interface Appointment {
  id: number;
  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  isCancel: boolean;
  isComplete: boolean;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  specialization: string;
  degree: string;
  experience: string;
  fees: number;
  profilePhoto: string;
  slotTime: number;
  password: string;
  role: string;
}

export interface InvoiceItem {
  itemTitle: string;
  itemAmount: number;
  invoice: Invoice;
  id: number;
}

export interface Invoice {
  id: number;
  invoiceDate: string;
  fileName: string;
  paymentMode: string;
  paymentStatus: string;
  patient: Patient2;
  appointment: Appointment2;
  doctor: Doctor2;
}

export interface Patient2 {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  email: string;
  contact: string;
  currentAddress: string;
  profilePhoto: string;
  height: string;
  weight: string;
  bloodPressure: string;
  pulse: string;
  respiration: string;
  allergy: string;
  password: string;
  bloodGroup: string;
  diet: string;
  role: string;
}

export interface Appointment2 {
  id: number;
  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  isCancel: boolean;
  isComplete: boolean;
}

export interface Doctor2 {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  specialization: string;
  degree: string;
  experience: string;
  fees: number;
  profilePhoto: string;
  slotTime: number;
  password: string;
  role: string;
}
