import React, {useEffect, useState } from 'react'
import Img from '../../images/light-patten.svg'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';
import Style from "./AllOrders.module.css";
import Spinner from '../Spinner/Spinner';
import { useQuery } from 'react-query';


export default function GetAllOrders() {
  const[orders,setOrders]= useState(null)
  const token  = localStorage.getItem("token"); 
  const {id} = jwtDecode(token); 
  
  async function GetAllOrders(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
   }
  let {isError , error , isLoading , isFetching , data } = useQuery("Orders", GetAllOrders ,{
    refetchOnWindowFocus:false,
    refetchOnReconnect:false ,
   })  
  
  return <>
    <Helmet>
       <title>All Orders</title>
    </Helmet>
    <section className='py-5' style={{backgroundImage:`url(${Img})`}}>
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
        <div className="container p-5">
          <h2 className='fw-semibold text-main'>MyOrders</h2>

          {data?.data.map((order,index)=> (
            <div key={index} className="row my-3 p-3 border border-2 rounded-3">
             <div className="details d-flex  justify-content-between">
              <div className="main">
              <h3 className='h6 fw-semibold'>Payment Method :  {order.paymentMethodType}</h3>
              <h3 className='h6 fw-semibold '>Total Order Price :  <span className='text-main'>{order.totalOrderPrice} EGP</span></h3>
              </div>
              <div className="secondary">
                
              {order.shippingAddress &&<h3 className='h6 fw-semibold'>Delivered To :  {order.shippingAddress.city}</h3>}
              </div>
             </div>
              {order.cartItems.map((item,index)=> (
                <div key={index} className='col-md-2  p-0 m-0 my-3 my-md-1 ' >
                <div className="item m-md-1 ">
                <img src={item.product.imageCover} className='img-fluid mb-1' alt="" />
                  <h4 className='fs-6 ps-2 text-main fw-bold mb-2'>{item.product.category.name}</h4>
                  <h4 className='fs-6 ps-2 fw-bold mb-2'>{(item.product.title).split(' ').slice(0,4).join(' ')}</h4>
                </div>
                </div>
              ))}
            </div>
          ))}
        </div>
    </section>

</>


}
