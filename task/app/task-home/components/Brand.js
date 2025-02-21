// import { Card, CardContent, CardMedia, Typography } from "@mui/material";
// import React from "react";

// const Brand = () => {
//   const data = [
//     "https://image.chewy.com/catalog/cms/images/NS1-BrandLogo_proplan_920x920._SY440__V1715118841_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/2021-10-Hills_Logo-1500x1500._SY440__V1715118847_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/1528240-2024-07-SE-DogTreats-BrandLogo-BlueBuffalo-NS2._SY440__V1721329927_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/2021-10-Royal-Canin_Logo-1500x1500._SY440__V1715118841_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/1643402-2024_09_NS1-Friskes._SY440__V1725465637_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/Greenies-Logo-920x920._SY440__V1715118848_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/1643402-2024_09_NS1-FancyFeast._SY440__V1725465637_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/2022-09-Autoship-Update-ShopBrands-Recipe1-6-Frisco._SY440__V1717684390_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/BARK._SY440__V1719600795_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/1643402-2024_09_NS1-Temptation._SY440__V1725465638_.jpeg",
//     "https://image.chewy.com/is/image/category/135710-MAIN-b-nexgard-brand-products._SY440__V1705520168_.jpeg",
//     "https://image.chewy.com/catalog/cms/images/testt._SY440__V1725491355_.jpeg",
//   ];
//   return (
//     <div className="relative w-full  h-60 ">
//       <div className="font-poppins text-[22px] font-[600] ml-[30px]">
//         Brands our customers love
//       </div>
//       <div
//         className="flex gap-5 shadow-md overflow-hidden no-scrollbar space-x-4 p-4 w-full justify-evenly"
//         style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
//       >
//         {data.map((i) => (
//           <Card
//             // sx={{ maxWidth: 345, flex: "0 0 auto", marginLeft: "10px" }}
//             className="max-w-[345px] flex-none ml-7 mr-7 w-[180px] h-[180px] items-center justify-center p-4  hover:border-gray-200 hover:border-1"
//           >
//             <CardMedia
//               component="img"
//               alt="green iguana"
//               className="w-[150px] h-[150px] "
//               image={i}
//             />
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Brand;
"use client";

import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Brands = () => {
    const images = [
        {
            src: "https://image.chewy.com/catalog/cms/images/NS1-BrandLogo_proplan_920x920._SY880__V1715118841_.jpeg",
            alt: "Slide 1",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/2021-10-Hills_Logo-1500x1500._SY880__V1715118847_.jpeg",
            alt: "Slide 2",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/1528240-2024-07-SE-DogTreats-BrandLogo-BlueBuffalo-NS2._SY880__V1721329927_.jpeg",
            alt: "Slide 3",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/2021-10-Royal-Canin_Logo-1500x1500._SY880__V1715118841_.jpeg",
            alt: "Slide 4",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/1643402-2024_09_NS1-Friskes._SY220__V1725465637_.jpeg",
            alt: "Slide 5",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/Greenies-Logo-920x920._SY220__V1715118848_.jpeg",
            alt: "Slide 6",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/1643402-2024_09_NS1-FancyFeast._SY220__V1725465637_.jpeg",
            alt: "Slide 7",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/2022-09-Autoship-Update-ShopBrands-Recipe1-6-Frisco._SY880__V1717684390_.jpeg",
            alt: "Slide 8",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/BARK._SY880__V1719600795_.jpeg",
            alt: "Slide 9",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/1643402-2024_09_NS1-Temptation._SY220__V1725465638_.jpeg",
            alt: "Slide 10",
        },
        {
            src: "https://image.chewy.com/is/image/category/135710-MAIN-b-nexgard-brand-products._SY220__V1705520168_.jpeg",
            alt: "Slide 11",
        },
        {
            src: "https://image.chewy.com/catalog/cms/images/testt._SY220__V1725491355_.jpeg",
            alt: "Slide 12",
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
        <Container maxWidth="2xl" disableGutters="true">
            <Container maxWidth="xl" className='flex justify-center'>
                <Box className="w-full h-70 my-1 ">
                    <Box>
                        <Box>
                            <Typography className="!text-xl !font-bold" >Brands our customers love</Typography>
                        </Box>
                        <Carousel
                            responsive={responsive}
                            infinite={false}
                            autoPlay
                            autoPlaySpeed={3000}
                            slidesToSlide={6}
                            customTransition='transform 900ms ease-in-out'
                            showDots={false}
                            arrows={true}
                        >

                            {images.map((image, index) => (
                                <Box key={index} className='m-10 shadow-lg rounded-5 w-50 h-55 '>
                                    <Box  >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className=" w-full h-full object-cover"
                                        />
                                    </Box>
                                </Box>
                            ))}

                        </Carousel>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
};

export default Brands;