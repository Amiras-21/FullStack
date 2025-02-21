"use client";

import { Container } from "@mui/material";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCrousel";
import CategoryCard from "./components/CategoryCard";

import Image from "next/image";
import ImageFirst from "./components/ImageFirst";
import Footer from "./components/Footer";
import CardPage from "./components/CardPage";
import Brand from "./components/Brand";

const TaskHome = () => {
  return (
    <div>
      <Container maxWidth="2xl" disableGutters="false">
      <Container maxWidth="2xl" disableGutters="false" className="bg-blue-800">
      <Container maxWidth="xl" >
        <Header />
        </Container>
        </Container>
        
        <Container maxWidth="xl" disableGutters="false">
        <div className="flex justify-center items-center font-bold text-black text-center h-10 text-xs sm:text-sm md:text-lg  ">
          <a>$20 eGift card with $49+ on 1st order* Use WELCOME</a>
        </div>
        <ImageFirst />
        <CategoryCard />

        <div className="flex  items-center h-85">
          <div className="flex gap-4 w-full justify-center">
            <div className="bg-white text-left flex-1 max-w-xs">
              <Image
                src="https://image.chewy.com/catalog/cms/images/2023-08-P49-Content-Card-RESIZED-Image1_84-original._SY320__V1712351167_.jpeg"
                alt="Image 1"
                width={500}
                height={300}
              />
              <h1 className="font-bold text-lg/7">High quality, low prices</h1>
              <p className="mt-4 text-gray-700">
                Keep your pet happy & healthy with great prices on the best
                products.
              </p>
            </div>

            <div className="bg-white p-6 text-left flex-1 max-w-xs">
              <Image
                src="https://image.chewy.com/catalog/cms/images/2023-08-P49-Content-Card-RESIZED-Image3_85-original._SY320__V1712351168_.jpeg"
                alt="Image 2"
                width={600}
                height={300}
              />
              <h1 className="font-bold text-lg/7">Fast delivery</h1>
              <p className="mt-4 text-gray-700">
                Get everything delivered right to your door with fast, 1-3 day
                delivery.
              </p>
            </div>

            <div className="bg-white p-6 text-left flex-1 max-w-xs">
              <Image
                src="https://image.chewy.com/catalog/cms/images/2023-08-P49-Content-Card-RESIZED-Image4_86-original._SY320__V1712351173_.jpeg"
                alt="Image 3"
                width={600}
                height={300}
              />
              <h1 className="font-bold text-lg/7">Free 365-day returns</h1>
              <p className="mt-4 text-gray-700">
                If you & your pet aren't 100% satisfied, return your items
                within a year at no cost.
              </p>
            </div>

            <div className="bg-white p-6 text-left flex-1 max-w-xs">
              <Image
                src="https://image.chewy.com/catalog/cms/images/2023-08-P49-Content-Card-RESIZED-Image2_87-original._SY320__V1712351173_.jpeg"
                alt="Image 4"
                width={500}
                height={300}
              />
              <h1 className="font-bold text-lg/7">24/7 support</h1>
              <p className="mt-4 text-gray-700">
                Got questions? We got you 24/7. Our pet experts are just a call,
                e-mail or chat away.
              </p>
            </div>
          </div>
        </div>

        <div className="text-left font-bold text-lg/7">
          <p>Who are you shopping for today?</p>
        </div>
        <ImageCarousel />

        <div className="h-83 px-4">
          <div className="text-left font-bold text-lg/7">
            <div className="">
              <p>Discover our health services</p>
            </div>
            <div className="flex justify-around gap-x-4">
              <div className="bg-white  text-center flex-1 max-w-100">
                <Image
                  src="https://image.chewy.com/catalog/cms/images/2023-01-New-Pet-Shop-Dog-Recipe3-3-Default-Pharmacy-original._SY255__V1711581941_.jpeg"
                  alt="Image 1"
                  width={600}
                  height={300}
                  className=" h-auto object-cover"
                />
                <h1 className="font-bold text-lg/7">Pharmacy</h1>
                <p className="mt-4 text-gray-700 font-light text-sm">
                  Filling your pet prescriptions couldn't be easier.
                </p>
              </div>

              <div className="bg-white text-center flex-1  max-w-100 ">
                <Image
                  src="https://image.chewy.com/catalog/cms/images/2023-01-New-Pet-Shop-Cat-Recipe3-2-Default-CarePlus-original._SY255__V1712021542_.jpeg"
                  alt="Image 2"
                  width={600}
                  height={300}
                  className="h-auto object-cover"
                />
                <h1 className="font-bold text-lg/7">CarePlus</h1>
                <p className="mt-4 text-gray-700 font-light text-sm">
                  Insurance plans that give you pet comprehensive coverage.
                </p>
              </div>

              <div className="bg-white text-center flex-1  max-w-100">
                <Image
                  src="https://image.chewy.com/catalog/cms/images/2024-08-1467234-NS3-Default-SkinCare-Dog-Logo._SY255__V1723751649_.jpeg"
                  alt="Image 3"
                  width={600}
                  height={300}
                  className=" h-auto object-cover"
                />
                <h1 className="font-bold text-lg/7">Connect with a vet</h1>
                <p className="mt-4 text-gray-700 font-light text-sm">
                  Get live vet help in an instant via chat or video
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-47">
          <div className="relative w-full h-40">
            <Image
              src="https://image.chewy.com/catalog/cms/images/1424024_2024_07_PB_FRSC-AB-BTN-LG._SY168_.jpeg"
              alt="loading"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="text-left font-bold text-lg/7">
          <p>Explore popular categories</p>
        </div>
        <ImageCarousel />
        <CardPage />
        <Brand />

        
        </Container>
        <Footer />
      </Container>
    </div>
  );
};

export default TaskHome;
