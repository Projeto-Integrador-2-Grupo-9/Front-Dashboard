import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export class Login extends Component {
  render() {
    return (
      <div className="bg-login">
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require("../../../assets/images/acqua.png")}
                    alt="logo"
                  />
                </div>
                <h4>Olá! Seja bem vindo(a) !</h4>
                <h6 className="font-weight-light">Entre para continuar</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      placeholder="E-mail"
                      size="lg"
                      className="h-auto"
                      style={{ color: "black" }}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      size="lg"
                      className="h-auto"
                      style={{ color: "black" }}
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Link
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      to="/dashboard"
                      style={{
                        backgroundColor: "#F9BB69",
                        borderColor: "#F9BB69",
                      }}
                    >
                      Entrar
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
