import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

export default function Login(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const { history } = props;

  const handleLogin = (data) => {
    if (data.email === "admin@aquadata.com" && data.password === "12345") {
      history.push("/boias");
    } else {
      toast.error("E-mail ou senha errada! Tente novamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="bg-login">
      <form onSubmit={handleSubmit(handleLogin)}>
        <ToastContainer />
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
                      name="email"
                      style={{ color: "black" }}
                      label="E-mail"
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="E-mail"
                      size="lg"
                      className="h-auto"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      name="password"
                      label="Senha"
                      style={{ color: "black" }}
                      variant="outlined"
                      {...register("password", { required: true })}
                      type="password"
                      placeholder="Senha"
                      size="lg"
                      className="h-auto"
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                      style={{
                        backgroundColor: "#F9BB69",
                        borderColor: "#F9BB69",
                      }}
                      disableElevation
                    >
                      Entrar
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
