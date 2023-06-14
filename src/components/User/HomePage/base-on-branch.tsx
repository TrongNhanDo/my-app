import React from "react";
import { Link } from "react-router-dom";

const BaseOnBranch = React.memo(() => {
   return (
      <div className="w-full flex flex-col bg-white rounded p-5 mt-5">
         <div className="flex w-full items-center">
            <div className="uppercase text-2xl font-bold w-1/2">
               thương hiệu
            </div>
            <div className="w-1/2 flex justify-end">
               <Link to="" className="hover:text-blue-500">
                  Xem tất cả
               </Link>
            </div>
         </div>
         <div className="flex w-full mt-5 justify-around">
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch1_cqreph.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch4_qu0gpx.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch3_qlqm4r.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch5_huvjf8.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch2_knzpae.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch6_s9ilxi.png"
               alt=""
            />
         </div>
      </div>
   );
});

export default BaseOnBranch;