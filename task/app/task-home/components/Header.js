"use client";

import { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactCountryFlag from "react-country-flag";
import Menu from "./Menu";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <header className="min-h-[90px] md:min-h-[57px] lg:min-h-[110px]  bg-blue-800 p-4 w-full">
      <div className="flex items-center justify-around gap-10 !mb-6 !pt-3 ">
        <div className="flex items-center">
          <div className="lg:hidden">
            <IconButton onClick={toggleDrawer(true)} className="!text-white ">
              <MenuIcon />
            </IconButton>
          </div>
          <div className="hidden md:block w-39 h-7">
            <a href="/">
              <svg
                class="chewy-logo"
                viewBox="0 0 106 32"
                role="img"
                focusable="false"
                aria-label="Chewy Home"
              >
                <path
                  d="M54.237 15.497c-.653 1.377-.924 2.776-3.217 3.709-2.238.91-4.283-.42-4.961-1.675 0 0 7.41-3.424 9.594-4.742.659-.398 1.165-.856 1.5-1.372.268.681.592 1.486.95 2.356-1.447-.557-3.061.027-3.866 1.724m-7.99-6.587c3.06-1.448 4.765 1.526 4.765 1.526l-6.719 3.178s-1.106-3.257 1.954-4.704m57.306-2.554c-1.925-.648-3.732.431-4.314 2.24l-3.242 10.077-.081-.004c-1.03-4.352-2.437-10.31-2.437-10.31-.438-1.85-2.154-3.074-4.124-2.586a3.449 3.449 0 0 0-1.852 1.148c-.2-1.438-1.283-2.61-2.882-2.816-1.973-.254-3.524 1.141-3.764 3.004l-1.332 10.378-.08.008-2.758-7.643c-1.122-3.109-2.04-4.72-4.828-4.404-2.79.317-3.337 2.094-3.762 5.378l-1.044 8.075-.08.009-3.535-9.826c-.635-1.763-2.449-2.776-4.319-2.087a3.361 3.361 0 0 0-1.78 1.476c-1.396-3.65-6.807-7.16-13.451-3.524-3.462 1.895-5.073 4.507-5.597 7.132-.97-2.256-2.957-3.84-5.605-4.08-3.57-.324-5.576 1.779-5.576 1.779l-.072-.006.52-5.965c.166-1.915-1.089-3.608-3.135-3.793-2.047-.186-3.586 1.28-3.75 3.17l-1.238 14.209c-.615-.662-1.547-1.053-2.635-.776-2.193.536-2.754 3.191-5.084 3.68-2.644.555-4.317-1.548-4.827-4.077-.418-2.077-.06-5.137 2.878-5.587 2.58-.396 3.184 2.346 6.055 1.768 1.7-.343 2.52-1.707 2.123-3.45-.626-2.642-4.737-4.582-9.25-3.636C2.89 6.535-1.035 11.814.242 18.436c1.32 6.844 7.662 9.062 12.679 7.943 3.107-.693 4.978-2.133 6.046-3.612l-.068.773c-.166 1.915 1.089 3.608 3.135 3.793 2.047.186 3.586-1.28 3.75-3.17l.707-8.113c.192-2.269 1.697-3.102 3.008-2.983 1.31.118 2.625 1.375 2.45 3.478l-.706 8.113c-.167 1.916 1.089 3.608 3.135 3.794 2.046.185 3.585-1.28 3.75-3.17l.624-7.17c.14.412.294.803.461 1.17C42.27 26 48.53 26.429 53.41 24.12c2.837-1.342 4.507-2.97 5.497-4.466.443-.67.73-1.294.894-1.868.368.843.738 1.672 1.095 2.445 2.353 5.09 3.173 6.345 6.925 6.018 3.73-.522 4.093-2.08 5.091-10.777l.04-.004.04-.005c2.847 8.261 3.537 9.7 7.288 9.373 3.73-.522 4.26-1.93 5.46-7.423a172.47 172.47 0 0 0 1.306-6.764l.83 2.736c2.006 6.58 4.087 10.944 2.833 11.58-1.115.564-1.76-1.418-3.907-1.283-1.477.093-2.783 1.67-2.307 3.617.657 2.689 4.787 5.545 9.532 4.114 4.78-1.442 6.176-5.383 11.685-20.628.633-1.818-.233-3.78-2.158-4.429"
                  className="fill-white"
                ></path>
              </svg>
            </a>
          </div>

          <div className="block md:hidden w-21 h-7">
            <a href="/">
              <svg
                class="chewy-logo"
                viewBox="0 0 106 32"
                role="img"
                focusable="false"
                aria-label="Chewy Home"
              >
                <path
                  d="M54.237 15.497c-.653 1.377-.924 2.776-3.217 3.709-2.238.91-4.283-.42-4.961-1.675 0 0 7.41-3.424 9.594-4.742.659-.398 1.165-.856 1.5-1.372.268.681.592 1.486.95 2.356-1.447-.557-3.061.027-3.866 1.724m-7.99-6.587c3.06-1.448 4.765 1.526 4.765 1.526l-6.719 3.178s-1.106-3.257 1.954-4.704m57.306-2.554c-1.925-.648-3.732.431-4.314 2.24l-3.242 10.077-.081-.004c-1.03-4.352-2.437-10.31-2.437-10.31-.438-1.85-2.154-3.074-4.124-2.586a3.449 3.449 0 0 0-1.852 1.148c-.2-1.438-1.283-2.61-2.882-2.816-1.973-.254-3.524 1.141-3.764 3.004l-1.332 10.378-.08.008-2.758-7.643c-1.122-3.109-2.04-4.72-4.828-4.404-2.79.317-3.337 2.094-3.762 5.378l-1.044 8.075-.08.009-3.535-9.826c-.635-1.763-2.449-2.776-4.319-2.087a3.361 3.361 0 0 0-1.78 1.476c-1.396-3.65-6.807-7.16-13.451-3.524-3.462 1.895-5.073 4.507-5.597 7.132-.97-2.256-2.957-3.84-5.605-4.08-3.57-.324-5.576 1.779-5.576 1.779l-.072-.006.52-5.965c.166-1.915-1.089-3.608-3.135-3.793-2.047-.186-3.586 1.28-3.75 3.17l-1.238 14.209c-.615-.662-1.547-1.053-2.635-.776-2.193.536-2.754 3.191-5.084 3.68-2.644.555-4.317-1.548-4.827-4.077-.418-2.077-.06-5.137 2.878-5.587 2.58-.396 3.184 2.346 6.055 1.768 1.7-.343 2.52-1.707 2.123-3.45-.626-2.642-4.737-4.582-9.25-3.636C2.89 6.535-1.035 11.814.242 18.436c1.32 6.844 7.662 9.062 12.679 7.943 3.107-.693 4.978-2.133 6.046-3.612l-.068.773c-.166 1.915 1.089 3.608 3.135 3.793 2.047.186 3.586-1.28 3.75-3.17l.707-8.113c.192-2.269 1.697-3.102 3.008-2.983 1.31.118 2.625 1.375 2.45 3.478l-.706 8.113c-.167 1.916 1.089 3.608 3.135 3.794 2.046.185 3.585-1.28 3.75-3.17l.624-7.17c.14.412.294.803.461 1.17C42.27 26 48.53 26.429 53.41 24.12c2.837-1.342 4.507-2.97 5.497-4.466.443-.67.73-1.294.894-1.868.368.843.738 1.672 1.095 2.445 2.353 5.09 3.173 6.345 6.925 6.018 3.73-.522 4.093-2.08 5.091-10.777l.04-.004.04-.005c2.847 8.261 3.537 9.7 7.288 9.373 3.73-.522 4.26-1.93 5.46-7.423a172.47 172.47 0 0 0 1.306-6.764l.83 2.736c2.006 6.58 4.087 10.944 2.833 11.58-1.115.564-1.76-1.418-3.907-1.283-1.477.093-2.783 1.67-2.307 3.617.657 2.689 4.787 5.545 9.532 4.114 4.78-1.442 6.176-5.383 11.685-20.628.633-1.818-.233-3.78-2.158-4.429"
                  className="fill-white"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow ">
          <Paper
            component="form"
            className="flex items-center w-90 px-4 py-2 rounded-md bg-white shadow-md"
          >
            <InputBase
              placeholder="Search..."
              className="pl-4 py-2 flex-grow text-gray-700"
              sx={{ paddingLeft: "5px" }}
            />
            <IconButton type="submit" className="text-gray-500">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        {/* Right Section: Buttons & Icons */}
        <div className="flex items-center justify-around text-sm sm:gap-3 md:gap-12">
          <div className="hidden font-bold md:flex items-center text-white cursor-pointer">
            <ReactCountryFlag
              countryCode="US"
              svg
              style={{ width: "20px", height: "13px" }}
            />
            <span>USA</span>
            <ExpandMoreIcon className="ml-1" />
          </div>
          <div className="lg:font-bold flex items-center justify-center text-white cursor-pointer ">
            <button className="lg:flex items-center justify-center border-2 bg-blue-800 text-white rounded-full h-10 w-24 text-sm hidden md:block">
              Use App
            </button>
          </div>
          <div className="hidden font-bold md:flex items-center text-white cursor-pointer">
            <ChatBubbleOutlineIcon className="mr-1" />
            <span>24/7Help</span>
            <ExpandMoreIcon className="ml-1" />
          </div>
          <div className="flex items-center gap-1 !ml-0">
            <button className=" h-7 w-20 flex justify-center items-center font-bold text-sm text-blue-800 bg-white cursor-pointer rounded-full sm:flex md:hidden">
              Use App
            </button>
            <AccountCircleRoundedIcon className="text-white" />
            <a
              href="/signin"
              className="text-white text-md font-bold"
              style={{ color: "white" }}
            >
              Sign In{" "}
              <ExpandMoreIcon className="!hidden md:!inline-block text-white" />
            </a>
          </div>
          <div className="flex items-center text-white cursor-pointer">
            <ShoppingCartIcon className="mr-1" />
            <span className="hidden font-bold md:inline">Cart</span>
            <ExpandMoreIcon className="!hidden md:!inline-block" />
          </div>
        </div>
      </div>

      {/* Second Row (Only on Large Screens) */}
      {/* <div className="hidden lg:flex justify-center gap-21 text-sm mt-3 text-white font-bold">
        <span className="cursor-pointer">
          {" "}
          Dog <ExpandMoreIcon className="ml-1" />
        </span>
        <span className="cursor-pointer">
          {" "}
          Cat <ExpandMoreIcon className="ml-1" />
        </span>
        <span className="cursor-pointer">
          {" "}
          Other Animals <ExpandMoreIcon className="ml-1" />
        </span>
        <span className="cursor-pointer">
          {" "}
          Pharmacy <ExpandMoreIcon className="ml-1" />
        </span>
        <span className="cursor-pointer">
          {" "}
          Services <ExpandMoreIcon className="ml-1" />
        </span>
        <span className="cursor-pointer"> Today's Deal</span>
        <span className="cursor-pointer text-yellow-400">
          {" "}
          Free delivery on first-time orders over $35
        </span>
      </div> */}

      <div className="hidden md:flex  h-10.5 text-sm">
        <div className="flex justify-between w-full text-sm font-bold ">
          <Menu name={"Dog"} />
          <Menu name={"Cat"} />
          <Menu name={"Other Animals"} />
          <Menu name={"Pharmacy"} />
          <Menu name={"Services"} />
          <option className=" text-white px-4 py-2 font-bold rounded-md !pt-2">
            Today's Deals
          </option>
          <option className=" text-amber-400 font-bold px-4 py-2 rounded-md !pt-2">
            Free delivery on first-time orders over $35
          </option>
        </div>
      </div>

      {/* Search Bar for Mobile */}
      <div className="!pb-2 md:hidden mt-3">
        <Paper
          component="form"
          className="flex items-center px-4 py-2 rounded-md bg-white shadow-md"
        >
          <InputBase
            placeholder="Search..."
            className="pl-4 py-2 flex-grow text-gray-700"
          />
          <IconButton type="submit" className="text-gray-500">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </header>
  );
}
