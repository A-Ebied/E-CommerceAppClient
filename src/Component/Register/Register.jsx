import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Img from "../../images/light-patten.svg";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Style from "./Register.module.css";

export default function Register() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [errroMsg, setErrroMsg] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let validateSchema = Yup.object({
    name: Yup.string()
      .min(3, "name minLength is 3")
      .max(10, "name maxLength is 10")
      .required("name is required"),
    email: Yup.string()
      .email("email is invalied")
      .required("email is required"),
    phone: Yup.string()
      .matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "phone is invalid ")
      .required("phone is required"),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9_-]{6,12}$/, "password is invalid")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword not match")
      .required("rePassword is required"),
  });
  async function submitRegister(values) {
    setIsLoading(true)
try{
 const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
  // console.log("success",data);
  setIsSuccess(true)
  setTimeout(() => {
    setIsSuccess(false)
    navigate("/login")
  },2000)
  setIsLoading(false)
}  catch(err){
  // console.log("error",err);
    setErrroMsg(err.response.data.message)
    setTimeout(() => {
      setErrroMsg(undefined)
      setIsLoading(false)
    },2000)
}

      
  }
  const formik = useFormik({
    initialValues: userData,
    validationSchema: validateSchema,
    onSubmit:submitRegister
  });
  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <section  style={{ background: `url(${Img})` }}>
    <div className="m-auto w-75 p-5">
          {isSuccess? <div className="alert alert-success text-center">Congratulations your account has been created.</div>:""}
          {errroMsg? <div className="alert alert-danger text-center">{errroMsg}</div>:""}
        <h2 className="text-center text-main fw-bolder">Register Now </h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            placeholder="name"
            type="text"
            id="name"
            name="name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-danger mt-2">{formik.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email :</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            placeholder="email"
            type="email"
            id="email"
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger mt-2">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="phone">Phone :</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            placeholder="phone"
            type="text"
            id="phone"
            name="phone"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="alert alert-danger mt-2">{formik.errors.phone}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password :</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            placeholder="password"
            type="password"
            id="password"
            name="password"
          />

          {formik.touched.password && formik.errors.password ? (
            <div className="alert alert-danger mt-2">{formik.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword :</label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            placeholder="rePassword"
            type="password"
            id="rePassword"
            name="rePassword"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="alert alert-danger mt-2">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}

          <button className="btn bg-main d-block text-white mt-2 " type="submit">
            {isLoading?<Loader/>:"Register"}
          </button>
          <span><Link to={"/login"} className='mt-2 d-block me-auto text-emerald-600 text-main '>Login Now </Link> </span>

        </form>
      </div>
    </section>
    </>
  );
}
