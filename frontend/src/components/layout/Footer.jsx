import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TbArmchair,
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandTwitter,
  TbBrandPinterest,
  TbMail,
  TbPhone,
  TbMapPin,
  TbCheck,
  TbArrowUp,
} from "react-icons/tb";

// ── Social Icon Button ──────────────────────────────────
const SocialBtn = ({ Icon, label, href }) => (
  <a
    href={href}
    aria-label={label}
    style={{
      width:          38,
      height:         38,
      borderRadius:   "50%",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      color:          "rgba(255,255,255,0.60)",
      border:         "1px solid rgba(212,163,115,0.22)",
      background:     "transparent",
      textDecoration: "none",
      flexShrink:     0,
      transition:     "color 0.18s, background 0.18s, border-color 0.18s, transform 0.18s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color       = "#2C1A0E";
      e.currentTarget.style.background  = "#D4A373";
      e.currentTarget.style.borderColor = "#D4A373";
      e.currentTarget.style.transform   = "translateY(-3px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color       = "rgba(255,255,255,0.60)";
      e.currentTarget.style.background  = "transparent";
      e.currentTarget.style.borderColor = "rgba(212,163,115,0.22)";
      e.currentTarget.style.transform   = "none";
    }}
  >
    <Icon size={18} />
  </a>
);

// ── Back to Top Button ──────────────────────────────────
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position:       "fixed",
        bottom:         28,
        right:          28,
        zIndex:         999,
        width:          46,
        height:         46,
        borderRadius:   "50%",
        background:     "#D4A373",
        color:          "#2C1A0E",
        border:         "none",
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        boxShadow:      "0 4px 16px rgba(0,0,0,0.35)",
        opacity:        visible ? 1 : 0,
        pointerEvents:  visible ? "auto" : "none",
        transform:      visible ? "translateY(0)" : "translateY(12px)",
        transition:     "opacity 0.25s ease, transform 0.25s ease, background 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#C49060";
        e.currentTarget.style.transform  = "translateY(-2px)";
        e.currentTarget.style.boxShadow  = "0 8px 22px rgba(0,0,0,0.40)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#D4A373";
        e.currentTarget.style.transform  = "translateY(0)";
        e.currentTarget.style.boxShadow  = "0 4px 16px rgba(0,0,0,0.35)";
      }}
    >
      <TbArrowUp size={22} />
    </button>
  );
};

