import React from "react";
import { LineWave } from "react-loader-spinner";
import Styles from "./Loader.module.css";

export default function Loader() {
  return (
    <>
      <LineWave
        visible={true}
        height="35"
        width="35"
        color="#f1f1ff"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </>
  );
}
