"use-client";

import { Container } from "@mui/material";
import {
  Facebook,
  YouTube,
  Instagram,
  ArrowUpward,
  Email,
  Call,
} from "@mui/icons-material";
import ReactCountryFlag from "react-country-flag";

const Footer = () => {
  return (
    <Container maxWidth="2xl" disableGutters="false">
      <Container maxWidth="2xl" disableGutters="false">
    <footer>


      <Container maxWidth="2xl" disableGutters="false" className="bg-blue-800">
      <Container maxWidth="xl">
      <div className="flex justify-around items-center bg-blue-800 h-25 font-bold text-center ">
        <div className="text-white">
          <p>Our experts are available 24/7:</p>
        </div>
        <div className="text-white">
          <Call fontSize="small"> </Call>
          <button className="">1-800-672-4399</button>
        </div>
        <div className="text-white">
          <Email fontSize="small"></Email>
          <button className="">email us</button>
        </div>
        <div className="border rounded-full w-45 h-10 text-blue-800 bg-white flex items-center justify-center">
          <ArrowUpward></ArrowUpward>
          <button className=" "> Back to Top</button>
        </div>
      </div>
      </Container>
      </Container>

      <div className="h-20 flex justify-center gap-9 items-center">
        <div>
          <ReactCountryFlag
            countryCode="US"
            svg
            style={{
              width: "24px",
              height: "18px",
            }}
          />
          <a>United States</a>
        </div>
        <div>
          <a>About</a>
        </div>
        <div>
          <a>Investor Relations</a>
        </div>

        <div>
          <a>Affiliates</a>
        </div>
        <div>
          <a>Jobs</a>
        </div>
        <div>
          <a>FAQs</a>
        </div>
        <div>
          <a>Blog</a>
        </div>
        <div>
          <a>Give Back</a>
        </div>
        <div>
          <a>Git Guide</a>
        </div>
        <div>
          <a>Git Cards</a>
        </div>

        <div
          sx={{ width: "50px", height: "50px" }}
          className="bg-white rounded-full flex place-content-center items-center"
        >
          <Facebook
            sx={{ width: "45px", height: "45px" }}
            className="text-blue-800 rounded-full"
          ></Facebook>
        </div>
        <div
          sx={{ width: "50px", height: "50px" }}
          className="bg-red-600 rounded-full flex place-content-center items-center"
        >
          <YouTube
            sx={{ width: "35px", height: "35px" }}
            className="text-white"
          ></YouTube>
        </div>
        <div
          sx={{ width: "50px", height: "50px" }}
          className="bg-pink-600 rounded-full flex place-content-center items-center"
        >
          <Instagram
            sx={{ width: "35px", height: "35px" }}
            className="text-white"
          ></Instagram>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="h-30">
          <img src="/footer.PNG"></img>
        </div>
      </div>

      <Container maxWidth="xl">
      <div className="h-8 border-t border-gray-300 flex justify-around text-gray-500 text-sm">
        <div>
          <p>Copyright @ 2025,Chewy,Inc.</p>
        </div>
        <div>
          <a href="#">Terms of Use</a>
        </div>
        <div>
          <a>Privacy Policy(Updated Apr29,2024)</a>
        </div>
        <div>
          <a>Intrest-Based Ads</a>
        </div>
        <div>
          <a>Accessibility</a>
        </div>
        <div>
          <a>California Supply Chains Act</a>
        </div>
        <div>
          <a>Vendor Compliance</a>
        </div>
      </div>
      </Container>

      <div className="flex justify-center h-9">
        <div className="text-gray-500 text-sm flex">
          <svg
            height="30px"
            width="30px"
            role="img"
            aria-label="Privacy-Choices"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewdiv="0 0 24 24"
            fill="none"
          >
            <path
              fill="var(--chirp-ui-elements-privacy-02, #fff)"
              d="M2 11.794A4.795 4.795 0 0 1 6.795 7h10.41a4.795 4.795 0 0 1 0 9.589H6.796A4.794 4.794 0 0 1 2 11.795Z"
            ></path>
            <path
              fill="var(--chirp-ui-elements-privacy-primary, #06f)"
              fill-rule="evenodd"
              d="M6.795 7.822h6.321l-2.1 7.945H6.794a3.973 3.973 0 0 1 0-7.945ZM2 11.794A4.795 4.795 0 0 1 6.795 7h10.41a4.795 4.795 0 0 1 0 9.589H6.796A4.794 4.794 0 0 1 2 11.795Zm3.94-.136 1.216 1.273 2.629-3.124a.41.41 0 0 1 .585 0 .412.412 0 0 1 0 .586l-2.921 3.412a.416.416 0 0 1-.59 0l-1.504-1.561a.412.412 0 0 1 0-.586.41.41 0 0 1 .585 0Z"
              clip-rule="evenodd"
            ></path>
            <path
              fill="var(--chirp-ui-elements-privacy-02, #fff)"
              d="M14.473 13.26a.42.42 0 0 0 .003.585c.16.16.433.156.585.003l1.485-1.464 1.461 1.46a.42.42 0 0 0 .585-.003.42.42 0 0 0 0-.585l-1.457-1.461 1.457-1.488a.417.417 0 0 0 0-.585.424.424 0 0 0-.585-.004l-1.46 1.492-1.486-1.488a.42.42 0 0 0-.585.003.424.424 0 0 0-.003.586l1.488 1.484-1.488 1.464Z"
            ></path>
          </svg>
          Your Privacy Choice
        </div>
      </div>
    </footer>
    </Container>
    </Container>
  );
};

export default Footer;
