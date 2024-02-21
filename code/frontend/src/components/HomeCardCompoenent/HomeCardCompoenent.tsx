import LoadingSpinnerComponent from "../LoadingSpinnerComponent/LoadingSpinnerComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeCardCompoenentInterface } from "./interface";

const HomeCardCompoenent = ({ details }: HomeCardCompoenentInterface) => {
  return (
    <div className="w-full flex gap-6 flex-col">
      <div className="grid grid-cols-3 gap-6">
        {details?.map((detail, i) => (
          <div
            className="bg-white flex justify-between p-4 drop-shadow-md rounded-xl"
            key={i}
          >
            <div className="flex flex-col gap-2">
              <p>{detail.title}</p>
              {detail.isFetching && <LoadingSpinnerComponent />}
              {!detail.isFetching && <p>{detail.value}</p>}
            </div>
            <div className="flex items-center">
              <div className="avatar placeholder">
                <div className="bg-blue-500 text-neutral-content rounded-full w-12">
                  <FontAwesomeIcon icon={detail.icon} size="lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCardCompoenent;
