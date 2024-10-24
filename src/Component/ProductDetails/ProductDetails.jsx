import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import Style from "./ProductDetails.module.css";

export default function ProductDetails() {
  const { id } = useParams();
  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { addProductToCart, addProdToWishList,count , setcount } =
    useContext(CartContext);
  const [liked, setLiked] = useState(false);
  const [wishListId, setwishListId] = useState(0);

  async function addToCart(productId) {
    const res = await addProductToCart(productId);
    console.log(res);
    if (res.data.status == "success") {
      toast.success(res.data.message, {
        position: "top-right",
      });
    } else {
      toast.error(res.data.message, {
        position: "top-right",
      });
    }
  }

  async function addTowishlist(id) {
    setwishListId(id);
    setLiked(!liked);
    const response = await addProdToWishList(id);
    console.log(response);
    if (response.data.status == "success") {
      setcount(count + 1);
      toast.success(response.data.message, { position: "top-right" });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
      });
    }
  }
  const { data, isLoading, isError } = useQuery(
    `productDetails-${id}`,
    getProductDetails
  );

  const productDetails = data?.data.data;

  if (isError) {
    return <Navigate to="/products" />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  
  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row py-5 align-items-center">
            <div className="col-md-3">
              <Slider {...settings}>
                {productDetails.images.map((img, index) => {
                  return (
                    <img
                      key={index}
                      className="w-100"
                      src={img}
                      alt={img.title}
                    />
                  );
                })}
              </Slider>
            </div>
            <div className="col-md-9">
              <h2 className="h3 fw-bolder">{productDetails.title}</h2>
              <p className="text-muted">{productDetails.description}</p>
              <h6 className="text-dark">{productDetails.category.name}</h6>
              <div className="d-flex justify-content-between my-3">
                <span>
                  <h6 className="text-dark">{productDetails.price} EGP</h6>
                </span>
                <span>
                  <i className="fa fa-solid fa-star rating-color"></i>{" "}
                  {productDetails.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => addToCart(productDetails._id)}
                className=" btn bg-main w-100 text-white"
              >
                 <i className="fas fa-shopping-cart me-2 fa-lg"></i>
                 Add to Cart
              </button>
              <button
                onClick={() => addTowishlist(productDetails._id)}
                className=" mt-5 btn text-white bg-danger w-100"
              >
                <span className="rating-color">
                  <i className="fas fa-star fa-2 me-2 fa-lg"></i>
                </span>
                Add to Wishlist{" "}

              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
