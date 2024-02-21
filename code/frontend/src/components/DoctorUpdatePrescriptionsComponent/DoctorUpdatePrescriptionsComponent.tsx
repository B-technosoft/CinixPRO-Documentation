import { useEffect, useState } from "react";
import { useGetPatientListForDoctorQuery } from "../../redux/api/doctor/doctor-patients/doctor-patients";
import {
  useGetPrescriptionByIdForDoctorQuery,
  useUpdatePrescriptionsForDoctorMutation,
} from "../../redux/api/doctor/doctor-prescriptions/doctor-prescriptions";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAppointmentByPatientIdForDoctorQuery } from "../../redux/api/doctor/doctor-appintment/doctor-appintment";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { prescriptionUpdateValidationSchema } from "../../validations/validations";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const DoctorUpdatePrescriptionsComponent = () => {
  const [patientOptions, setPatientOptions] = useState([]);
  const [appointmentOptions, setAppointmentOptions] = useState([]);

  const [patientId, setPatientId] = useState(0);

  const { data: patientData, isFetching: patientDataIsFetching } =
    useGetPatientListForDoctorQuery({});

  const [updatePrescription] = useUpdatePrescriptionsForDoctorMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(prescriptionUpdateValidationSchema),
  });

  const {
    fields: prescriptionMedicines,
    append: prescriptionMedicinesAppend,
    remove: prescriptionMedicinesRemove,
    prepend: prescriptionMedicinesPrepend,
  } = useFieldArray({
    control,
    name: "prescriptionMedicines",
  });

  const {
    fields: testReports,
    append: testReportsAppend,
    remove: testReportsRemove,
    prepend: testReportsPrepend,
  } = useFieldArray({
    control,
    name: "testReports",
  });

  const { id } = useParams();

  const { data: prescriptionData } = useGetPrescriptionByIdForDoctorQuery(id);

  const { data: appointmentData, isFetching: appointmentDataIsFetching } =
    useGetAppointmentByPatientIdForDoctorQuery(patientId);

  useEffect(() => {
    if (prescriptionData) {
      //? set setPrescriptionMedicines as length

      const prescriptionMedicines = [] as any[];

      for (
        let index = 0;
        index < (prescriptionData.prescriptionMedicine as []).length;
        index++
      ) {
        prescriptionMedicines.push({
          id: prescriptionData.prescriptionMedicine[index].id,
          medicineName:
            prescriptionData.prescriptionMedicine[index].medicineName,
          medicineNote:
            prescriptionData.prescriptionMedicine[index].medicineNote,
        });
      }

      prescriptionMedicinesPrepend(prescriptionMedicines);

      //? set setPrescriptionMedicines as length

      const testReports = [] as any[];

      for (
        let index = 0;
        index < (prescriptionData.testReport as []).length;
        index++
      ) {
        testReports.push({
          id: prescriptionData.testReport[index].id,
          testReportName: prescriptionData.testReport[index].testReportName,
          testReportNote: prescriptionData.testReport[index].testReportNote,
        });
      }

      testReportsPrepend(testReports);

      reset({
        ...prescriptionData,
        patientid: {
          label: `${prescriptionData.patient.firstName} ${prescriptionData.patient.lastName}`,
          value: prescriptionData.patient.id,
        },
        appointment: {
          label: prescriptionData.appointment.appointmentDate,
          value: prescriptionData.appointment.id,
        },
        prescriptionMedicines: [...prescriptionData.prescriptionMedicine],
        testReports: [...prescriptionData.testReport],
      });

      setPatientId(prescriptionData.patient.id);
    }
  }, [prescriptionData, reset]);

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
    if (!appointmentDataIsFetching && appointmentData?.length) {
      const options = appointmentData?.map((appointment: any) => ({
        label: appointment.appointmentDate,
        value: appointment.id,
      }));

      setAppointmentOptions(options);
    }
  }, [appointmentDataIsFetching, appointmentData, patientId, setValue]);

  const onClickAddPrescriptionMedicinesBtn = () => {
    prescriptionMedicinesAppend({ id: 0, medicineName: "", medicineNote: "" });
  };

  const onClickRemovePrescriptionMedicinesBtn = (index: number) => {
    prescriptionMedicinesRemove(index);
  };

  const onClickAddTestReportsBtn = () => {
    testReportsAppend({ id: 0, testReportName: "", testReportNote: "" });
  };

  const onClickRemoveTestReportsBtn = (index: number) => {
    testReportsRemove(index);
  };

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const prescriptionMedicines = (data.prescriptionMedicines as [])?.map(
      (prescription: any) => {
        const data = {} as any;

        if (prescription.id !== 0) {
          data["id"] = prescription.id;
        }
        data["medicineName"] = prescription.medicineName;
        data["medicineNote"] = prescription.medicineNote;

        return data;
      }
    );

    console.log(prescriptionMedicines);

    const testReports = (data.testReports as [])?.map((testReport: any) => {
      const data = {} as any;

      if (testReport.id !== 0) {
        data["id"] = testReport.id;
      }
      data["testReportName"] = testReport.testReportName;
      data["testReportNote"] = testReport.testReportNote;

      return data;
    });

    console.log(testReports);

    const result = await updatePrescription({
      ...data,
      patientid: data.patientid.value,
      appointmentid: data.appointment.value,
      prescriptionMedicines,
      testReports,
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
          <h1 className="font-bold">Update PRESCRIPTION</h1>
          <BreadcrumbComponent />
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
                {prescriptionMedicines?.map((_, index) => (
                  <div className="flex gap-6 items-center" key={_.id}>
                    <Controller
                      name={`prescriptionMedicines.${index}.id`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="input input-bordered w-[20rem] input-md hidden"
                        />
                      )}
                    />

                    <div>
                      <Controller
                        name={`prescriptionMedicines.${index}.medicineName`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
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
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            defaultValue=""
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
                                  ?.medicineName?.message
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
                        name={`testReports.${index}.id`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder=""
                            className="input input-bordered w-[20rem] input-md hidden"
                          />
                        )}
                      />
                    </div>
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

export default DoctorUpdatePrescriptionsComponent;
