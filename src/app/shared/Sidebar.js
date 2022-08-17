import React, { Component } from "react";
import { Collapse, Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import ProfileSidebar from "../../components/ProfileSidebar";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/affiliate", state: "affiliateMenuOpen" },
      { path: "/allied-companies", state: "companiesMenuOpen" },
      { path: "/administrative", state: "administrativeMenuOpen" },
      { path: "/statistics", state: "statisticsMenuOpen" },
      { path: "/reports", state: "reportsMenuOpen" },
      { path: "/settings", state: "settingsMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <Link className="sidebar-brand brand-logo" to="/dashboard">
            <img src={require("../../assets/images/logo.svg")} alt="logo" />
          </Link>
          <Link className="sidebar-brand brand-logo-mini" to="/dashboard">
            <img
              src={require("../../assets/images/logo-mini.svg")}
              alt="logo"
            />
          </Link>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <ProfileSidebar />
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        Account settings
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        Change Password
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        To-do list
                      </p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link">Navegacion</span>
          </li>
          {/* Dashboard */}
          <li
            className={
              this.isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>

          {/* Lista de afiliados */}

          <li
            className={
              this.isPathActive("/affiliate")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.AffiliateMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("AffiliateMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-account-multiple"></i>
              </span>
              <span className="menu-title">Afiliados</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.AffiliateMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/affiliates/affiliate")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/affiliates/affiliate/list"
                    >
                      Lista de afiliados
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Empresas aliadas */}

          <li
            className={
              this.isPathActive("/allied-companies")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.companiesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("companiesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-table-column-plus-after"></i>
              </span>
              <span className="menu-title">Empresas aliadas</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.companiesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/allied-companies/newcompanies")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/allied-companies/newcompanies"
                    >
                      Nueva empresa
                    </Link>
                  </li>

                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/allied-companies/companies")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/allied-companies/companies/list"
                    >
                      Lista de empresa
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Administrativo */}

          <li
            className={
              this.isPathActive("/administrative")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.administrativeMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("administrativeMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-account-key"></i>
              </span>
              <span className="menu-title">Administrativo</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.administrativeMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive(
                          "/administrative/administrative-portfolio"
                        )
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/administrative/administrative-portfolio"
                    >
                      Cartera
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Estadisticas */}

          <li
            className={
              this.isPathActive("/statistics")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.statisticsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("statisticsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-poll"></i>
              </span>
              <span className="menu-title">Estadisticas</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.statisticsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/statistics/GraphPointsPerMonth")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/statistics/GraphPointsPerMonth"
                    >
                      Puntos por mes
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/statistics/GraphCompanyPoints")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/statistics/GraphCompanyPoints"
                    >
                      Puntos de empresas
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Reportes */}
          <li
            className={
              this.isPathActive("/reports")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.reportsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("reportsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-calendar-text-outline"></i>
              </span>
              <span className="menu-title">Reportes</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.reportsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/reports/reportpointsforcustomers")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/reports/reportpointsforcustomers"
                    >
                      Puntos por clientes
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/reports/reportpointsbycompanies")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/reports/reportpointsbycompanies"
                    >
                      Puntos por empresas
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/reports/reportpointsbycity")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/reports/reportpointsbycity"
                    >
                      Puntos por ciudad
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/reports/OverallHistory")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/reports/OverallHistory"
                    >
                      Historial general
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/reports/historytable")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/reports/historytable"
                    >
                      Tabla historial general
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Configuracion */}

          <li
            className={
              this.isPathActive("/settings")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.settingsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("settingsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-settings"></i>
              </span>
              <span className="menu-title">Configuracion</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.settingsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/setting/createprofile")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/setting/createprofile"
                    >
                      Crear perfil
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/setting/dashboardsetting")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/setting/dashboardsetting"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/setting/dashboardsetting")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/setting/listprofile/list"
                    >
                      Lista de perfiles
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
