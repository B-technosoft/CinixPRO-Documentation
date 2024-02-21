import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { Link } from "react-router-dom";

const NewButtonComponent = ({
  title,
  route,
}: {
  title: string;
  route: string;
}) => {
  return (
    <Link to={route} className="btn bg-blue-500 hover:bg-blue-700 text-white">
      <FontAwesomeIcon icon={faPlus} />
      New {title}
    </Link>
  );
};

export default memo(NewButtonComponent);
