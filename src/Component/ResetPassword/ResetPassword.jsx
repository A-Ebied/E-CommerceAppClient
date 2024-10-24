import React, { useState } from "react";
import Style from "./ResetPassword.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Img from "../../images/light-patten.svg";
import Spinner from "../Spinner/Spinner";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function handleNewPassword(values) {
    setIsLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        localStorage.setItem("userToken", res.data.token);
        toast.success("Welcome Back To Home..");
        navigate(`/login`);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error(err.response?.data.message);
      });
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invaild Email").required("Email is Required"),
    newPassword: Yup.string()
      .matches(/^[A-Za-z0-9]{6,10}$/, "invaild Password")
      .required("New Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleNewPassword(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <section style={{ background: `url(${Img})` }}>
       <div className="m-auto w-75 p-5">

       <h1 className=" text-main fw-bolder">Reset Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="form-control mt-2"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="newPassword">NewPassword : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            type="password"
            name="newPassword"
            id="newPassword"
            className="form-control mt-2"
            placeholder=" "
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger mt-2">{formik.errors.newPassword}</div>
          ) : null}
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main d-block ms-auto text-white mt-3"
            >
              {isLoading ? <Loader/> : "Done"}
            </button>
        </form>
       </div>
      </section>
    </>
  );
}
