import React from 'react'
import Style from './Categories.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import backGround from '../../images/light-patten.svg'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'


export default function Categories() {
    async function getCategories(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
       }
     
       let {isError , error , isLoading , isFetching , data } =  useQuery("FeaturedProducts", getCategories ,{
         refetchOnWindowFocus:false,
         refetchOnReconnect:false ,
        })  
  return <>
   <Helmet>
       <title>Categories</title>
    </Helmet>
    <section className='py-5' style={{backgroundImage:`url(${backGround})`}}>
    {
        isLoading && (
        <Spinner/>
        )
    }
      {
        isError&& (
          <div className="alert alert-danger">
            {error}
          </div>
        )
      }
      <div className="container p-5 my-5">
        <h2 className='fw-semibold text-main'>Categories </h2>
        <Link to={`/subcategories`} className='text-decoration-none text-black'><p>click <span className='text-main'>here</span> for SubCategories</p></Link>
        <div className="row my-4 gy-4">

        {data?.data.data.map((category,index)=>(
          <div key={index} className="col-md-4 text-center product rounded-5 cursor-pointer">
              <div className={`${Style.item} py-3`}>
                <img src={category.image} style={{height:'350px' ,width:'280px'}} className='img-fluid mb-2' alt={category.name} />
                <h4 className='fw-semibold my-2 '>{category.name}</h4>
              </div>
            </div>
        ))}
        </div>
      </div>
    </section>
  
  
  </>
}
