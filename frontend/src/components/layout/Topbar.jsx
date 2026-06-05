import React from 'react'
import { TbBrandMeta, TbBrandInstagram, TbBrandFacebook, TbPhone, TbMapPin } from 'react-icons/tb';

const Topbar = () => {
  return (
    <div className="bg-[#3D2B1F] text-[#F5E6D3]">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between flex-wrap gap-2">

        {/* Left - Social Links */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[#E8C99A] flex items-center gap-1.5 transition-colors">
            <TbBrandInstagram className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Instagram</span>
          </a>
          <a href="#" className="hover:text-[#E8C99A] flex items-center gap-1.5 transition-colors">
            <TbBrandFacebook className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Facebook</span>
          </a>
        </div>

        {/* Center - Promo */}
        <div className="text-sm font-medium text-[#E8C99A] tracking-wide">
          🚚 Free delivery on orders over $100
        </div>

        {/* Right - Contact & Store */}
        <div className="flex items-center gap-4">
          <a href="tel:+1234567890" className="hover:text-[#E8C99A] flex items-center gap-1.5 transition-colors text-sm">
            <TbPhone className="h-4 w-4" />
            <span className="hidden md:inline">+1 234 567 890</span>
          </a>
          <a href="#" className="hover:text-[#E8C99A] flex items-center gap-1.5 transition-colors text-sm">
            <TbMapPin className="h-4 w-4" />
            <span className="hidden md:inline">Find a Store</span>
          </a>
        </div>

      </div>
    </div>
  )
}

export default Topbar;
