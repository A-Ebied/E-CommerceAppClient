import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Img from "../../images/light-patten.svg";
import { Helmet } from "react-helmet";
import Style from "./Cart.module.css";


export default function Cart() {

  const {
    numOfCartItems,
    setNumOfCartItems,
    allProducts,
    totalCartPrice,
    updateCartProduct,
    getLoggedCart,
    deleteCartItems,
    clearCart,
  } = useContext(CartContext);
  const [DetailCart, setDetailCart] = useState(null);

  //Update Count Product
  async function updateProduct(id, count) {
    const response = await updateCartProduct(id, count);
    // console.log(response.data);
    if (response.data.status == "success") {
      setDetailCart(response.data.data);
      toast.success("Success items ", {
        position: "top-right",
      });
    } else {
      toast.error("Failed items", {
        position: "top-right",
      });
    }
  }

  // Get Product
  async function getCartItems() {
    const response = await getLoggedCart();

    if (response.data.status == "success") {
      // console.log(response.data.data);
      setDetailCart(response.data.data);
    }
  }
  // Delete Product
  async function deleteItems(productId) {
    const response = await deleteCartItems(productId);
    // console.log(response.data.data);
    if (response.data.status == "success") {
      setNumOfCartItems(numOfCartItems - 1);
      setDetailCart(response.data.data);
      toast.success("Success Delete Items", {
        position: "top-right",
      });
    } else {
      toast.error("Failed Delete Items", {
        position: "top-right",
      });
    }
  }
  // Clear All Items
  async function clearAllItems() {
    const response = await clearCart();
    if (response.data.status !== "success") {
      setNumOfCartItems(0);
      setDetailCart(null);
      toast.success("Success Delete All Items", {
        position: "top-right",
      });
    } else {
      toast.error("Failed Delete All Items", {
        position: "top-right",
      });
    }
  }

    
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
    <Helmet>
      <title>Shop Cart</title>
    </Helmet>
      <div className="container py-3 mt-3 rounded-4 " style={{ background: `url(${Img})` }} >
        <h2 className="text-main mt-3">Shop Cart</h2>
        <h5 className="text-main mt-2 position-relative ">
          Total Cart Price:{" "}
          <span className="text-dark">{totalCartPrice} EGP</span>{" "}
          <button
            className="btn btn-outline-danger position-absolute end-0"
            onClick={() => clearAllItems()}
          >
            Clear All
          </button>
        </h5>
        {allProducts ? (
          allProducts?.map((product, index) => (
            <div
              key={index}
              className="row border-1 border-bottom border-danger py-2 align-items-center"
            >
              <div className="col-md-1">
                <figure>
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt={product.product.title}
                  />
                </figure>
              </div>
              <div className="col-md-9">
                <article>
                  <h3>{product.product.title}</h3>
                  <h5 className="text-main">Price : {product.price} EGP</h5>
                  <button
                    onClick={() => deleteItems(product.product.id)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                </article>
              </div>
              <div className="col-md-2">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={() =>
                      updateProduct(product.product.id, product.count + 1)
                    }
                    className="btn btn-outline-success "
                  >
                    +
                  </button>
                  <p>{product.count}</p>
                  <button
                    disabled={product.count == 1}
                    onClick={() =>
                      updateProduct(product.product.id, product.count - 1)
                    }
                    className="btn btn-outline-success "
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
        <Link to='/payment'>
        <button className="btn bg-main text-white  w-100 mt-3">Payment</button>
        </Link>
      </div>
    </>
  );
}
