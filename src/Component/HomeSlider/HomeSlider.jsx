import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Style from "./HomeSlider.module.css";
export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };
  return (
    <>

<div className="row g-0">
      <div className="col-md-9">
        <Slider {...settings}>
          <img src={require("../../images/slider-image-1.jpeg")} height={400} alt="" className="w-100" />
          <img src={require("../../images/slider-image-2.jpeg")} height={400} alt="" className="w-100" />
          <img src={require("../../images/slider-image-3.jpeg")} height={400} alt="" className="w-100" />
          <img src={require("../../images/slider-2.jpeg")} height={400} alt="" className="w-100" />
        </Slider>
      </div>
      <div className="col-md-3">
        <img src={require("../../images/slider-image-2.jpeg")} height={200} alt="" className="w-100" />
        <img src={require("../../images/slider-image-1.jpeg")} height={200} alt="" className="w-100" />
      </div>
    </div>


    </>
  );
}
//HomeSlider
