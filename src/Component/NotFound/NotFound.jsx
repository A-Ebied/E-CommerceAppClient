import React from "react";
import { Helmet } from "react-helmet";
import Style from "./NotFound.module.css";
import Img from "../../images/error.svg";


export default function NotFound() {
  return <>
  <Helmet>
      <title>404 Not Found</title>
    </Helmet>
    <div className="d-flex justify-content-center align-items-center">
      <img src={Img} alt="NotFound" className="w-50" />
    </div>
  </>;
}
