import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "../app/shared/Spinner";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthProvider } from "../context/authContext";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const Buttons = lazy(() => import("./basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"));
const Typography = lazy(() => import("./basic-ui/Typography"));

const BasicElements = lazy(() => import("./form-elements/BasicElements"));

const BasicTable = lazy(() => import("./tables/BasicTable"));

const Mdi = lazy(() => import("./icons/Mdi"));

const ChartJs = lazy(() => import("./charts/ChartJs"));

const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/Login"));
const Register = lazy(() => import("./user-pages/Register"));

// Afiliados
const Affiliate = lazy(() => import("./affiliates/Affiliate"));


// Empresas Aliadas
const Companies = lazy(() => import("./allied-companies/Companies"));

const NewCompanies = lazy(() => import("./allied-companies/NewCompanies"));
const MoreInfo = lazy(() => import("./allied-companies/MoreInfo"));

//admin

const AdministrativePortfolio = lazy(() =>
  import("./administrative/AdministrativePortfolio")
);

// statistics
const GraphPointsPerMonth = lazy(() =>
  import("./statistics/GraphPointsPerMonth")
);
const GraphCompanyPoints = lazy(() =>
  import("./statistics/GraphCompanyPoints")
);

//reports
const ReportPointsByCity = lazy(() => import("./reports/ReportPointsByCity"));
const ReportPointsByCompanies = lazy(() =>
  import("./reports/ReportPointsByCompanies")
);
const ReportPointsForCustomers = lazy(() =>
  import("./reports/ReportPointsForCustomers")
);

const DataFire = lazy(() => import("./reports/DataFire"));

//settings
const CreateProfile = lazy(() => import("./setting/CreateProfile"));
const DashboardSetting = lazy(() => import("./setting/DashboardSetting"));
const NatupointsApp = lazy(() => import("./setting/NatupointsApp"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <AuthProvider>
            <Route path="/user-pages/login" component={Login} />
            <Route path="/user-pages/register" component={Register} />
            <ProtectedRoute>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/basic-ui/buttons" component={Buttons} />
              <Route path="/basic-ui/dropdowns" component={Dropdowns} />
              <Route path="/basic-ui/typography" component={Typography} />
              <Route
                path="/form-Elements/basic-elements"
                component={BasicElements}
              />
              <Route path="/tables/basic-table" component={BasicTable} />
              <Route path="/icons/mdi" component={Mdi} />
              <Route path="/charts/chart-js" component={ChartJs} />
              <Route path="/error-pages/error-404" component={Error404} />
              <Route path="/error-pages/error-500" component={Error500} />
              {/* Afiliados */}
              <Route path="/affiliates/affiliate/:id" component={Affiliate} />

              {/* Empresas aliadas */}
              <Route
                path="/allied-companies/companies/:id"
                component={Companies}
              />
              <Route
                path="/allied-companies/newcompanies"
                component={NewCompanies}
              />
              <Route
                path="/allied-companies/moreinfo/:id"
                component={MoreInfo}
              />
              {/* admin */}
              <Route
                path="/administrative/administrative-portfolio"
                component={AdministrativePortfolio}
              />

              {/* statistics */}
              <Route
                path="/statistics/GraphPointsPerMonth"
                component={GraphPointsPerMonth}
              />
              <Route
                path="/statistics/GraphCompanyPoints"
                component={GraphCompanyPoints}
              />

              {/* reports */}
              <Route
                path="/reports/reportpointsbycity"
                component={ReportPointsByCity}
              />
              <Route
                path="/reports/reportpointsbycompanies"
                component={ReportPointsByCompanies}
              />
              <Route
                path="/reports/reportpointsforcustomers"
                component={ReportPointsForCustomers}
              />
              <Route path="/reports/datafire" component={DataFire} />

              {/* settings */}

              <Route path="/setting/createprofile" component={CreateProfile} />
              <Route
                path="/setting/dashboardsetting"
                component={DashboardSetting}
              />
              <Route path="/setting/natupointsapp" component={NatupointsApp} />
            </ProtectedRoute>
          </AuthProvider>
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
