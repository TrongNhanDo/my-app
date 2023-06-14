import React from "react";
import { Link } from "react-router-dom";

const NewProducts = React.memo(() => {
   return (
      <div className="w-full flex flex-col bg-white rounded p-5 mt-5">
         <div className="flex w-full items-center">
            <div className="uppercase text-2xl font-bold w-1/2">
               sản phẩm mới
            </div>
            <div className="w-1/2 flex justify-end">
               <Link to="" className="hover:text-blue-500">
                  Xem tất cả
               </Link>
            </div>
         </div>
         <div className="flex w-full mt-5 justify-center">
            Sản phẩm đang được cập nhật
         </div>
      </div>
   );
});

export default NewProducts;
