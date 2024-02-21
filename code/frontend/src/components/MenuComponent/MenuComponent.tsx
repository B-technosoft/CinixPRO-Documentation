import {
  faCalendarPlus,
  faChevronDown,
  faFileLines,
  faHouse,
  faListUl,
  faReceipt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { MenuComponentInterface } from "./MenuComponentInterface";
import { Role } from "../../enums/role.enums";

const MenuComponent = ({ role }: MenuComponentInterface) => {
  return (
    <section className="bg-white px-44 py-3 flex gap-12 shadow-md">
      <Link
        to={`/${role}/`}
        className="flex gap-2 items-center cursor-pointer group"
      >
        <FontAwesomeIcon icon={faHouse} size="xs" />
        <p>Dashboard</p>
      </Link>
      {role !== Role.SuperAdmin && (
        <Link to={`/${role}/appointment`} className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faCalendarPlus} size="xs" />
          <p>Appointments</p>
        </Link>
      )}
      {role === Role.SuperAdmin ? (
        <div className="relative group">
          <div className="flex gap-2 items-center cursor-pointer">
            <FontAwesomeIcon icon={faUserAlt} size="xs" />
            <p>Doctors</p>
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </div>
          <div className="absolute hover:block group-hover:block hidden">
            <div className="py-3"></div>
            <ul
              tabIndex={0}
              className="menu menu-md z-[1] p-2 shadow-xl drop-shadow-xl bg-base-100 rounded-box w-40"
            >
              <li>
                <Link to={`/${role}/doctors`}>List Of Doctors</Link>
              </li>
              <li>
                <Link to={`/${role}/doctors/create`}>Add New Doctor</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        role !== Role.Doctor && (
          <Link to={`/${role}/doctor`} className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUserAlt} size="xs" />
            <p>Doctors</p>
          </Link>
        )
      )}
      {role === Role.SuperAdmin ? (
        <div className="relative group">
          <div className="flex gap-2 items-center cursor-pointer">
            <FontAwesomeIcon icon={faUserAlt} size="xs" />
            <p>Patients</p>
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </div>
          <div className="absolute hover:block group-hover:block hidden">
            <div className="py-3"></div>
            <ul
              tabIndex={0}
              className="menu menu-md z-[1] p-2 shadow-xl drop-shadow-xl bg-base-100 rounded-box w-40"
            >
              <li>
                <Link to={`/${role}/patients`}>List Of Patients</Link>
              </li>
              <li>
                <Link to={`/${role}/patients/create`}>Add New Patient</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        role !== Role.Patient && (
          <Link to={`/${role}/patients`} className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUserAlt} size="xs" />
            <p>Patients</p>
          </Link>
        )
      )}
      {role === Role.SuperAdmin ? (
        <div className="relative group">
          <div className="flex gap-2 items-center cursor-pointer">
            <FontAwesomeIcon icon={faUserAlt} size="xs" />
            <p>Receptionist</p>
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </div>
          <div className="absolute hover:block group-hover:block hidden">
            <div className="py-3"></div>
            <ul
              tabIndex={0}
              className="menu menu-md z-[1] p-2 shadow-xl drop-shadow-xl bg-base-100 rounded-box w-48"
            >
              <li>
                <Link to={`/${role}/receptionists`}>List Of Receptionist</Link>
              </li>
              <li>
                <Link to={`/${role}/receptionists/create`}>
                  Add New Receptionist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        role !== Role.Patient &&
        role !== Role.Receptionist && (
          <Link
            to={`/${role}/receptionists`}
            className="flex gap-2 items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faUserAlt} size="xs" />
            <p>Receptionist</p>
          </Link>
        )
      )}
      {role === Role.Doctor ? (
        <div className="relative group">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faFileLines} size="xs" />
            <p>Prescription</p>
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </div>
          <div className="absolute hover:block group-hover:block hidden">
            <div className="py-3"></div>
            <ul
              tabIndex={0}
              className="menu menu-md z-[1] p-2 shadow-xl drop-shadow-xl bg-base-100 rounded-box w-48"
            >
              <li>
                <Link to={`/${role}/prescriptions`}>List Of Prescriptions</Link>
              </li>
              <li>
                <Link to={`/${role}/prescriptions/create`}>
                  Add New Prescription
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        role !== Role.SuperAdmin && (
          <Link
            to={`/${role}/prescriptions`}
            className="flex gap-2 items-center"
          >
            <FontAwesomeIcon icon={faFileLines} size="xs" />
            <p>Prescription</p>
          </Link>
        )
      )}
      {role === Role.Receptionist ? (
        <div className="relative group">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faFileLines} size="xs" />
            <p>Invoice</p>
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </div>
          <div className="absolute hover:block group-hover:block hidden">
            <div className="py-3"></div>
            <ul
              tabIndex={0}
              className="menu menu-md z-[1] p-2 shadow-xl drop-shadow-xl bg-base-100 rounded-box w-48"
            >
              <li>
                <Link to={`/${role}/invoices`}>List Of Invoice</Link>
              </li>
              <li>
                <Link to={`/${role}/invoices/create`}>Add New Invoice</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        role !== Role.SuperAdmin && (
          <Link to={`/${role}/invoices`} className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faReceipt} size="xs" />
            <p>Invoice</p>
          </Link>
        )
      )}
      <Link
        to={`/${role}/appointment-list`}
        className="flex gap-2 items-center cursor-pointer group"
      >
        <FontAwesomeIcon icon={faListUl} size="xs" />
        <p>Appointment List</p>
      </Link>
    </section>
  );
};

export default MenuComponent;
