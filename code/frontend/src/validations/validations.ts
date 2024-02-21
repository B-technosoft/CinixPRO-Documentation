import * as yup from "yup";

export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const doctorValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup.string().required("Contact number is required"),
  specialization: yup.string().required("Specialization is required"),
  degree: yup.string().required("Degree is required"),
  experience: yup.string().required("Experience is required"),
  fees: yup
    .string()
    .required("Fees are required")
    .matches(/^\d+$/, "Fees must be a number"),
  password: yup.string().required("Password is required"),
  profilePhoto: yup
    .mixed()
    .test("Required", "Profile photo is required", (file: any) =>
      file ? true : false
    ),
  availableDays: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.boolean(),
      })
    )
    .test(
      "at-least-one-selected",
      "At least one day should be selected",
      (value: any) => {
        return value.some((day: any) => day.value);
      }
    ),
  slotTime: yup.object().shape({
    label: yup.string().required("Slot time is required"),
    value: yup.number().required("Slot time value is required"),
  }),
  availableTimes: yup.array().of(
    yup.object().shape({
      timeFrom: yup.string().required("Time from is required"),
      timeTo: yup.string().required("Time to is required"),
    })
  ),
});

export const doctorUpdateValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup.string().required("Contact number is required"),
  specialization: yup.string().required("Specialization is required"),
  degree: yup.string().required("Degree is required"),
  experience: yup.string().required("Experience is required"),
  fees: yup
    .string()
    .required("Fees are required")
    .matches(/^\d+$/, "Fees must be a number"),
  profilePhoto: yup.mixed().required("Profile photo is required"),
  availableDays: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string(),
        value: yup.boolean(),
      })
    )
    .test(
      "at-least-one-selected",
      "At least one day should be selected",
      (value: any) => {
        return value.some((day: any) => day.value);
      }
    ),
  slotTime: yup.object().shape({
    label: yup.string().required("Slot time is required"),
    value: yup.number().required("Slot time value is required"),
  }),
  availableTimes: yup.array().of(
    yup.object().shape({
      id: yup.mixed().required(""),
      timeFrom: yup.string().required("Time from is required"),
      timeTo: yup.string().required("Time to is required"),
    })
  ),
});

export const patientValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Select a valid gender")
    .required("Gender is required"),
  age: yup
    .string()
    .required("Age is required")
    .matches(/^[1-9][0-9]*$/, "Age must be a positive number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup
    .string()
    .matches(/^\d+$/, "Contact should contain only digits")
    .test(
      "len",
      "Contact must be exactly 10 digits",
      (val) => val?.length === 10
    )
    .required("Contact Number is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  profilePhoto: yup
    .mixed()
    .test("Required", "Profile photo is required", (file) =>
      file ? true : false
    ),
  currentAddress: yup.string().required("Current Address is required"),
  height: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Height must be a positive number")
    .required("Height is required"),
  weight: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Weight must be a positive number")
    .required("Weight is required"),
  bloodGroup: yup
    .string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Select a valid Blood Group"
    )
    .required("Blood Group is required"),
  bloodPressure: yup
    .string()
    .matches(/^\d+\/\d+$/, "Invalid blood pressure format (e.g. 120/80)")
    .required("Blood Pressure is required"),
  pulse: yup.string().required("Pulse is required"),
  respiration: yup.string().required("Respiration is required"),
  allergy: yup.string().required("Allergy is required"),
  diet: yup
    .string()
    .oneOf(["Vegetarian", "Non-vegetarian", "Vegan"], "Select a valid Diet")
    .required("Diet is required"),
});

export const patientUpdateValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Select a valid gender")
    .required("Gender is required"),
  age: yup
    .string()
    .required("Age is required")
    .matches(/^[1-9][0-9]*$/, "Age must be a positive number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup
    .string()
    .matches(/^\d+$/, "Contact should contain only digits")
    .test(
      "len",
      "Contact must be exactly 10 digits",
      (val) => val?.length === 10
    )
    .required("Contact Number is required"),
  profilePhoto: yup.mixed().required("Profile Photo is required"),
  currentAddress: yup.string().required("Current Address is required"),
  height: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Height must be a positive number")
    .required("Height is required"),
  weight: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Weight must be a positive number")
    .required("Weight is required"),
  bloodGroup: yup
    .string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Select a valid Blood Group"
    )
    .required("Blood Group is required"),
  bloodPressure: yup
    .string()
    .matches(/^\d+\/\d+$/, "Invalid blood pressure format (e.g. 120/80)")
    .required("Blood Pressure is required"),
  pulse: yup.string().required("Pulse is required"),
  respiration: yup.string().required("Respiration is required"),
  allergy: yup.string().required("Allergy is required"),
  diet: yup
    .string()
    .oneOf(["Vegetarian", "Non-vegetarian", "Vegan"], "Select a valid Diet")
    .required("Diet is required"),
});

export const receptionistValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  profilePhoto: yup
    .mixed()
    .test("Required", "Profile photo is required", (file) =>
      file ? true : false
    ),
  doctors: yup
    .array()
    .min(1, "Select at least one doctor")
    .required("Doctor is required"),
});

export const prescriptionUpdateValidationSchema = yup.object().shape({
  patientid: yup.object().shape({
    value: yup.number().positive().integer().required("Patient is required"),
  }),
  appointment: yup.object().shape({
    label: yup.string().required("Appointment is required"),
    value: yup
      .number()
      .positive()
      .integer()
      .required("Appointment is required"),
  }),
  symptom: yup.string().required("Symptom is required"),
  diagnosi: yup.string().required("Diagnosi is required"),
  prescriptionMedicines: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      medicineName: yup.string().required("Medicine Name is required"),
      medicineNote: yup.string().required("Medicine Note is required"),
    })
  ),
  testReports: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      testReportName: yup.string().required("Test Report Name is required"),
      testReportNote: yup.string().required("Test Report Note is required"),
    })
  ),
});

