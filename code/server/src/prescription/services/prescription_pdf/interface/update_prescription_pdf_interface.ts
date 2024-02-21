export interface Prescription {
  id: number;
  symptom: string;
  diagnosi: string;
  prescriptionDate: string;
  fileName: string;
  appointment: Appointment;
  doctor: Doctor;
  patient: Patient;
  prescriptionMedicine: PrescriptionMedicine[];
  testReport: TestReport[];
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
  id: number;
  medicineName: string;
  medicineNote: string;
}

export interface TestReport {
  id: number;
  testReportName: string;
  testReportNote: string;
}
