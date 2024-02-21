import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackButtonComponentInterface } from "./interface";
import { useNavigate } from "react-router-dom";

const BackButtonComponent = ({
  title,
  isList = true,
}: BackButtonComponentInterface) => {
  const navigate = useNavigate();

  return (
    <button
      className="btn bg-blue-500 hover:bg-blue-700 text-white"
      onClick={() => navigate(-1)}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      {isList ? `Back to ${title} List` : `Back`}
    </button>
  );
};

export default BackButtonComponent;
