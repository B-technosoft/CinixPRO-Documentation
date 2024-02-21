import { useGetInvoicesListForPatientQuery } from "../../redux/api/patient/patient-invoice/patient-invoice";

const ProfilePatientInvoiceComponent = () => {
  const { data, isFetching } = useGetInvoicesListForPatientQuery({
    params: {},
  });

  return (
    <>
      <div className="overflow-x-auto">
        {isFetching && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {!isFetching && (
          <>
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>Sr.No.</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {(data as [])?.map((invoice: any, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{invoice.invoiceDate}</td>
                    <td>
                      <div className="badge badge-warning gap-2">Paid</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePatientInvoiceComponent;
