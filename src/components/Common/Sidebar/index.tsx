import React from "react";
import { Link } from "react-router-dom";

const Sidebar = React.memo(() => {
   return (
      <div className="flex flex-col">
         <div className="uppercase">hổ trợ khách hàng ▼</div>
         <ul>
            <li>
               <Link to="">Về Yay For Kids</Link>
            </li>
            <li>
               <Link to="">Hướng dẫn mua hàng</Link>
            </li>
            <li>
               <Link to="">Giao hàng và thanh toán</Link>
            </li>
            <li>
               <Link to="">Câu hỏi thường gặp</Link>
            </li>
            <li>
               <Link to="">Điều khoản dịch vụ</Link>
            </li>
         </ul>
         <div className="uppercase">chính sách ▼</div>
         <ul>
            <li>
               <Link to="">Đổi trả bảo hành</Link>
            </li>
            <li>
               <Link to="">Bảo mật</Link>
            </li>
         </ul>
      </div>
   );
});

export default Sidebar;
