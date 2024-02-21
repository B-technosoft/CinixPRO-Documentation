import { useParams } from "react-router-dom";
import { usePrescriptionsPDFForPatientQuery } from "../../redux/api/patient/patient-prescription/patient-prescription";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page as PDFViewer } from "react-pdf";
import LoadingSpinnerComponent from "../LoadingSpinnerComponent/LoadingSpinnerComponent";

const PatientViewPrescriptionsComponent = () => {
  const { file } = useParams();

  const { data, isFetching } = usePrescriptionsPDFForPatientQuery(`${file}`);
  const [workerSrc, setWorkerSrc] = useState("");

  useEffect(() => {
    setWorkerSrc(
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
    );
  }, []);

  useEffect(() => {
    if (workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    }
  }, [workerSrc]);
  return (
    <>
      <section className="flex flex-col gap-7 mt-28 mx-auto w-[98rem] grow py-8">
        {isFetching && (
          <div className="flex justify-center items-center flex-1">
            <LoadingSpinnerComponent />
          </div>
        )}
        {!isFetching && (
          <div className="flex justify-center">
            <Document file={data}>
              <PDFViewer pageNumber={1} renderTextLayer={false} />
            </Document>
          </div>
        )}
      </section>
    </>
  );
};

export default PatientViewPrescriptionsComponent;
