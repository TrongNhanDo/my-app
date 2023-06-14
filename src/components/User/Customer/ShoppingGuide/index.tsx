import React from "react";
import Sidebar from "../../../Common/Sidebar";

const ShoppingGuide = React.memo(() => {
   return (
      <div className="div-contai flex mt-5">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-4">
            <div className="uppercase text-2xl font-bold text-center">
               hướng dẫn mua hàng
            </div>
            <div className="flex mt-5">Nội dung đang được cập nhật</div>
         </div>
      </div>
   );
});

export default ShoppingGuide;
