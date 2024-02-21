export interface PrescriptionData {
  prescription: Prescription;
  prescriptionMedicines: PrescriptionMedicine[];
  testReports: TestReport[];
}

export interface Prescription {
  symptom: string;
  diagnosi: string;
  patient: Patient;
  doctor: Doctor;
  appointment: Appointment;
  id: number;
  prescriptionDate: Date;
}

export interface Appointment {
  id: number;
  appointmentDate: Date;
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
  password: string;
  role: string;
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

export interface PrescriptionMedicine {
  medicineName: string;
  medicineNote: string;
  prescription: Prescription;
  id: number;
}

export interface TestReport {
  testReportName: string;
  testReportNote: string;
  prescription: Prescription;
  id: number;
}
