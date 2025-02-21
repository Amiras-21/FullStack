import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating, Stack } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const CardPage = () => {
  const data = [
    {
      id: 1,
      image: "https://image.chewy.com/catalog/general/images/moe/067352bc-9bb4-7e29-8000-228a42332767._AC_SY232_V528090960_.jpg",
      description:
        "Frisco Valentine Strawberry Jam Hide & Seek Puzzle Plush Squeaky Dog Toy, Small/Medium",
      rating: 4.8,
      view: 20,
      price: "$ 15.99",
    },
    {
      id: 2,
      image:
        "https://image.chewy.com/catalog/general/images/moe/06744970-e146-760a-8000-7f095268b105._AC_SY348_V528090960_.jpg",
      description: "Frisco Heart Print Dog & Cat Bandana, X-Small/Small",
      rating: 4.7,
      view: 30,
      price: "$ 6.99",
    },
    {
      id: 3,
      image:
        "https://image.chewy.com/catalog/general/images/moe/0674494a-ed4f-75a4-8000-a087a701e55a._AC_SY348_V528090960_.jpg",
      description: "Frisco Love Arrow Dog Costume Accessory, Medium/Large",
      rating: 4.2,
      view: 16,
      price: "$9.99",
    },
    {
      id: 4,
      image:
        "https://image.chewy.com/catalog/general/images/moe/067352b7-6c6b-75d3-8000-3fae1afd1acf._AC_SY348_V528090960_.jpg",
      description:
        "Frisco Valentine Love Cactus Plush Kicker Cat Toy with Catnip",
      rating: 4.2,
      view: 22,
      price: "$5.99",
    },
    {
      id: 5,
      image:
        "https://image.chewy.com/catalog/general/images/moe/0674495b-355c-7cfd-8000-136adca25e78._AC_SY348_V528090960_.jpg",
      description: "Frisco Heart Print Dog & Cat Jersey PJs, X-Small",
      rating: 4.3,
      view: 41,
      price: "$12.99",
    },
    {
      id: 6,
      image:
        "https://image.chewy.com/is/image/catalog/371085_MAIN._AC_SY348_V1666274612_.jpg",
      description:
        "Frisco Valentine Love Buzz Bee Plush Squeaky Dog Toy, Small/Medium",
      rating: 4.7,
      view: 66,
      price: "$8.58",
    },
    {
      id: 7,
      image:
        "https://image.chewy.com/catalog/general/images/moe/06744969-b284-71b3-8000-283573517c19._AC_SY348_V528090960_.jpg",
      description:
        "Frisco Valentine Love Buzz Bee Plush Squeaky Dog Toy, Small/Medium",
      rating: 4.8,
      view: 17,
      price: "$10.99",
    },
    {
      id: 8,
      image:
        "https://image.chewy.com/is/image/catalog/292058_MAIN._AC_SY348_V1637268175_.jpg",
      description:
        "Frisco Valentine Love Buzz Bee Plush Squeaky Dog Toy, Small/Medium",
      rating: 4.5,
      view: 70,
      price: "$6.99",
    },
    {
      id: 9,
      image:
        "https://image.chewy.com/is/image/catalog/201906_Main._AC_SY348_V1576102977_.jpg",
      description:
        "Frisco Valentine Love Buzz Bee Plush Squeaky Dog Toy, Small/Medium",
      rating: 4.8,
      view: 136,
      price: "$9.99",
    },
    {
      id: 10,
      image:
        "https://image.chewy.com/is/image/catalog/298958_MAIN._AC_SY348_V1637693814_.jpg",
      description:
        "Frisco Valentine Love Buzz Bee Plush Squeaky Dog Toy, Small/Medium",
      rating: 4.7,
      view: 120,
      price: "$10.98",
    },
  ];
  return (
    <>
      <div className="relative w-full mt-[25px] h-130 ">
        <div className="font-poppins text-[22px] font-[600] ml-[30px]">
          Who are you shopping for today ?
        </div>
        <div
          className="flex overflow-hidden no-scrollbar gap-5 space-x-4 p-5 w-full justify-evenly h-150  "
          style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
        >
          {data.map((i) => (
            <Card className="w-[200px] h-[447px] shadow-md flex-none hover:border-gray-200 hover:border-1" key={i.id}>
              <CardMedia
                image={i.image}
                title="green iguana"
                sx={{objectFit: "contain",
                    width: "100%",
                    height: "220px",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    bgcolor: "white", }}
              />

              <CardContent className="flex flex-col">
                <Typography
                  variant="body2"
                  className="text-[14px] font-[400] font-poppins tracking-[0.2px] mt-[0] break-words hover:underline"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {i.description}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-[12px]  font-poppins tracking-[0.2px] mt-[0] break-words text-[#1c49c2] hover:underline"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  By Chew
                </Typography>
                <Stack spacing={1} className="mt-1">
                  <div className="flex items-center">
                    <p className="text-[14px] text-poppins font-[600] text-gray-500 mr-2">
                      {i.rating}
                    </p>
                    <Rating
                      name="half-rating"
                      defaultValue={i.rating}
                      precision={0.5}
                      size="small"
                    />
                    <p className="text-[10px] text-poppins font-[600] text-gray-500 ml-2">
                      {i.view}
                    </p>
                  </div>
                </Stack>
                <div className="text-[18px] font-[700] mt-3">{i.price}</div>
                <footer className="flex flex-col mt-3">
                  <div className="flex items-center">
                    <div className="flex items-center mr-1.5">
                      <LocalOfferIcon
                        sx={{ width: "15px", height: "15px", color: "#de0ba2" }}
                      />
                    </div>
                    <div className="text-[12px] font-[100] tracking-0 ">
                      Promo,Save 20% at Checkout
                    </div>
                  </div>
                  <div className="text-[12px] font-[500] text-gray-600 tracking-0 ml-5">
                    +1 Deal
                  </div>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardPage;
