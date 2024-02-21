import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const [queryParamName, setQueryParamName] = useState<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const segments = currentPath.split("/").filter((segment) => segment !== "");
    setPathSegments(segments);

    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get("name");
    setQueryParamName(nameParam);
  }, [location]);

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {pathSegments?.map((segment, index) => (
          <li key={segment} className="capitalize">
            {index < pathSegments.length - 1 ? (
              <Link to={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                {segment}
              </Link>
            ) : (
              <span>
                {!queryParamName && segment}
                {queryParamName && `${queryParamName}`}{" "}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(BreadcrumbComponent);
