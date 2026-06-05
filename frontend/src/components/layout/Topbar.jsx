import React from 'react'
import { TbBrandMeta } from 'react-icons/tb';


const Topbar = () => {
  return (
    <div className="bg-[#ea20e] text-white">
     <div className="container mx-auto ">
      <a href="#" className="hover:text-gray-300">
        <TbBrandMeta className= "h-5 w-5" />
      </a>
       <h1 className="text-2xl font-bold">FurniHub</h1>
     </div>
    </div>
  )
}

export default Topbar;
