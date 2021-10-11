import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";

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
          <a className="sidebar-brand brand-logo" href="index.html">
            <img
              src={require("../../assets/images/floater.png")}
              alt="logo"
              style={{ objectFit: "contain", width: "200px", height: "50px" }}
            />
          </a>
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            <img
              src={require("../../assets/images/floater.png")}
              alt="logo"
              style={{ objectFit: "contain", width: "30px" }}
            />
          </a>
        </div>
        <ul className="nav">
          <li
            className={
              this.isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-view-dashboard"></i>
              </span>
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/relatorios")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/relatorios">
              <span className="menu-icon">
                <i className="mdi mdi-file-document"></i>
              </span>
              <span className="menu-title">
                <Trans>Relatórios</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/basic-ui")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.basicUiMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("basicUiMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-crosshairs-gps"></i>
              </span>
              <span className="menu-title">
                <Trans>Boias</Trans>
              </span>
            </div>
          </li>
          <li
            className={
              this.isPathActive("/form-elements")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.formElementsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("formElementsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-marker-check"></i>
              </span>
              <span className="menu-title">
                <Trans>Missões</Trans>
              </span>
            </div>
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
