"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ImageCarousel = () => {
  const images = [
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_Dog_115-original._SY222__V1712351227_.jpeg",
      alt: "Slide 1",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_Cat_116-original._SY222__V1712351227_.jpeg",
      alt: "Slide 2",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_Horse_117-original._SY222__V1712351228_.jpeg",
      alt: "Slide 3",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_WildBird_152-original._SY222__V1712344939_.jpeg",
      alt: "Slide 4",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/1550254_2024_06_SE_Wildlife-Squirrel-NS2-Lifestyle._SY222__V1718218099_.jpeg",
      alt: "Slide 5",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_SmallPet_118-original._SY222__V1712351233_.jpeg",
      alt: "Slide 6",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_PetBird_119-original._SY222__V1712351234_.jpeg",
      alt: "Slide 7",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_Farm_120-original._SY222__V1712351235_.jpeg",
      alt: "Slide 8",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_Reptile_153-original._SY222__V1712344938_.jpeg",
      alt: "Slide 9",
    },
    {
      src: "https://image.chewy.com/catalog/cms/images/2024-ShopByPet-Refresh-NavTile_Fish_154-original._SY222__V1712344938_.jpeg",
      alt: "Slide 10",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      infinite={false}
      autoPlay
      autoPlaySpeed={3000}
      slidesToSlide={6}
      customTransition="transform 900ms ease-in-out"
      showDots={false}
      arrows={true}
    >
      {images.map((image, index) => (
        <div className="h-60">
          <div key={index} className="w-50 h-50">
            <img
              src={image.src}
              alt={image.alt}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
