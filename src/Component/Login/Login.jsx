import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import Img from "../../images/light-patten.svg";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";
import Style from "./Login.module.css";
import toast from "react-hot-toast";
export default function Login() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [errroMsg, setErrroMsg] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const {setToken,getUserData} = useContext(AuthContext)
  const userData = {
    email: "",
    password: "",
  };
  let validateSchema = Yup.object({
    email: Yup.string()
      .email("email is invalied")
      .required("email is required"), 
    password: Yup.string()
      .matches(/^[a-zA-Z0-9_-]{6,12}$/, "password is invalid")
      .required("password is required"),
  });
  async function submitRegister(values) {
    setIsLoading(true)
try{
 const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
if(data.message === "success"){
  // console.log("success",data);
  // console.log("Token: ",data.token);
  localStorage.setItem("token",data.token)
  
  setToken(data.token)
  getUserData()

  setIsSuccess(true)
 
  setTimeout(() => {
    setIsSuccess(false)
    navigate("/products")
  },1000)

  setIsLoading(false)
  toast.success("Login Success", {
    position: "top-right",
  })
}

  
}  catch(err){
    setErrroMsg(err.response.data.message)
    toast.error(err.response.data.message)
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


  return<>
  <Helmet>
      <title>Login</title>
    </Helmet>
   <section style={{ background: `url(${Img})` }}>
   <div className="m-auto w-75 p-5" >
          {isSuccess? <div className="alert alert-success text-center">Login Success</div>:""}
          {errroMsg? <div className="alert alert-danger text-center">{errroMsg}</div>:""}
        <h2 className="text-center text-main fw-bolder"> Login Now </h2>
        <form onSubmit={formik.handleSubmit}>
         
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

          <button className="btn bg-main d-block text-white mt-3 " type="submit">
            {isLoading?<Loader/>:"Login"}
          </button>
          <span><Link to={"/ForgetPassward"} className='mt-2 d-block me-auto text-emerald-600 text-main '>Forget Password?</Link> </span>

        </form>
      </div>
   </section>
  </>;
}
