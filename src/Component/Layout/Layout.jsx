import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Style from './Layout.module.css'

export default function Layout() {
  return <>

  <Navbar/>
  <Outlet/>
  <Footer/>
  
  </>
}
