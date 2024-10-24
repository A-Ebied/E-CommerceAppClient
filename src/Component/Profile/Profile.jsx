import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../Spinner/Spinner";
import { Helmet } from "react-helmet";
import Style from "./Profile.module.css";
import Img from "../../images/light-patten.svg";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  return (
    <>
    <Helmet>
      <title>Profile</title>
    </Helmet>
      <section className="py-5" style={{ backgroundImage: `url(${Img})` }}>
      {userData ? (
        <div className="m-5 bg-light py-3 px-5 rounded-5">
          <h1 className="text-main">Profile Page</h1>
          <h3 className=" mt-2"> Welcome {userData?.name}</h3>
          <h3 className="mt-2"> Role {userData?.role}</h3>
        </div>
      ) : (
        <Spinner />
      )}
      </section>
    </>
  );
}
