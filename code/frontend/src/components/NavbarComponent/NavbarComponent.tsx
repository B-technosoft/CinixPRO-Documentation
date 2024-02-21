import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingSpinnerComponent from "../LoadingSpinnerComponent/LoadingSpinnerComponent";
import { NavbarComponentInterface } from "./NavbarComponentInterface";
import MenuComponent from "../MenuComponent/MenuComponent";
import { Role } from "../../enums/role.enums";
import { API_URL } from "../../redux/api/api-slice";

import logo6 from "../../assets/logos/logo-6.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = ({
  role,
  profileIsFetching,
  profilePhoto,
  name,
  logout,
}: NavbarComponentInterface) => {
  const navigate = useNavigate();

  const onClickLogoutBtn = () => {
    logout();

    navigate(`/${role}/login`, {
      replace: true,
    });
  };

  return (
    <>
      <header className="fixed w-full top-0 z-10">
        <nav className="flex justify-between bg-[#2a3042] px-44 py-3 items-center">
          <Link to={`/${role}/`} className="">
            <h1 className="text-white cursor-pointer">
              <LazyLoadImage
                effect="blur"
                src={logo6}
                alt="logo6"
                className="w-[8rem]"
              />
            </h1>
          </Link>
          <div className="flex gap-1 justify-around items-center">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar text-white flex w-[18rem] gap-4"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {profileIsFetching && <LoadingSpinnerComponent />}
                  {!profileIsFetching && profilePhoto ? (
                    <LazyLoadImage
                      src={`${API_URL}/${profilePhoto}`}
                      alt={profilePhoto}
                      effect="blur"
                    />
                  ) : (
                    <LazyLoadImage
                      src="/assets/images/pngegg.png"
                      alt="pngegg.png"
                      effect="blur"
                    />
                  )}
                </div>
                {!profileIsFetching && <p className="text-base">{name}</p>}
                {!profileIsFetching && <FontAwesomeIcon icon={faChevronDown} />}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content mt-5 z-[1] p-2 shadow-xl drop-shadow-xl bg-base-100 rounded-box w-52"
              >
                {role !== Role.SuperAdmin && (
                  <li>
                    <Link to={`/${role}/profile`} className="justify-between">
                      Profile
                    </Link>
                  </li>
                )}
                <li onClick={onClickLogoutBtn}>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <MenuComponent role={role} />
      </header>
    </>
  );
};

export default NavbarComponent;
