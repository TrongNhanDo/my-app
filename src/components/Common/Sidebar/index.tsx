import React from "react";
import { Link } from "react-router-dom";

const Sidebar = React.memo(() => {
   return (
      <div className="flex flex-col px-2">
         <div className="uppercase text-xl font-bold">hổ trợ khách hàng ▼</div>
         <ul>
            <li className="py-2">
               <Link to="/about" className="hover:text-blue-500">
                  Về Yay For Kids
               </Link>
            </li>
            <li className="py-2">
               <Link to="/shopping-guide" className="hover:text-blue-500">
                  Hướng dẫn mua hàng
               </Link>
            </li>
            <li className="py-2">
               <Link to="/delivery-and-payment" className="hover:text-blue-500">
                  Giao hàng và thanh toán
               </Link>
            </li>
            <li className="py-2">
               <Link to="/questions" className="hover:text-blue-500">
                  Câu hỏi thường gặp
               </Link>
            </li>
            <li className="py-2">
               <Link to="/policy" className="hover:text-blue-500">
                  Điều khoản dịch vụ
               </Link>
            </li>
         </ul>
         <div className="uppercase text-xl font-bold mt-3">chính sách ▼</div>
         <ul>
            <li className="py-2">
               <Link to="/warranty" className="hover:text-blue-500">
                  Đổi trả bảo hành
               </Link>
            </li>
            <li className="py-2">
               <Link to="/security" className="hover:text-blue-500">
                  Bảo mật
               </Link>
            </li>
         </ul>
      </div>
   );
});

export default Sidebar;
