import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Products from "./Component/Products/Products";
import NotFound from "./Component/NotFound/NotFound";
import { AuthContextProvider } from "./Context/AuthContext";
import Cart from "./Component/Cart/Cart";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Component/Payment/Payment";
import AllOrders from "./Component/AllOrders/AllOrders";
import Brands from "./Component/Brands/Brands";
import Profile from "./Component/Profile/Profile";
import { Offline } from "react-detect-offline";
import Categories from "./Component/Categories/Categories";
import SubCategories from "./Component/SubCategories/SubCategories";
import ForgetPassward from "./Component/ForgetPassward/ForgetPassward";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import VerifyCode from "./Component/VerifyCode/VerifyCode";
import WishList from "./Component/WishList/WishList";

// createHashRouter => Server Side Rendering
// createBrowserRouter => Client Side Rendering
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "ForgetPassward", element: <ForgetPassward /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "verifycode", element: <VerifyCode /> },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "whishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "subcategories",
        element: (
          <ProtectedRoute>
            <SubCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  //react-query handles async states
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>

      <Offline>
        <div className="fixed-bottom p-3 bg-light w-100">
          <h6 className="text-dark">
            <span className="text-danger">
              <i class="fa-solid fa-wifi"></i>
            </span>{" "}
            No Internet Connection (surprise!)
          </h6>
        </div>
      </Offline>
    </>
  );
}
