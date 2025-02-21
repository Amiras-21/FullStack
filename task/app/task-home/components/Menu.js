"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Typography } from "@mui/material";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "black",

    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function MenuDrop(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = [
    {
      id: 1,
      title: "Food",
      data: [
        "Dry Food",
        "Wet Food",
        "Fresh Food & Toppers",
        "Veterinary Diets",
        "Shop by Health Condition",
        "Puppy Food",
      ],
    },
    {
      id: 2,
      title: "Treats",
      data: [
        "Bones & Bully Sticks",
        " Soft & Chewy Treats",
        "Dental Treats",
        " Biscuits & Cookies",
        " Jerky Treats",
        "Freeze - Dried & Dehydrated",
        "Training Treats",
      ],
    },
    {
      id: 3,
      title: "Toys",
      data: [
        "Chew Toys",
        "Plush Toys",
        " Interactive Toys",
        " Fetch Toys",
        "Rope & Tug Toys",
        "Tough Chewer",
        "Variety Packs",
      ],
    },
    {
      id: 4,
      title: "Supplies",
      data: [
        "Crates, Pens & Gates Beds",
        "Bowls & Feeders",
        "Grooming",
        "Cleaning & Potty",
        "Carriers & Travel",
        "Training & Behavior",
        "Dog Tech & Smart Home",
      ],
    },
    {
      id: 5,
      title: "Collars",
      data: ["Collars", "Harnesses", "Leashes"],
    },
    {
      id: 6,
      title: "Accessories",
      data: ["Coats & Jackets", " Sweaters & Hoodies", "Shirts"],
    },
    {
      id: 7,
      title: "Health & Pharmacy",
      data: [
        "Flea & Tick",
        " Vitamins & Supplements",
        " Heartworm & Dewormers",
        "Pharmacy & Prescriptions",
        "DNA Testing Kits",
        "First Aid & Recovery",
      ],
    },
  ];
  const brands = [
    {
      id: 1,
      img: "https://image.chewy.com/catalog/cms/images/NS1-BrandLogo_proplan_920x920._SY880__V1715118841_.jpeg",
    },
    {
      id: 2,
      img: "https://image.chewy.com/catalog/cms/images/2021-10-Hills_Logo-1500x1500._SY880__V1715118847_.jpeg",
    },
    {
      id: 3,
      img: "https://image.chewy.com/catalog/cms/images/1528240-2024-07-SE-DogTreats-BrandLogo-BlueBuffalo-NS2._SY880__V1721329927_.jpeg",
    },
    {
      id: 4,
      img: "https://image.chewy.com/catalog/cms/images/2022-09-Autoship-Update-ShopBrands-Recipe1-6-Frisco._SY880__V1717684390_.jpeg",
    },
    {
      id: 5,
      img: "https://image.chewy.com/catalog/cms/images/2021-10-Royal-Canin_Logo-1500x1500._SY880__V1715118841_.jpeg",
    },
    {
      id: 6,
      img: "https://image.chewy.com/catalog/cms/images/BARK._SY880__V1719600795_.jpeg",
    },
  ];

  return (
    <div>
      <Button
        color="#1C49C2"
        sx={{ color: "white" , textTransform:"capitalize" , fontWeight:"bold"}}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onMouseEnter={handleClick}
        // onMouseLeave={handleClose}

        // onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {props.name}
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
      >
        <Box onMouseLeave={handleClose} className=" grid grid-cols-4  ">
          <Box className="col-span-3 grid grid-rows-10">
            <Box className=" row-span-7 grid grid-cols-4">
              {data.map((id) => {
                return (
                  <Box className="  ">
                    <Box className="">
                      <Box>
                        <Box className="  w-55 border-b-2 border-slate-100">
                          <Typography sx={{ fontWeight: "bold" }}>
                            {id.title}
                            <svg
                              className="inline"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              aria-label="menu"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Typography>
                        </Box>
                        {id.data.map((i) => {
                          return <Typography>{i}</Typography>;
                        })}
                      </Box>
                      <Box></Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className="row-span-3 grid grid-cols-4">
              <Box className="col-span-1">
                <Box className="  w-55 ">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Gift Cards
                    <svg
                      className="inline"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      aria-label="menu"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Typography>
                </Box>
                <Box>
                  <img
                    src="https://image.chewy.com/catalog/general/images/GC-Dog.jpeg"
                    width={250}
                    height={160}
                    alt=""
                  />
                </Box>
              </Box>
              <Box
                sx={{ padding: "10px", height: "150px" }}
                className="col-span-3 border-0"
              >
                <Box>
                  <Typography sx={{ fontSize: "20px" }}>
                    Popular Brands
                  </Typography>
                </Box>
                <Box className="flex justify-between w-full">
                  {brands.map((id) => {
                    return (
                      <Box sx={{ width: "100px", padding: "10px" }}>
                        <img src={id.img} />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box className="col-span-3 flex justify-between"></Box>
            </Box>
          </Box>
          <Box className="col-span-1">
            <img
              className="h-full"
              src="https://image.chewy.com/catalog/general/images/moe/06711718-4ab0-7e2c-8000-25eff659cbb8.jpeg"
            />
          </Box>
        </Box>
      </StyledMenu>
    </div>
  );
}
