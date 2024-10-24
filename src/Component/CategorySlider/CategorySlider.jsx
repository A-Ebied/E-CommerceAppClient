import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import Slider from "react-slick";
import axios from "axios";
import Style from "./CategorySlider.module.css";

export default function CategorySlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data } = useQuery("categorySlider", getCategories);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <Slider {...settings}>
        {data?.data.data.map((category, index) => (
          <div key={index}>
            <img
              height={200}
              src={category.image}
              alt={category.name}
              className="w-100"
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}

//CategorySlider