export const receptionistUpdateValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  profilePhoto: yup.mixed().required("Profile Photo is required"),
  doctors: yup
    .array()
    .min(1, "Select at least one doctor")
    .required("Doctor is required"),
});

export const prescriptionValidationSchema = yup.object().shape({
  patientid: yup.object().shape({
    value: yup.number().positive().integer().required("Patient is required"),
  }),
  appointment: yup.object().shape({
    label: yup.string().required("Appointment is required"),
    value: yup
      .number()
      .positive()
      .integer()
      .required("Appointment is required"),
  }),
  symptom: yup.string().required("Symptom is required"),
  diagnosi: yup.string().required("Diagnosi is required"),
  prescriptionMedicines: yup.array().of(
    yup.object().shape({
      medicineName: yup.string().required("Medicine Name is required"),
      medicineNote: yup.string().required("Medicine Note is required"),
    })
  ),
  testReports: yup.array().of(
    yup.object().shape({
      testReportName: yup.string().required("Test Report Name is required"),
      testReportNote: yup.string().required("Test Report Note is required"),
    })
  ),
});

export const invoiceValidationSchema = yup.object().shape({
  patientId: yup.object().shape({
    label: yup.string().required("Patient is required"),
    value: yup.string().required("Patient value is required"),
  }),
  appointmentId: yup.object().shape({
    label: yup.string().required("Appointment is required"),
    value: yup.string().required("Appointment value is required"),
  }),
  doctorId: yup.string(),
  doctor: yup.string(),
  paymentMode: yup.object().shape({
    label: yup.string().required("Doctor is required"),
    value: yup.string().required("Doctor value is required"),
  }),
  paymentStatus: yup.object().shape({
    label: yup.string().required("Payment status is required"),
    value: yup.string().required("Payment status is required"),
  }),
  invoiceItems: yup.array().of(
    yup.object().shape({
      itemTitle: yup.string().required("Item title is required"),
      itemAmount: yup
        .number()
        .typeError("Amount must be a number")
        .required("Item amount is required"),
    })
  ),
});

export const patientAppointmentValidationSchema = yup.object().shape({
  doctor: yup.object().shape({
    label: yup.string().required("Doctor is required"),
    value: yup.string().required("Doctor is required"),
  }),
  appointmentDate: yup.string().required("Date is required"),
  availableTime: yup.string().required("Available Time is required"),
  availableSlot: yup.string().required("Available Slot is required"),
});

export const receptiosistAppointmentValidationSchema = yup.object().shape({
  patient: yup.object().shape({
    label: yup.string().required("Patient is required"),
    value: yup.string().required("Patient value is required"),
  }),
  doctor: yup.object().shape({
    label: yup.string().required("Doctor is required"),
    value: yup.string().required("Doctor value is required"),
  }),
  appointmentDate: yup.string().required("Appointment date is required"),
  availableTime: yup.string().required("Available time is required"),
  availableSlot: yup.string().required("Available slot is required"),
});

export const doctorAppointmentValidationSchema = yup.object().shape({
  patient: yup.object().shape({
    label: yup.string().required("Patient is required"),
    value: yup.number().required("Patient ID is required"),
  }),
  appointmentDate: yup.string().required("Appointment Date is required"),
  availableTime: yup.string().required("Available Time is required"),
  availableSlot: yup.string().required("Available Slot is required"),
});

export const updateInvoiceValidationSchema = yup.object().shape({
  id: yup.string(),
  patientId: yup.string(),
  patient: yup.object().shape({
    label: yup.string().required("Patient is required"),
    value: yup.string().required("Patient value is required"),
  }),
  appointmentId: yup.object().shape({
    label: yup.string().required("Appointment is required"),
    value: yup.string().required("Appointment value is required"),
  }),
  doctorId: yup.string(),
  doctor: yup.string(),
  paymentMode: yup.object().shape({
    label: yup.string().required("Doctor is required"),
    value: yup.string().required("Doctor value is required"),
  }),
  paymentStatus: yup.object().shape({
    label: yup.string().required("Payment status is required"),
    value: yup.string().required("Payment status is required"),
  }),
  invoiceItems: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      itemTitle: yup.string().required("Item title is required"),
      itemAmount: yup
        .number()
        .typeError("Amount must be a number")
        .required("Item amount is required"),
    })
  ),
});

export const doctorProfileUpdateValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup.string().required("Contact number is required"),
  specialization: yup.string().required("Specialization is required"),
  degree: yup.string().required("Degree is required"),
  experience: yup.string().required("Experience is required"),
  fees: yup
    .string()
    .required("Fees are required")
    .matches(/^\d+$/, "Fees must be a number"),
  profilePhoto: yup.mixed().required("Profile photo is required"),
  availableDays: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string(),
        value: yup.boolean(),
      })
    )
    .test(
      "at-least-one-selected",
      "At least one day should be selected",
      (value: any) => {
        return value.some((day: any) => day.value);
      }
    ),
  slotTime: yup.object().shape({
    label: yup.string().required("Slot time is required"),
    value: yup.number().required("Slot time value is required"),
  }),
  availableTimes: yup.array().of(
    yup.object().shape({
      id: yup.mixed().required(""),
      timeFrom: yup.string().required("Time from is required"),
      timeTo: yup.string().required("Time to is required"),
    })
  ),
});
