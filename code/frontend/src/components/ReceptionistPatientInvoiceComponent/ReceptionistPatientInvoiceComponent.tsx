import { Link, useParams } from "react-router-dom";
import { Role } from "../../enums/role.enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useGetInvoicesByPatientIdForReceptionisQuery } from "../../redux/api/receptionist/receptionist-invoices/receptionist-invoices";

const ReceptionistPatientInvoiceComponent = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetInvoicesByPatientIdForReceptionisQuery(id);

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
                    <td>
                      <Link
                        to={{
                          pathname: `/${Role.Receptionist}/invoices/view/${invoice.fileName}`,
                        }}
                        className="btn btn-circle btn-outline btn-sm bg-blue-500 hover:bg-blue-700 text-white"
                      >
                        <FontAwesomeIcon icon={faEye} size="xs" />
                      </Link>
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

export default ReceptionistPatientInvoiceComponent;
