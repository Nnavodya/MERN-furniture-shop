import React from "react";
import { Link } from "react-router-dom";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTwitter,
  TbBrandPinterest,
  TbMail,
  TbPhone,
  TbMapPin,
} from "react-icons/tb";

const Footer = () => {
  return (
    <footer
      className="mt-20"
      style={{
        background: "#2C1A0E",
        color: "#FFFFFF",
      }}
    >
      {/* Top Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#D4A373" }}
            >
              FurniHub
            </h2>

            <p
              className="text-sm leading-7"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Discover premium furniture collections designed for comfort,
              elegance, and modern living. Transform your house into a dream
              home with FurniHub.
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#">
                <TbBrandFacebook
                  size={24}
                  className="hover:scale-110 transition-all"
                />
              </a>

              <a href="#">
                <TbBrandInstagram
                  size={24}
                  className="hover:scale-110 transition-all"
                />
              </a>

              <a href="#">
                <TbBrandTwitter
                  size={24}
                  className="hover:scale-110 transition-all"
                />
              </a>

              <a href="#">
                <TbBrandPinterest
                  size={24}
                  className="hover:scale-110 transition-all"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xl font-semibold mb-5"
              style={{ color: "#D4A373" }}
            >
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-[#D4A373] transition-all">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-[#D4A373] transition-all"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-[#D4A373] transition-all"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#D4A373] transition-all"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3
              className="text-xl font-semibold mb-5"
              style={{ color: "#D4A373" }}
            >
              Customer Service
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="#" className="hover:text-[#D4A373] transition-all">
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-[#D4A373] transition-all">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-[#D4A373] transition-all">
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-[#D4A373] transition-all">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-[#D4A373] transition-all">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3
              className="text-xl font-semibold mb-5"
              style={{ color: "#D4A373" }}
            >
              Contact Us
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <TbMapPin size={20} />
                <span>Colombo, Sri Lanka</span>
              </div>

              <div className="flex gap-3">
                <TbPhone size={20} />
                <span>+94 71 234 5678</span>
              </div>

              <div className="flex gap-3">
                <TbMail size={20} />
                <span>support@furnihub.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p
                className="mb-3 text-sm"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Subscribe for exclusive deals
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-l-lg outline-none text-black"
                />

                <button
                  className="px-5 py-3 rounded-r-lg font-semibold"
                  style={{
                    background: "#D4A373",
                    color: "#2C1A0E",
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="border-t py-5"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            © 2026 FurniHub. All Rights Reserved.
          </p>

          <div className="flex gap-5 text-sm">
            <Link to="#" className="hover:text-[#D4A373]">
              Privacy
            </Link>

            <Link to="#" className="hover:text-[#D4A373]">
              Terms
            </Link>

            <Link to="#" className="hover:text-[#D4A373]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;