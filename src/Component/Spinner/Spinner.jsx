import React from "react";
import { RotatingLines } from "react-loader-spinner";
import Styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <>
      <div className="vh-100 bg-light bg-opacity-25 d-flex justify-content-center align-items-center">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
