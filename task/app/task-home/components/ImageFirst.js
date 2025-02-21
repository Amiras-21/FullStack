// "use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default function ImageFirst() {
  return (
    <div className="h-75 w-full">
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          mx: "auto",
          width: "98%",
          minHeight: { xs: 250, sm: 300, md: "auto" },
        }}
      >
        <Carousel
          infiniteLoop
          autoPlay
          showThumbs={false}
          showStatus={false}
          arrows={true}
        >
          {[
            "https://image.chewy.com/catalog/general/images/moe/06769f1c-5479-70e8-8000-8ce8e1a8a40e._SY296_.jpeg",
            "https://image.chewy.com/catalog/general/images/moe/0679a432-8ba1-74b7-8000-b013a8a21952._SY296_.jpeg",
            "https://image.chewy.com/catalog/cms/images/1513151_2024-08-IMC_FallDogFood-Mainstream-NonPromo-HHCB-LG._SY296__V1728511709_.jpeg",
            "https://image.chewy.com/catalog/general/images/moe/067a143c-7ab2-779b-8000-eec41899aa16._SY296_.jpeg",
            "https://image.chewy.com/catalog/general/images/moe/0679bf99-df5f-7f1f-8000-51fca46c53b3._SY296_.jpeg",
            "https://image.chewy.com/catalog/general/images/moe/06776c57-a25f-73ad-8000-ee245157c4bc._SY296_.jpeg",
          ].map((src, index) => (
            <div key={index} className="min-h-[250px] sm:min-h-[300px] md:min-h-[350px]">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full min-h-full object-cover "
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </div>
  );
}
