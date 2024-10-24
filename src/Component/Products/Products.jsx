import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import Style from "./Products.module.css";
import Img from "../../images/light-patten.svg";

export default function Products() {
  // const [allProducts, setAllProducts] = useState(null);
  let {
    addProductToCart,
    numOfCartItems,
    setNumOfCartItems,
    addProdToWishList,
    count,
    setcount,
  } = useContext(CartContext);
  const [liked, setLiked] = useState(false);
  const [wishListId, setwishListId] = useState(0);
  async function addToCart(productId) {
    let res = await addProductToCart(productId);
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
    let response = await addProdToWishList(id);
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
  const { data, isLoading, refetch, isError, error } = useQuery(
    "allProducts",
    getAllProducts,
    {
      // refetchOnMount: false
      // refetchInterval: 5000
      // cacheTime: 5000
      // enabled: false
    }
  );
  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    // axios.get("https://ecommerce.routemisr.com/api/v1/products")
    //   .then((res) => {
    //     setAllProducts(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className="container py-5"
          style={{ backgroundImage: `url(${Img})` }}
        >
          {/*HomeSlider */}
          <div className="row gx-0 mb-5">
            <HomeSlider />
          </div>
          {/* CategorySlider */}
          <CategorySlider />

          <div className="row gy-4 mt-3">
            {data.data.data.map((product, index) => (
              <div
                key={index}
                className="col-md-2 product rounded-2 cursor-pointer"
              >
                <div
                  onClick={() => addTowishlist(product.id)}
                  className="cursor-pointer"
                >
                  {liked && wishListId == product.id ? (
                    <i
                      className="fa-solid fa-heart fa-lg mt-3 "
                      style={{ color: "#d92020" }}
                    />
                  ) : (
                    <i className="fa-regular fa-heart fa-lg mt-3" />
                  )}
                </div>
                <Link to={`/productdetails/${product._id}`}>
                  <div className="products">
                    {/* {imageCover} */}
                    <img
                      src={product.imageCover}
                      className="w-100"
                      alt={product.title}
                    />
                    <h3 className="h6 text-main">{product.category.name}</h3>
                    <h2 className="h6 text-center">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="d-flex justify-content-between align-items-center my-3">
                      {product.priceAfterDiscount ? (
                        <p>
                          <span className="text-decoration-line-through text-danger ">
                            {product.price} EGP
                          </span>{" "}
                          -{" "}
                          <span className="">
                            {product.priceAfterDiscount} EGP
                          </span>
                        </p>
                      ) : (
                        <span>{product.price} EGP</span>
                      )}
                      <p>
                        <span className="rating-color">
                          <i className="fas fa-star fa-2 "></i>
                        </span>{" "}
                        {product.ratingsAverage}{" "}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(product._id)}
                  className="btn bg-main w-100 text-white text-center m-2"
                >
                  Add To Cart +{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
