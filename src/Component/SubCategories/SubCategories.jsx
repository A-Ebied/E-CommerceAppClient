import React from 'react'
import Style from './SubCategories.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Helmet } from 'react-helmet';
import backGround from '../../images/light-patten.svg'
export default function SubCategories() {
    async function getSubCategories() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`);
      }
    
      const { isError, error, isLoading, isFetching, data } = useQuery(
        "FeaturedProducts",
        getSubCategories,
        {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        }
      );    
  return <>
     <Helmet>
        <title>Categories</title>
      </Helmet>
      <section
        className="py-5 cursor-pointer "
        style={{ backgroundImage: `url(${backGround})` }}
      >
        {isLoading && <Spinner />}
        {isError && <div className="alert alert-danger ">{error}</div>}
        <div className="container p-5 my-5">
          <h2 className="fw-semibold text-main">Sub Categories</h2>
          <div className="row my-4 gy-4">
            {data?.data.data.map((cat,index) => (
              <div key={index} className="col-md-4 text-center brand">
                <div className={`${Style.item} py-3`}>
                  <h4 className="fw-semibold my-2 ">{cat.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  
  </>
}
