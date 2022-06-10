import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
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
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/affiliate', state: 'affiliateMenuOpen' },
      { path: '/allied-companies', state: 'companiesMenuOpen' },
      { path: '/admin', state: 'adminMenuOpen' },
      { path: '/statistics', state: 'statisticsMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../../assets/images/faces/face15.jpg')} alt="profile" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal"><Trans>Andres</Trans></h5>
                  <span><Trans>ADMINISTRADOR</Trans></span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>To-do list</Trans></p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navegacion</Trans></span>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>
          {/*           
          <li className={this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li> */}

          {/* Lista de afiliados */}

          <li className={this.isPathActive('/affiliate') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.AffiliateMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('AffiliateMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-account-multiple"></i>
              </span>
              <span className="menu-title"><Trans>Afiliados</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.AffiliateMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/affiliates/affiliate') ? 'nav-link active' : 'nav-link'} to="/affiliates/affiliate"><Trans>Lista de afiliados</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/affiliates/newaffiliate') ? 'nav-link active' : 'nav-link'} to="/affiliates/newaffiliate"><Trans>Nuevo afiliados</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Empresas aliadas */}

          <li className={this.isPathActive('/allied-companies') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.companiesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('companiesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-table-column-plus-after"></i>
              </span>
              <span className="menu-title"><Trans>Empresas aliadas</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.companiesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/allied-companies/companies') ? 'nav-link active' : 'nav-link'} to="/allied-companies/companies"><Trans>Lista De Empresa</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/allied-companies/newcompanies') ? 'nav-link active' : 'nav-link'} to="/allied-companies/newcompanies"><Trans>Nueva empresa</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/allied-companies/pursecompanies') ? 'nav-link active' : 'nav-link'} to="/allied-companies/pursecompanies"><Trans>Cartera</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Administrativo */}


          <li className={this.isPathActive('/admin') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.adminMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('adminMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-account-key"></i>
              </span>
              <span className="menu-title"><Trans>Administrativo</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.adminMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/admin/accountingcontrol') ? 'nav-link active' : 'nav-link'} to="/admin/accountingcontrol"><Trans>Control Contable</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/admin/administrativeportfolio') ? 'nav-link active' : 'nav-link'} to="/admin/administrativeportfolio"><Trans>Cartera</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/admin/config') ? 'nav-link active' : 'nav-link'} to="/admin/config"><Trans>Configuracion</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Estadisticas */}

          <li className={this.isPathActive('/statistics') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.statisticsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('statisticsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-poll"></i>
              </span>
              <span className="menu-title"><Trans>Estadisticas</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.statisticsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/statistics/biweeklyreport') ? 'nav-link active' : 'nav-link'} to="/statistics/biweeklyreport"><Trans>Reporte quincenal</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/statistics/monthlyreport') ? 'nav-link active' : 'nav-link'} to="/statistics/monthlyreport"><Trans>Reporte Mensual</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* <li className="nav-item nav-category">
            <span className="nav-link"><Trans>More</Trans></span>
          </li>
          <li className={this.isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('errorPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.errorPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title"><Trans>Documentation</Trans></span>
            </a>
          </li> */}
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
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);