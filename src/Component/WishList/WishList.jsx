import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";
import Spinner from "../Spinner/Spinner";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import backGround from "../../images/light-patten.svg";
import toast from "react-hot-toast";

export default function WishList() {
  const { getLoggedWishList, deleteWishListItems, count, setcount } =
    useContext(CartContext);
  const [DetailWishList, setDetailWishList] = useState(null);
  const { addProductToCart, numOfCartItems, setNumOfCartItems } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);


  async function addToCart(id) {
    const response = await addProductToCart(id);
    if (response.data.status == "success") {
      setNumOfCartItems(numOfCartItems + 1);
      toast.success(response.data.message, {
        position: "top-right",
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
      });
    }
  }

  async function getWishListItems() {
    const response = await getLoggedWishList();

    if (response.data.status == "success") {
      // console.log(response.data);
      setDetailWishList(response.data.data);
    }
  }

  async function deleteItems(productId) {
    const response = await deleteWishListItems(productId);
    // console.log(response.data.data);
    if (response.data.status == "success") {
      setcount(count - 1);
      setDetailWishList(response.data.data);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getWishListItems();
  }, [DetailWishList]);
  
  return (
    <>
      <section
        className="py-5"
        style={{ backgroundImage: `url(${backGround})` }}
      >
        {!isLoading && <Spinner />}
        <div className="container py-5 px-5">
          <h2 className="fw-semibold text-main">Shopping WhishList</h2>

          <Helmet>
            <title>WhishList</title>
          </Helmet>

          {DetailWishList ? (
            <section className="py-5">
              {DetailWishList?.map((data, index) => (
                <div
                  key={index}
                  className="row border border-2 py-3 my-3 align-items-center rounded-3"
                >
                  <div className="col-md-2">
                    <figure>
                      <img
                        className="img-fluid"
                        src={data.imageCover}
                        alt={data.title}
                      />
                    </figure>
                  </div>
                  <div className="col-md-9 col-lg-8">
                    <h3 className="h5 fw-bold">{data.title}</h3>
                    <h4 className=" text-main fs-5 fw-semibold mb-3">
                      {data.price} EGP
                    </h4>
                    
                  </div>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn w-25 btn-danger "
                      onClick={() => deleteItems(data.id)}
                    >
                      <i className="fa fa-trash me-2"></i> Remove
                    </button>
                    <button
                      className="btn w-25 btn-success "
                      onClick={() => addToCart(data.id)}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <h3 className="my-5">
              There is no Products in your Cart Tap{" "}
              <Link className="text-decoration-none text-main" to={"/"}>
                here
              </Link>{" "}
              to continue shopping
            </h3>
          )}
        </div>
      </section>
    </>
  );
}
