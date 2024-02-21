import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import CustomSuspenseComponent from "./components/CustomSuspenseComponent/CustomSuspenseComponent";

const LandingHomeComponent = lazy(
  () => import("./components/LandingHomeComponent/LandingHomeComponent")
);
const RootOutLetHelp = lazy(
  () => import("./components/help/RootOutLetHelp/RootOutLetHelp")
);
const SuperAdminNavbarComponent = lazy(
  () =>
    import("./components/SuperAdminNavbarComponent/SuperAdminNavbarComponent")
);
const SuperAdminDashboardComponent = lazy(
  () =>
    import(
      "./components/SuperAdminDashboardComponent/SuperAdminDashboardComponent"
    )
);
const SuperAdminDoctorComponent = lazy(
  () =>
    import("./components/SuperAdminDoctorComponent/SuperAdminDoctorComponent")
);
const SuperAdminCreateDoctorComponent = lazy(
  () =>
    import(
      "./components/SuperAdminCreateDoctorComponent/SuperAdminCreateDoctorComponent"
    )
);
const SuperAdminUpdateDoctorComponent = lazy(
  () =>
    import(
      "./components/SuperAdminUpdateDoctorComponent/SuperAdminUpdateDoctorComponent"
    )
);
const SuperAdminPatientsComponent = lazy(
  () =>
    import(
      "./components/SuperAdminPatientsComponent/SuperAdminPatientsComponent"
    )
);
const SuperAdminCreatePatientsComponent = lazy(
  () =>
    import(
      "./components/SuperAdminCreatePatientsComponent/SuperAdminCreatePatientsComponent"
    )
);
const SuperAdminUpdatePatientsComponent = lazy(
  () =>
    import(
      "./components/SuperAdminUpdatePatientsComponent/SuperAdminUpdatePatientsComponent"
    )
);
const SuperAdminPatientsDetaileComponent = lazy(
  () =>
    import(
      "./components/SuperAdminPatientsDetaileComponent/SuperAdminPatientsDetaileComponent"
    )
);
const SuperAdminReceptionistsComponent = lazy(
  () =>
    import(
      "./components/SuperAdminReceptionistsComponent/SuperAdminReceptionistsComponent"
    )
);
const SuperAdminCreateReceptionistsComponent = lazy(
  () =>
    import(
      "./components/SuperAdminCreateReceptionistsComponent/SuperAdminCreateReceptionistsComponent"
    )
);
const SuperAdminUpdateReceptionistsComponent = lazy(
  () =>
    import(
      "./components/SuperAdminUpdateReceptionistsComponent/SuperAdminUpdateReceptionistsComponent"
    )
);
const SuperAdminReceptionistsDetaileComponent = lazy(
  () =>
    import(
      "./components/SuperAdminReceptionistsDetaileComponent/SuperAdminReceptionistsDetaileComponent"
    )
);
const SuperAdminAppointmentListComponent = lazy(
  () =>
    import(
      "./components/SuperAdminAppointmentListComponent/SuperAdminAppointmentListComponent"
    )
);
const SuperLoginComponent = lazy(
  () => import("./components/SuperLoginComponent/SuperLoginComponent")
);
const DoctorNavbarComponent = lazy(
  () => import("./components/DoctorNavbarComponent/DoctorNavbarComponent")
);
const DoctorDashboardComponent = lazy(
  () => import("./components/DoctorDashboardComponent/DoctorDashboardComponent")
);
const DoctorCalendarAppointmentComponent = lazy(
  () =>
    import(
      "./components/DoctorCalendarAppointmentComponent/DoctorCalendarAppointmentComponent"
    )
);
const DoctorCreateCalendarAppointmentComponent = lazy(
  () =>
    import(
      "./components/DoctorCreateCalendarAppointmentComponent/DoctorCreateCalendarAppointmentComponent"
    )
);
const DoctorPatientsComponent = lazy(
  () => import("./components/DoctorPatientsComponent/DoctorPatientsComponent")
);
const DoctorPatientsDetailComponent = lazy(
  () =>
    import(
      "./components/DoctorPatientsDetailComponent/DoctorPatientsDetailComponent"
    )
);
const DoctorInvoicesComponent = lazy(
  () => import("./components/DoctorInvoicesComponent/DoctorInvoicesComponent")
);
const DoctorPrescriptionsComponent = lazy(
  () =>
    import(
      "./components/DoctorPrescriptionsComponent/DoctorPrescriptionsComponent"
    )
);
const DoctorCreatePrescriptionsComponent = lazy(
  () =>
    import(
      "./components/DoctorCreatePrescriptionsComponent/DoctorCreatePrescriptionsComponent"
    )
);
const DoctorUpdatePrescriptionsComponent = lazy(
  () =>
    import(
      "./components/DoctorUpdatePrescriptionsComponent/DoctorUpdatePrescriptionsComponent"
    )
);
const DoctorViewPrescriptionsComponent = lazy(
  () =>
    import(
      "./components/DoctorViewPrescriptionsComponent/DoctorViewPrescriptionsComponent"
    )
);
const DoctorReceptionistsComponent = lazy(
  () =>
    import(
      "./components/DoctorReceptionistsComponent/DoctorReceptionistsComponent"
    )
);
const DoctorReceptionistsDetailComponent = lazy(
  () =>
    import(
      "./components/DoctorReceptionistsDetailComponent/DoctorReceptionistsDetailComponent"
    )
);
const DoctorAppointmentListComponent = lazy(
  () =>
    import(
      "./components/DoctorAppointmentListComponent/DoctorAppointmentListComponent"
    )
);
const DoctorProfileComponent = lazy(
  () => import("./components/DoctorProfileComponent/DoctorProfileComponent")
);
const DoctorUpdateProfileComponent = lazy(
  () =>
    import(
      "./components/DoctorUpdateProfileComponent/DoctorUpdateProfileComponent"
    )
);
const DoctorLoginComponent = lazy(
  () => import("./components/DoctorLoginComponent/DoctorLoginComponent")
);
const PatientNavbarComponent = lazy(
  () => import("./components/PatientNavbarComponent/PatientNavbarComponent")
);
const PatientDashboardComponent = lazy(
  () =>
    import("./components/PatientDashboardComponent/PatientDashboardComponent")
);
const PatientDoctorComponent = lazy(
  () => import("./components/PatientDoctorComponent/PatientDoctorComponent")
);
const PatientPrescriptionsComponent = lazy(
  () =>
    import(
      "./components/PatientPrescriptionsComponent/PatientPrescriptionsComponent"
    )
);
const PatientViewPrescriptionsComponent = lazy(
  () =>
    import(
      "./components/PatientViewPrescriptionsComponent/PatientViewPrescriptionsComponent"
    )
);
const PatientInvoicesComponent = lazy(
  () => import("./components/PatientInvoicesComponent/PatientInvoicesComponent")
);
const PatientViewInvoicesComponent = lazy(
  () =>
    import(
      "./components/PatientViewInvoicesComponent/PatientViewInvoicesComponent"
    )
);
const PatientCalendarAppointmentComponent = lazy(
  () =>
    import(
      "./components/PatientCalendarAppointmentComponent/PatientCalendarAppointmentComponent"
    )
);
const PatientCreateAppointmentComponent = lazy(
  () =>
    import(
      "./components/PatientCreateAppointmentComponent/PatientCreateAppointmentComponent"
    )
);
const PatientAppointmentListComponent = lazy(
  () =>
    import(
      "./components/PatientAppointmentListComponent/PatientAppointmentListComponent"
    )
);
const PatientLoginComponent = lazy(
  () => import("./components/PatientLoginComponent/PatientLoginComponent")
);
const ParientProfileComponent = lazy(
  () => import("./components/ParientProfileComponent/ParientProfileComponent")
);
const ParientUpdateProfileComponent = lazy(
  () =>
    import(
      "./components/ParientUpdateProfileComponent/ParientUpdateProfileComponent"
    )
);
const ReceptionistDashboardComponent = lazy(
  () =>
    import(
      "./components/ReceptionistDashboardComponent/ReceptionistDashboardComponent"
    )
);
const ReceptionistCalendarAppointmentComponent = lazy(
  () =>
    import(
      "./components/ReceptionistCalendarAppointmentComponent/ReceptionistCalendarAppointmentComponent"
    )
);
const ReceptionistCreateAppointmentComponent = lazy(
  () =>
    import(
      "./components/ReceptionistCreateAppointmentComponent/ReceptionistCreateAppointmentComponent"
    )
);
const ReceptionistDoctorComponent = lazy(
  () =>
    import(
      "./components/ReceptionistDoctorComponent/ReceptionistDoctorComponent"
    )
);
const ReceptionistDoctorDetailsComponent = lazy(
  () =>
    import(
      "./components/ReceptionistDoctorDetailsComponent/ReceptionistDoctorDetailsComponent"
    )
);
const ReceptionistPatientComponent = lazy(
  () =>
    import(
      "./components/ReceptionistPatientComponent/ReceptionistPatientComponent"
    )
);
const ReceptionistPatientDetailsComponent = lazy(
  () =>
    import(
      "./components/ReceptionistPatientDetailsComponent/ReceptionistPatientDetailsComponent"
    )
);
const ReceptionistPrescriptionsComponent = lazy(
  () =>
    import(
      "./components/ReceptionistPrescriptionsComponent/ReceptionistPrescriptionsComponent"
    )
);
const ReceptionistViewPrescriptionsComponent = lazy(
  () =>
    import(
      "./components/ReceptionistViewPrescriptionsComponent/ReceptionistViewPrescriptionsComponent"
    )
);
const ReceptionistInvoicesComponent = lazy(
  () =>
    import(
      "./components/ReceptionistInvoicesComponent/ReceptionistInvoicesComponent"
    )
);
const ReceptionistCreateInvoicesComponent = lazy(
  () =>
    import(
      "./components/ReceptionistCreateInvoicesComponent/ReceptionistCreateInvoicesComponent"
    )
);
const ReceptionistUpdateInvoicesComponent = lazy(
  () =>
    import(
      "./components/ReceptionistUpdateInvoicesComponent/ReceptionistUpdateInvoicesComponent"
    )
);
const ReceptionistViewInvoicesComponent = lazy(
  () =>
    import(
      "./components/ReceptionistViewInvoicesComponent/ReceptionistViewInvoicesComponent"
    )
);
const ReceptionistProfileComponent = lazy(
  () =>
    import(
      "./components/ReceptionistProfileComponent/ReceptionistProfileComponent"
    )
);
const ReceptionistUpdateProfileComponent = lazy(
  () =>
    import(
      "./components/ReceptionistUpdateProfileComponent/ReceptionistUpdateProfileComponent"
    )
);
const ReceptionistAppointmentListComponent = lazy(
  () =>
    import(
      "./components/ReceptionistAppointmentListComponent/ReceptionistAppointmentListComponent"
    )
);
const ReceptionistLoginComponent = lazy(
  () =>
    import("./components/ReceptionistLoginComponent/ReceptionistLoginComponent")
);
const ResetPasswordComponent = lazy(
  () => import("./components/ResetPasswordComponent/ResetPasswordComponent")
);
const NotFoundComponent = lazy(
  () => import("./components/NotFoundComponent/NotFoundComponent")
);
const ParientSignupComponent = lazy(
  () => import("./components/ParientSignupComponent/ParientSignupComponent")
);
const ReceptionistNavbarComponent = lazy(
  () =>
    import(
      "./components/ReceptionistNavbarComponent/ReceptionistNavbarComponent"
    )
);
const DoctorViewInvoicesComponent = lazy(
  () =>
    import(
      "./components/DoctorViewInvoicesComponent/DoctorViewInvoicesComponent"
    )
);
const SuperAdminProtectRoute = lazy(
  () => import("./components/SuperAdminProtectRoute/SuperAdminProtectRoute")
);
const DoctorProtectRoute = lazy(
  () => import("./DoctorProtectRoute/DoctorProtectRoute")
);
const PatientProtectRoute = lazy(
  () => import("./PatientProtectRoute/PatientProtectRoute")
);
const ReceptionistProtectRoute = lazy(
  () => import("./ReceptionistProtectRoute/ReceptionistProtectRoute")
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CustomSuspenseComponent>
            <LandingHomeComponent />
          </CustomSuspenseComponent>
        }
      />
      {/* Super-admin */}
      <Route
        path="super-admin"
        element={
          <RootOutLetHelp
            component={
              <SuperAdminProtectRoute
                component={<SuperAdminNavbarComponent />}
              />
            }
          />
        }
      >
        <Route index element={<SuperAdminDashboardComponent />} />
        <Route path="doctors">
          <Route index element={<SuperAdminDoctorComponent />} />
          <Route path="create" element={<SuperAdminCreateDoctorComponent />} />
          <Route
            path="update/:id"
            element={<SuperAdminUpdateDoctorComponent />}
          />
        </Route>
        <Route path="patients">
          <Route index element={<SuperAdminPatientsComponent />} />
          <Route
            path="create"
            element={<SuperAdminCreatePatientsComponent />}
          />
          <Route
            path="update/:id"
            element={<SuperAdminUpdatePatientsComponent />}
          />
          <Route path=":id" element={<SuperAdminPatientsDetaileComponent />} />
        </Route>
        <Route path="receptionists">
          <Route index element={<SuperAdminReceptionistsComponent />} />
          <Route
            path="create"
            element={<SuperAdminCreateReceptionistsComponent />}
          />
          <Route
            path="update/:id"
            element={<SuperAdminUpdateReceptionistsComponent />}
          />
          <Route
            path=":id"
            element={<SuperAdminReceptionistsDetaileComponent />}
          />
        </Route>
        <Route
          path="appointment-list"
          element={<SuperAdminAppointmentListComponent />}
        />
        <Route path="login" element={<SuperLoginComponent />} />
      </Route>
      {/* Doctor */}
      <Route
        path="doctor"
        element={
          <RootOutLetHelp
            component={
              <DoctorProtectRoute component={<DoctorNavbarComponent />} />
            }
          />
        }
      >
        <Route index element={<DoctorDashboardComponent />} />
        <Route path="appointment">
          <Route index element={<DoctorCalendarAppointmentComponent />} />
          <Route
            path="create"
            element={<DoctorCreateCalendarAppointmentComponent />}
          />
        </Route>
        <Route path="patients">
          <Route index element={<DoctorPatientsComponent />} />
          <Route path=":id" element={<DoctorPatientsDetailComponent />} />
        </Route>
        <Route path="invoices">
          <Route index element={<DoctorInvoicesComponent />} />
          <Route path="view/:file" element={<DoctorViewInvoicesComponent />} />
        </Route>
        <Route path="prescriptions">
          <Route index element={<DoctorPrescriptionsComponent />} />
          <Route
            path="create"
            element={<DoctorCreatePrescriptionsComponent />}
          />
          <Route
            path="update/:id"
            element={<DoctorUpdatePrescriptionsComponent />}
          />
          <Route
            path="view/:file"
            element={<DoctorViewPrescriptionsComponent />}
          />
        </Route>
        <Route path="receptionists">
          <Route
            index
            element={
              <CustomSuspenseComponent>
                <DoctorReceptionistsComponent />
              </CustomSuspenseComponent>
            }
          />
          <Route
            path=":id"
            element={
              <CustomSuspenseComponent>
                <DoctorReceptionistsDetailComponent />
              </CustomSuspenseComponent>
            }
          />
        </Route>
        <Route
          path="appointment-list"
          element={
            <CustomSuspenseComponent>
              <DoctorAppointmentListComponent />
            </CustomSuspenseComponent>
          }
        />
        <Route path="profile">
          <Route index element={<DoctorProfileComponent />} />
          <Route
            path="update"
            element={
              <CustomSuspenseComponent>
                <DoctorUpdateProfileComponent />
              </CustomSuspenseComponent>
            }
          />
        </Route>
        <Route
          path="login"
          element={
            <CustomSuspenseComponent>
              <DoctorLoginComponent />
            </CustomSuspenseComponent>
          }
        />
      </Route>
      {/* patient */}
      <Route
        path="patient"
        element={
          <RootOutLetHelp
            component={
              <PatientProtectRoute component={<PatientNavbarComponent />} />
            }
          />
        }
      >
        <Route index element={<PatientDashboardComponent />} />
        <Route path="doctor" element={<PatientDoctorComponent />} />
        <Route path="prescriptions">
          <Route index element={<PatientPrescriptionsComponent />} />
          <Route
            path="view/:file"
            element={<PatientViewPrescriptionsComponent />}
          />
        </Route>
        <Route path="invoices">
          <Route index element={<PatientInvoicesComponent />} />
          <Route path="view/:file" element={<PatientViewInvoicesComponent />} />
        </Route>
        <Route path="appointment">
          <Route index element={<PatientCalendarAppointmentComponent />} />
          <Route
            path="create"
            element={<PatientCreateAppointmentComponent />}
          />
        </Route>
        <Route
          path="appointment-list"
          element={<PatientAppointmentListComponent />}
        />
        <Route path="login" element={<PatientLoginComponent />} />
        <Route path="sign-up" element={<ParientSignupComponent />} />
        <Route path="profile">
          <Route index element={<ParientProfileComponent />} />
          <Route path="update" element={<ParientUpdateProfileComponent />} />
        </Route>
      </Route>
      {/* receptionist */}
      <Route
        path="receptionist"
        element={
          <RootOutLetHelp
            component={
              <ReceptionistProtectRoute
                component={<ReceptionistNavbarComponent />}
              />
            }
          />
        }
      >
        <Route index element={<ReceptionistDashboardComponent />} />
        <Route path="appointment">
          <Route index element={<ReceptionistCalendarAppointmentComponent />} />
          <Route
            path="create"
            element={<ReceptionistCreateAppointmentComponent />}
          />
        </Route>
        <Route path="doctor">
          <Route index element={<ReceptionistDoctorComponent />} />
          <Route path=":id" element={<ReceptionistDoctorDetailsComponent />} />
        </Route>
        <Route path="patients">
          <Route index element={<ReceptionistPatientComponent />} />
          <Route path=":id" element={<ReceptionistPatientDetailsComponent />} />
        </Route>
        <Route path="prescriptions">
          <Route index element={<ReceptionistPrescriptionsComponent />} />
          <Route
            path="view/:file"
            element={<ReceptionistViewPrescriptionsComponent />}
          />
        </Route>
        <Route path="invoices">
          <Route index element={<ReceptionistInvoicesComponent />} />
          <Route
            path="create"
            element={<ReceptionistCreateInvoicesComponent />}
          />
          <Route
            path="update/:id"
            element={<ReceptionistUpdateInvoicesComponent />}
          />
          <Route
            path="view/:file"
            element={<ReceptionistViewInvoicesComponent />}
          />
        </Route>
        <Route path="profile">
          <Route index element={<ReceptionistProfileComponent />} />
          <Route
            path="update"
            element={<ReceptionistUpdateProfileComponent />}
          />
        </Route>
        <Route
          path="appointment-list"
          element={<ReceptionistAppointmentListComponent />}
        />
        <Route path="login" element={<ReceptionistLoginComponent />} />
      </Route>
      <Route
        path="/reset-password"
        element={
          <CustomSuspenseComponent>
            <ResetPasswordComponent />
          </CustomSuspenseComponent>
        }
      />
      <Route
        path="*"
        element={
          <CustomSuspenseComponent>
            <NotFoundComponent />
          </CustomSuspenseComponent>
        }
      />
    </Routes>
  );
}

export default App;
