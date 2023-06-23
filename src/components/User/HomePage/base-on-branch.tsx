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
            <Link to="/product-list?branchId=1">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch1_cqreph.png"
                  alt=""
               />
            </Link>
            <Link to="/product-list?branchId=2">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch4_qu0gpx.png"
                  alt=""
               />
            </Link>
            <Link to="/product-list?branchId=3">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch3_qlqm4r.png"
                  alt=""
               />
            </Link>
            <Link to="/product-list?branchId=4">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch5_huvjf8.png"
                  alt=""
               />
            </Link>
            <Link to="/product-list?branchId=5">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch2_knzpae.png"
                  alt=""
               />
            </Link>
            <Link to="/product-list?branchId=6">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/branch6_s9ilxi.png"
                  alt=""
               />
            </Link>
         </div>
      </div>
   );
});

export default BaseOnBranch;
