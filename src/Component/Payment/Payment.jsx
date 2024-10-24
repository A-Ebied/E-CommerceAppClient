import axios from "axios";
import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Img from "../../images/light-patten.svg";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import Style from "./Payment.module.css";

export default function Payment() {
  const { cartId, getLoggedCart, payment } = useContext(CartContext);
  const nav = useNavigate();

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkoutPayment,

  });

  // function confirmCashPayment() {
  //    axios.post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
  //       {
  //         shippingAddress: formik.values,
  //       },
  //       {
  //         headers: {
  //           token: localStorage.getItem("token"),
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.status === "success") {
  //         toast.success("Payment Success", {
  //           position: "top-right",
  //         });
  //         getLoggedCart();
  //         setTimeout(() => {
  //           nav("/products")
  //         },1500)
  //       }

  //     })
  //     .catch((err) => {
  //       toast.error("Payment Failed");
  //     });
  //   window.location.href = data.session.url;
  // }

  async function checkoutPayment(values) {
    const { data } = await payment(values);
    window.location.href = data.session.url;
  }

  return (
    <>
    <Helmet>
      <title>Payment</title>
    </Helmet>
      <div className="container p-4" style={{ background: `url(${Img})` }}>
        <h2 className="text-center text-main">CheckOut </h2>
        <form onSubmit={formik.handleSubmit} className="w-75 m-auto">
          <label htmlFor="text">Detalis :</label>
          <input
            value={formik.values.detalis}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control w-80 mt-2 mb-2"
            type="text"
            id="detalis"
            name="detalis"
          />

          <label htmlFor="text">City :</label>
          <input
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control w-80 mt-2 mb-2"
            type="text"
            id="city"
            name="city"
          />

          <label htmlFor="phone">Phone :</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control w-80 mt-2 mb-2"
            type="tel"
            id="phone"
            name="phone"
          />

          <button
            type="submit"
            className="btn bg-main d-block ms-auto text-white mt-2"
          >
            onlineOrder
          </button>
        </form>
      </div>
    </>
  );
}
