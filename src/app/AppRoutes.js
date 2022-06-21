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
const NewAffiliate = lazy(() => import("./affiliates/NewAffiliate"));

// Empresas Aliadas
const Companies = lazy(() => import("./allied-companies/Companies"));
const PurseCompanies = lazy(() => import("./allied-companies/PurseCompanies"));
const NewCompanies = lazy(() => import("./allied-companies/NewCompanies"));

//admin
const Admin = lazy(() => import("./admin/Reports"));
const AdministrativePortfolio = lazy(() =>
  import("./admin/AdministrativePortfolio")
);
const Config = lazy(() => import("./admin/Config"));

// statistics
const GraphPointsPerMonth = lazy(() => import("./statistics/GraphPointsPerMonth"));
const GraphCompanyPoints = lazy(() => import("./statistics/GraphCompanyPoints"));

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
              <Route path="/affiliates/newaffiliate" component={NewAffiliate} />
              {/* Empresas aliadas */}
              <Route path="/allied-companies/companies/:id" component={Companies} />
              <Route
                path="/allied-companies/newcompanies"
                component={NewCompanies}
              />
              <Route
                path="/allied-companies/pursecompanies"
                component={PurseCompanies}
              />
              {/* admin */}
              <Route path="/admin/reports" component={Admin} />
              <Route
                path="/admin/administrativeportfolio"
                component={AdministrativePortfolio}
              />
              <Route path="/admin/config" component={Config} />
              {/* statistics */}
              <Route
                path="/statistics/GraphPointsPerMonth"
                component={GraphPointsPerMonth}
              />
              <Route path="/statistics/GraphCompanyPoints" component={GraphCompanyPoints} />
            </ProtectedRoute>
          </AuthProvider>
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
