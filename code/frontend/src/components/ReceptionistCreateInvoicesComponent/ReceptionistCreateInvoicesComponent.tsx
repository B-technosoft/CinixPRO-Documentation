import { useEffect, useState } from "react";
import BackButtonComponent from "../BackButtonComponent/BackButtonComponent";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceValidationSchema } from "../../validations/validations";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  useGetAppointmentByPatientIdForReceptionisQuery,
  useGetAppointmentDoctorAppointmentForReceptionisQuery,
} from "../../redux/api/receptionist/receptionist-appointment/receptionist-appointment";
import { useNavigate } from "react-router-dom";
import {
  useGetPaymentModeQuery,
  useGetPaymentStatusQuery,
} from "../../redux/api/public/public";
import { useGetPatientListForReceptionisQuery } from "../../redux/api/receptionist/receptionist-patient/receptionist-patient";
import { useAddInvoicesForReceptionisMutation } from "../../redux/api/receptionist/receptionist-invoices/receptionist-invoices";
import BreadcrumbComponent from "../BreadcrumbComponent/BreadcrumbComponent";

const ReceptionistCreateInvoicesComponent = () => {
  const [patientOptions, setPatientOptions] = useState([]);
  const [appointmentOptions, setAppointmentOptions] = useState([]);

  const [patientId, setPatientId] = useState(0);

  const [paymentMode, setPaymentMode] = useState([
    {
      label: "",
      value: 0,
    },
  ]);

  const [paymentStatus, setPaymentStatus] = useState([
    {
      label: "",
      value: 0,
    },
  ]);

  const { data: patientData, isFetching: patientDataIsFetching } =
    useGetPatientListForReceptionisQuery({});

  const [addInvoices] = useAddInvoicesForReceptionisMutation();

  const { data: appointmentData, isFetching: appointmentDataIsFetching } =
    useGetAppointmentByPatientIdForReceptionisQuery(patientId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(invoiceValidationSchema),
    defaultValues: {
      invoiceItems: [{}],
    },
  });

  const {
    fields: invoiceItems,
    append: invoiceItemsAppend,
    remove: invoiceItemsRemove,
  } = useFieldArray({
    control,
    name: "invoiceItems",
  });

  //? watch
  const appointmentId = watch("appointmentId");

  const { data: doctorData } =
    useGetAppointmentDoctorAppointmentForReceptionisQuery(
      appointmentId?.value ?? 0
    );

  useEffect(() => {
    if (doctorData) {
      const { doctor } = doctorData;

      setValue("doctor", `${doctor.firstName} ${doctor.lastName}`);
      setValue("doctorId", `${doctor.id}`);
    }
  }, [doctorData, setValue]);

  const navigate = useNavigate();

  const { data: paymentModeData, isFetching: paymentModeDataIsFetching } =
    useGetPaymentModeQuery("");

  const { data: paymentStatusData, isFetching: paymentStatusDataIsFetching } =
    useGetPaymentStatusQuery("");

  useEffect(() => {
    if (!paymentModeDataIsFetching) {
      const data = paymentModeData?.result?.map(
        (paymentModeData: any, i: number) => {
          return {
            label: paymentModeData,
            value: i + 1,
          };
        }
      );

      setPaymentMode(data);
    }
  }, [paymentModeDataIsFetching, paymentModeData]);

  useEffect(() => {
    if (!paymentStatusDataIsFetching) {
      const data = paymentStatusData?.result?.map(
        (paymentStatusData: any, i: number) => {
          return {
            label: paymentStatusData,
            value: i + 1,
          };
        }
      );

      setPaymentStatus(data);
    }
  }, [paymentStatusDataIsFetching, paymentStatusData]);

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

    setValue("appointmentId", {
      label: "",
      value: "",
    });

    if (!appointmentDataIsFetching && appointmentData?.length) {
      const options = appointmentData?.map((appointment: any) => ({
        label: appointment.appointmentDate,
        value: appointment.id,
      }));

      setAppointmentOptions(options);
    }
  }, [appointmentDataIsFetching, appointmentData, patientId, setValue]);

  const onClickAddItemBtn = () => {
    invoiceItemsAppend({
      itemTitle: "",
      itemAmount: "" as unknown as number,
    });
  };

  const onClickRemoveItemBtn = (index: number) => {
    invoiceItemsRemove(index);
  };

  const onSubmit = async (data: any) => {
    const result = await addInvoices({
      ...data,
      patientId: parseInt(data.patientId.value),
      doctorId: parseInt(data.doctorId),
      appointmentId: parseInt(data.appointmentId.value),
      paymentMode: data.paymentMode.label,
      paymentStatus: data.paymentStatus.label,
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
          <h1 className="font-bold">ADD NEW Invoices</h1>
          <BreadcrumbComponent />
        </div>
        <div>
          <BackButtonComponent title="Invoice" />
        </div>
        <form
          className="bg-white p-6 drop-shadow-md rounded-xl flex-col flex gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border p-3 border-l-blue-500 border-l-4">
            <h1 className="text-lg">Invoice Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Patient</span>
              </label>
              <Controller
                name="patientId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={patientOptions}
                    isLoading={patientDataIsFetching}
                    onChange={(e) => {
                      const id = e?.value;

                      if (id) {
                        setPatientId(parseInt(id));
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.patientId && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors?.patientId?.label?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Appointment</span>
              </label>
              <Controller
                name="appointmentId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={appointmentOptions}
                    isLoading={appointmentDataIsFetching}
                  />
                )}
              />
              {errors.appointmentId && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors?.appointmentId?.label?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Doctor</span>
              </label>
              <Controller
                name="doctor"
                control={control}
                defaultValue=""
                disabled
                render={({ field }) => (
                  <input
                    {...field}
                    disabled
                    type="text"
                    className={`input input-bordered w-full input-md ${
                      errors.doctor && `input-error`
                    }`}
                  />
                )}
              />
              <Controller
                name="doctorId"
                control={control}
                defaultValue=""
                disabled
                render={({ field }) => (
                  <input {...field} disabled type="text" className="hidden" />
                )}
              />
              {errors.doctor && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors?.doctor?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">{/* !fix the gap */}</div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Payment Mode</span>
              </label>
              <Controller
                name="paymentMode"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={paymentMode as []}
                    placeholder="Select Payment Mode"
                    isLoading={paymentModeDataIsFetching}
                  />
                )}
              />
              {errors.paymentMode && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.paymentMode?.label?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Payment Status</span>
              </label>
              <Controller
                name="paymentStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={paymentStatus as []}
                    placeholder="Select Payment Status"
                    isLoading={paymentStatusDataIsFetching}
                  />
                )}
              />
              {errors.paymentStatus && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors.paymentStatus?.label?.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="border p-3 border-l-blue-500 border-l-4">
            <h1 className="text-lg">Invoice Summary</h1>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Invoice Items</span>
            </label>
            <div className="py-4 flex flex-col gap-4">
              {invoiceItems?.map((_, index) => (
                <div className="flex gap-6 items-center" key={_.id}>
                  <div>
                    <Controller
                      name={`invoiceItems.${index}.itemTitle`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter Item Title"
                          className="input input-bordered w-[20rem] input-md"
                        />
                      )}
                    />
                    {errors.invoiceItems && (
                      <label className="label">
                        <span className="label-text-alt text-red-600">
                          {errors.invoiceItems[index]?.itemTitle?.message || ""}
                        </span>
                      </label>
                    )}
                  </div>
                  <div>
                    <Controller
                      name={`invoiceItems.${index}.itemAmount`}
                      control={control}
                      defaultValue={"" as unknown as number}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter Amount"
                          className="input input-bordered w-[20rem] input-md"
                        />
                      )}
                    />
                    {errors.invoiceItems && (
                      <label className="label">
                        <span className="label-text-alt text-red-600">
                          {errors.invoiceItems[index]?.itemAmount?.message ||
                            ""}
                        </span>
                      </label>
                    )}
                  </div>
                  {index !== 0 && (
                    <button
                      className="btn btn-sm btn-circle btn-outline"
                      type="button"
                      onClick={() => onClickRemoveItemBtn(index)}
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
                onClick={onClickAddItemBtn}
              >
                Add Item
              </button>
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

export default ReceptionistCreateInvoicesComponent;
