import React from 'react'
import { TbBrandMeta } from 'react-icons/tb';


const Topbar = () => {
  return (
    <div className="bg-slate-800 text-white">
     <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <a href="#" className="hover:text-gray-300 flex items-center gap-2">
        <TbBrandMeta className= "h-6 w-6" />
        <span className="hidden sm:inline">Follow us</span>
      </a>
       <div className="text-sm">Free delivery on orders over $100</div>
     </div>
    </div>
  )
}

export default Topbar;
