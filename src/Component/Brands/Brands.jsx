import axios from "axios";
import React from "react";
import styles from './Brands.module.css';

import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import backGround from '../../images/light-patten.svg'
import Spinner from "../Spinner/Spinner";

export default function Brands() {
    async function getBrands(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
       }
     
       let {isError , error , isLoading , isFetching , data } =  useQuery("FeaturedProducts", getBrands ,{
         refetchOnWindowFocus:false,
         refetchOnReconnect:false ,
        })  
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <section
        className="py-5 "
        style={{ backgroundImage: `url(${backGround})` }}
      >
        {isLoading && <Spinner />}
        {isError && <div className="alert alert-danger">{error}</div>}
        <div className="container p-5 my-5">
          <h2 className="fw-bold px-md-5  text-main h1 ">Brands</h2>
          <div className="row my-4 gy-4">
            {data?.data.data.map((category,index) => (
              <div key={index} className="col-md-4 brand text-center product rounded-5 cursor-pointer ">
                <div className={`${styles.item} py-3`}>
                  <img
                    src={category.image}
                    style={{ height: "350px", width: "280px" }}
                    className="img-fluid mb-2"
                    alt={category.name}
                  />
                  <h4 className="fw-semibold my-2 ">{category.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
