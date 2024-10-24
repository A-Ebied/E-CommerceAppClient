import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { isFluxStandardAction } from "@reduxjs/toolkit";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartId, setcartId] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [count, setcount] = useState(0);
  const { token } = useContext(AuthContext);
  
  //Add Product To Cart
  async function addProductToCart(productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setAllProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setcartId(res.data.data._id);
        localStorage.setItem("userID", res.data.data.cartOwner);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartProduct(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setAllProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return res;
      })
      .catch((err) => err);
  }

  function deleteCartItems(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setAllProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return res;
      })
      .catch((err) => err);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNumOfCartItems(0);
        setAllProducts([]);
        setTotalCartPrice(0);
        return res;

        return res;
      })
      .catch((err) => err);
  }

  function payment(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:3000",
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function addProdToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data.numOfCartItems);
        setcount(res.data.count);
        return res;
      })
      .catch((err) => err);
  }
  function deleteWishListItems(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        deleteCartItems,
        clearCart,
        updateCartProduct,
        getLoggedCart,
        cartId,
        totalCartPrice,
        allProducts,
        numOfCartItems,
        setNumOfCartItems,
        addProdToWishList,
        getLoggedWishList,
        deleteWishListItems,
        count,
        setcount,
        payment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
