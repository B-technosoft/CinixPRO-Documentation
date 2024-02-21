import { Controller, useFieldArray, useForm } from "react-hook-form";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { prescriptionValidationSchema } from "../../validations/validations";
import Select from "react-select";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAddPrescriptionsForDoctorMutation } from "../../redux/api/doctor/doctor-prescriptions/doctor-prescriptions";
import { useNavigate } from "react-router-dom";
import { useGetPatientListForDoctorQuery } from "../../redux/api/doctor/doctor-patients/doctor-patients";
import { useGetAppointmentByPatientIdForDoctorQuery } from "../../redux/api/doctor/doctor-appintment/doctor-appintment";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const DoctorCreatePrescriptionsComponent = () => {
  const [patientOptions, setPatientOptions] = useState([]);
  const [appointmentOptions, setAppointmentOptions] = useState([]);

  const [patientId, setPatientId] = useState(0);

  const { data: patientData, isFetching: patientDataIsFetching } =
    useGetPatientListForDoctorQuery({});

  const [addPrescriptions] = useAddPrescriptionsForDoctorMutation();

  const { data: appointmentData, isFetching: appointmentDataIsFetching } =
    useGetAppointmentByPatientIdForDoctorQuery(patientId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(prescriptionValidationSchema),
    defaultValues: {
      prescriptionMedicines: [
        {
          medicineName: "",
          medicineNote: "",
        },
      ],
      testReports: [{ testReportName: "", testReportNote: "" }],
    },
  });

  const {
    fields: prescriptionMedicines,
    append: prescriptionMedicinesAppend,
    remove: prescriptionMedicinesRemove,
  } = useFieldArray({
    control,
    name: "prescriptionMedicines",
  });

  const {
    fields: testReports,
    append: testReportsAppend,
    remove: testReportsRemove,
  } = useFieldArray({
    control,
    name: "testReports",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!patientDataIsFetching) {
      const options = patientData?.map((patient: any) => ({
        label: `${patient.firstName} ${patient.lastName}`,
        value: patient.id,
      }));

      setPatientOptions(options);
    }
  }, [patientDataIsFetching, patientData]);

  useEffect(() => {
    setAppointmentOptions([]);

    setValue("appointment", {
      label: "",
      value: 0,
    });

    if (!appointmentDataIsFetching && appointmentData?.length) {
      const options = appointmentData?.map((appointment: any) => ({
        label: appointment.appointmentDate,
        value: appointment.id,
      }));

      setAppointmentOptions(options);
    }
  }, [appointmentDataIsFetching, appointmentData, patientId, setValue]);

  const onClickAddPrescriptionMedicinesBtn = () => {
    prescriptionMedicinesAppend({
      medicineName: "",
      medicineNote: "",
    });
  };

  const onClickRemovePrescriptionMedicinesBtn = (index: number) => {
    prescriptionMedicinesRemove(index);
  };

  const onClickAddTestReportsBtn = () => {
    testReportsAppend({ testReportName: "", testReportNote: "" });
  };

  const onClickRemoveTestReportsBtn = (index: number) => {
    testReportsRemove(index);
  };

  const onSubmit = async (data: any) => {
    const result = await addPrescriptions({
      ...data,
      patientid: data.patientid.value,
      appointmentid: data.appointment.value,
    });

    if ("data" in result) {
      return navigate(-1);
    }

    console.log(result);
  };

  return (
    <LayoutComponent>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between">
          <h1 className="font-bold">ADD NEW PRESCRIPTION</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="Prescription" />
        </div>
        <form
          className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border p-3 border-l-blue-500 border-l-4">
            <h1 className="text-lg">Prescription Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Patient</span>
              </label>
              <Controller
                name="patientid"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={patientOptions}
                    isLoading={patientDataIsFetching}
                    onChange={(e) => {
                      if (e) {
                        setPatientId(e.value ?? 0);
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.patientid && errors.patientid.value && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    Patient is required
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Appointment</span>
              </label>
              <Controller
                name="appointment"
                control={control}
                defaultValue={{ label: "", value: 0 }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={appointmentOptions}
                    isLoading={appointmentDataIsFetching}
                  />
                )}
              />
              {errors.appointment && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.appointment.label?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Symptom</span>
              </label>
              <Controller
                name="symptom"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Symptom"
                    className="input input-bordered w-full input-md"
                  />
                )}
              />
              {errors.symptom && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.symptom?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Diagnosi</span>
              </label>
              <Controller
                name="diagnosi"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Diagnosi"
                    className="input input-bordered w-full input-md"
                  />
                )}
              />
              {errors.diagnosi && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.diagnosi?.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="border p-3 border-l-blue-500 border-l-4">
            <h1 className="text-lg">Medication & Test Reports Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Medicines</span>
              </label>
              <div className="py-4 flex flex-col gap-4">
                {prescriptionMedicines?.map((value, index) => (
                  <div className="flex gap-6 items-center" key={value.id}>
                    <div>
                      <Controller
                        name={`prescriptionMedicines.${index}.medicineName`}
                        control={control}
                        defaultValue={value.medicineName}
                        render={({ field }) => (
                          <input
                            {...field}
                            defaultValue={value.medicineName}
                            type="text"
                            placeholder="Enter Medicines Name"
                            className="input input-bordered w-[20rem] input-md"
                          />
                        )}
                      />
                      {errors.prescriptionMedicines &&
                        errors.prescriptionMedicines[index] && (
                          <label className="label">
                            <span className="label-text-alt text-red-600">
                              {
                                errors.prescriptionMedicines[index]
                                  ?.medicineName?.message
                              }
                            </span>
                          </label>
                        )}
                    </div>
                    <div>
                      <Controller
                        name={`prescriptionMedicines.${index}.medicineNote`}
                        control={control}
                        defaultValue={value.medicineNote}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            defaultValue={value.medicineNote}
                            placeholder="Enter Note"
                            className="input input-bordered w-[20rem] input-md"
                          />
                        )}
                      />
                      {errors.prescriptionMedicines &&
                        errors.prescriptionMedicines[index] && (
                          <label className="label">
                            <span className="label-text-alt text-red-600">
                              {
                                errors.prescriptionMedicines[index]
                                  ?.medicineNote?.message
                              }
                            </span>
                          </label>
                        )}
                    </div>
                    {index !== 0 && (
                      <button
                        className="btn btn-sm btn-circle btn-outline"
                        type="button"
                        onClick={() =>
                          onClickRemovePrescriptionMedicinesBtn(index)
                        }
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <button
                  className="btn bg-blue-500 hover:bg-blue-700 text-white"
                  type="button"
                  onClick={onClickAddPrescriptionMedicinesBtn}
                >
                  Add Medicine
                </button>
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Test Reports</span>
              </label>
              <div className="py-4 flex flex-col gap-4">
                {testReports?.map((_, index) => (
                  <div className="flex gap-6 items-center" key={_.id}>
                    <div>
                      <Controller
                        name={`testReports.${index}.testReportName`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter TestReport Name"
                            className="input input-bordered w-[20rem] input-md"
                          />
                        )}
                      />
                      {errors.testReports && errors.testReports[index] && (
                        <label className="label">
                          <span className="label-text-alt text-red-600">
                            {errors.testReports[index]?.testReportName?.message}
                          </span>
                        </label>
                      )}
                    </div>
                    <div>
                      <Controller
                        name={`testReports.${index}.testReportNote`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter TestReport Note"
                            className="input input-bordered w-[20rem] input-md"
                          />
                        )}
                      />
                      {errors.testReports && errors.testReports[index] && (
                        <label className="label">
                          <span className="label-text-alt text-red-600">
                            {errors.testReports[index]?.testReportNote?.message}
                          </span>
                        </label>
                      )}
                    </div>
                    {index !== 0 && (
                      <button
                        className="btn btn-sm btn-circle btn-outline"
                        type="button"
                        onClick={() => onClickRemoveTestReportsBtn(index)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <button
                  className="btn bg-blue-500 hover:bg-blue-700 text-white"
                  type="button"
                  onClick={onClickAddTestReportsBtn}
                >
                  Add Test Reports
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-700 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </LayoutComponent>
  );
};

export default DoctorCreatePrescriptionsComponent;
