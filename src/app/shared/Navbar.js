import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }
  render() {
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img
              src={require("../../assets/images/logo-mini.svg")}
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <span className="mdi mdi-menu" style={{ color: "#1e2a31" }}></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <Dropdown alignRight as="li" className="nav-item d-none d-lg-block">
              {/*   <Dropdown.Toggle className="nav-link btn btn-success create-new-button no-caret">
                + <Trans>Create New Project</Trans>
                </Dropdown.Toggle> */}

              <Dropdown.Menu className="navbar-dropdown preview-list create-new-dropdown-menu">
                <h6 className="p-3 mb-0">
                  <Trans>Projects</Trans>
                </h6>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-file-outline text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>Software Development</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-web text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>UI Development</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-layers text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>Software Testing</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center">
                  <Trans>See all projects</Trans>
                </p>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
