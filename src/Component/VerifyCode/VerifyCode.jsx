import React, { useState } from "react";
import Style from "./VerifyCode.module.css";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  function handleCode(values) {
    setisLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => {
        setisLoading(false);
        console.log(res);
        // localStorage.setItem("userToken", res.data.token);
        toast.success("Go To reset password");
        navigate("/resetpassword");
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err);
        toast.error(err.response?.data.message);
      });
  }

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .matches(/^[0-9]{6}$/, "invaild OTP")
      .required("Reset Code is Required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleCode(values);
    },
  });

  return (
    <>
    <Helmet>
      <title>Verify Code</title>
    </Helmet>
      <section>
        <div className="m-auto w-75 p-5">
          <h2 className=" text-main fw-bolder">verification code</h2>
          <form onSubmit={formik.handleSubmit}>

            <label htmlFor="resetCode" />
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.resetCode}
                type="text"
                name="resetCode"
                id="resetCode"
                className="form-control mt-2"
                placeholder=" "
              />
              {formik.errors.resetCode && formik.touched.resetCode ? (
                <div className="alert alert-danger mt-2">{formik.errors.resetCode}</div>
              ) : null}
              <button
                type="submit"
                className="btn bg-main d-block ms-auto text-white mt-3"
              >
                {isLoading ? <Loader /> : "Reset"}
              </button>
          </form>
        </div>
      </section>
    </>
  );
}