// ── Footer ──────────────────────────────────────────────
const Footer = () => {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handleJoin = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <>
      <footer
        className="mt-20"
        style={{ background: "#2C1A0E", color: "#FFFFFF" }}
      >
        {/* ── Top accent line ── */}
        <div
          style={{
            height:     3,
            background: "linear-gradient(90deg, transparent, #D4A373, transparent)",
          }}
        />

        {/* ── Main grid ── */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* ── Brand column ── */}
            <div>

              {/* Logo icon + text */}
              <Link
                to="/"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            10,
                  textDecoration: "none",
                  marginBottom:   14,
                }}
              >
                <div
                  style={{
                    width:          42,
                    height:         42,
                    borderRadius:   "50%",
                    background:     "rgba(212,163,115,0.15)",
                    border:         "1px solid rgba(212,163,115,0.30)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                  }}
                >
                  <TbArmchair size={22} style={{ color: "#D4A373" }} />
                </div>
                <span
                  style={{
                    fontSize:   24,
                    fontWeight: 700,
                    color:      "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  Furni<span style={{ color: "#D4A373" }}>Hub</span>
                </span>
              </Link>

              {/* Tagline */}
              <p
                className="text-xs italic mb-4"
                style={{ color: "#D4A373", letterSpacing: "0.02em" }}
              >
                "Crafted for comfort, designed for life."
              </p>

              {/* Description */}
              <p
                className="text-sm leading-7"
                style={{ color: "rgba(255,255,255,0.70)" }}
              >
                Discover premium furniture collections designed for comfort,
                elegance, and modern living. Transform your house into a dream
                home with FurniHub.
              </p>

              {/* Social icons */}
              <div className="flex gap-3 mt-6">
                <SocialBtn Icon={TbBrandFacebook}  label="Facebook"  href="#" />
                <SocialBtn Icon={TbBrandInstagram} label="Instagram" href="#" />
                <SocialBtn Icon={TbBrandTwitter}   label="Twitter"   href="#" />
                <SocialBtn Icon={TbBrandPinterest} label="Pinterest" href="#" />
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <h3
                className="text-xl font-semibold mb-5"
                style={{ color: "#D4A373" }}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Home",     to: "/"         },
                  { label: "Products", to: "/products" },
                  { label: "About Us", to: "/about"    },
                  { label: "Contact",  to: "/contact"  },
                ].map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm transition-all duration-150"
                      style={{ color: "rgba(255,255,255,0.70)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#D4A373")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Customer Service ── */}
            <div>
              <h3
                className="text-xl font-semibold mb-5"
                style={{ color: "#D4A373" }}
              >
                Customer Service
              </h3>
              <ul className="space-y-3">
                {[
                  "FAQ",
                  "Shipping Policy",
                  "Returns & Refunds",
                  "Privacy Policy",
                  "Terms & Conditions",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-sm transition-all duration-150"
                      style={{ color: "rgba(255,255,255,0.70)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#D4A373")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
                      }
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact + Newsletter ── */}
            <div>
              <h3
                className="text-xl font-semibold mb-5"
                style={{ color: "#D4A373" }}
              >
                Contact Us
              </h3>

              <div
                className="space-y-4 text-sm"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <div className="flex gap-3 items-center">
                  <TbMapPin size={18} style={{ color: "#D4A373", flexShrink: 0 }} />
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div className="flex gap-3 items-center">
                  <TbPhone size={18} style={{ color: "#D4A373", flexShrink: 0 }} />
                  <span>+94 71 234 5678</span>
                </div>
                <div className="flex gap-3 items-center">
                  <TbMail size={18} style={{ color: "#D4A373", flexShrink: 0 }} />
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

                {status === "success" ? (
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-lg"
                    style={{
                      background: "rgba(29,158,117,0.15)",
                      border:     "1px solid rgba(29,158,117,0.35)",
                    }}
                  >
                    <TbCheck size={16} style={{ color: "#1D9E75", flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "#5DCAA5" }}>
                      Subscribed! Check your inbox 🎉
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setStatus("idle");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                        placeholder="your@email.com"
                        className="flex-1 px-4 py-3 rounded-l-lg outline-none text-sm"
                        style={{
                          background:  "rgba(255,255,255,0.08)",
                          border:      `1px solid ${
                            status === "error"
                              ? "rgba(226,75,74,0.60)"
                              : "rgba(212,163,115,0.25)"
                          }`,
                          borderRight: "none",
                          color:       "#FFFFFF",
                        }}
                      />
                      <button
                        onClick={handleJoin}
                        className="px-5 py-3 rounded-r-lg font-semibold text-sm transition-all duration-150"
                        style={{ background: "#D4A373", color: "#2C1A0E" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#C49060")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#D4A373")
                        }
                      >
                        Join
                      </button>
                    </div>
                    {status === "error" && (
                      <p className="text-xs mt-1" style={{ color: "#F09595" }}>
                        Please enter a valid email address.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div
          style={{
            borderTop:  "1px solid rgba(255,255,255,0.10)",
            background: "#1E0F05",
          }}
        >
          <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">

            {/* left — copyright */}
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
              © {new Date().getFullYear()} FurniHub. All Rights Reserved.
            </p>

            {/* center — policy links */}
            <div className="flex gap-5 text-sm">
              {["Privacy", "Terms", "Cookies", "Sitemap"].map((item) => (
                <Link
                  key={item}
                  to="#"
                  style={{
                    color:          "rgba(255,255,255,0.50)",
                    textDecoration: "none",
                    transition:     "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#D4A373")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.50)")
                  }
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* right — payment badges */}
            <div className="flex gap-2 flex-wrap justify-center">
              {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
                <span
                  key={p}
                  style={{
                    background:    "rgba(255,255,255,0.07)",
                    border:        "1px solid rgba(255,255,255,0.12)",
                    color:         "rgba(255,255,255,0.45)",
                    fontSize:      10,
                    fontWeight:    700,
                    padding:       "3px 8px",
                    borderRadius:  5,
                    letterSpacing: "0.04em",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>

          </div>
        </div>
      </footer>

      {/* ── Back to Top — fixed, outside footer flow ── */}
      <BackToTop />
    </>
  );
};

export default Footer;