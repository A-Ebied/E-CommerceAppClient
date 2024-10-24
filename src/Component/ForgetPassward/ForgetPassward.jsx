import React, { useState } from "react";
import Style from "./ForgetPassward.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Img from "../../images/light-patten.svg";
import Loader from "../Loader/Loader";

export default function ForgetPassward() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleForget(values) {
    setIsLoading(true);
    const { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((res) => {
        setIsLoading(false);
        // console.log(res);
        toast.success(res.data.message);
        nav("/verifycode");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.data.message);
        console.log(err);
      });
  }

  const validate = Yup.object().shape({
    email: Yup.string().email("invild email").required("email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validate,
    onSubmit: handleForget,
  });
  return (
    <>
      <section style={{ background: `url(${Img})` }}>
        <div className="m-auto w-75 p-5">
          <h2 className=" text-main fw-bolder">Forget Password </h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email :</label>
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

            <button
              type="submit"
              className="btn bg-main d-block ms-auto text-white mt-3"
            >
              {isLoading ? <Loader /> : "Reset Code"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
