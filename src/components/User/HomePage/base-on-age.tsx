import React from "react";
import { Link } from "react-router-dom";

const BaseOnAge = React.memo(() => {
   return (
      <div className="w-full flex flex-col bg-white rounded p-5 mt-5">
         <div className="flex w-full items-center">
            <div className="uppercase text-2xl font-bold w-1/2">
               theo độ tuổi
            </div>
            <div className="w-1/2 flex justify-end">
               <Link to="" className="hover:text-blue-500">
                  Xem tất cả
               </Link>
            </div>
         </div>
         <div className="flex w-full mt-5 justify-around">
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age1_y21mrq.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age2_lupwlo.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age3_hp0bnk.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age4_yqjwcp.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/age5_nlukml.png"
               alt=""
            />
            <img
               src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age6_n4q4fz.png"
               alt=""
            />
         </div>
      </div>
   );
});

export default BaseOnAge;
