import React from "react";
import Sidebar from "../../../Common/Sidebar";

const DeliveryPayment = React.memo(() => {
   return (
      <div className="div-contai flex mt-5">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               giao hàng và thanh toán
            </div>
            <div className="flex flex-col mt-5">
               <div className="text-xl">
                  Hiện tại, Yay đang có 2 phương thức giao hàng và 3 phương thức
                  thanh toán như sau:
               </div>
               <div className="uppercase font-bold text-xl my-2">
                  PHƯƠNG THỨC GIAO HÀNG:
               </div>
               <ul className="">
                  <li className="ps-5 flex">
                     - Giao hỏa tốc trong ngày: Dành cho khách hàng ở thành phố
                     Hồ Chí Minh. Quý khách vui lòng ghi chú rõ trong đơn hàng
                     hoặc liên hệ trực tiếp đến Fanpage hoặc hotline sau khi đặt
                     hàng để chúng tôi có thể ưu tiên giao hàng cho quý khách.
                  </li>
                  <li className="ps-5">
                     - Giao hàng thông thường: Chúng tôi sẽ tiến hành giao hàng
                     cho quý khách thông qua các đơn vị vận chuyển trung gian.
                     Thời gian giao hàng dự kiến cho khách hàng ở TPHCM là 1-2
                     ngày và khách hàng ngoại tỉnh là 3-4 ngày.
                  </li>
               </ul>
               <div className="uppercase font-bold text-xl my-2">
                  PHƯƠNG THỨC THANH TOÁN:
               </div>
               <ul className="">
                  <li className="ps-5">
                     - Thanh toán tiền mặt khi nhận hàng – COD (áp dụng cho mọi
                     đơn hàng có địa chỉ nhận hàng ở Việt Nam).
                  </li>
                  <li className="ps-5">
                     - Thanh toán chuyển khoản: Sau khi khách hàng đặt hàng
                     thành công, hệ thống sẽ gửi email xác nhận đặt hàng gồm có
                     mã đơn hàng và thông tin chuyển khoản. Khách hàng có thể
                     chuyển qua iBanking, chuyển tiền mặt ở ngân hàng, chuyển
                     qua ATM… Khi chuyển quý khách lưu ý ghi rõ mã đơn hàng để
                     tiện trong việc kiểm tra và cập nhật thanh toán.
                  </li>
                  <ul className="ms-10">
                     <li className="ps-5 py-3">- Thông tin chuyển khoản:</li>
                     <ul className="ms-10">
                        <li className="ps-5">
                           - Tên người nhận: xxxx xxxx xxxx
                        </li>
                        <li className="ps-5">- Số tài khoản: xxxxxxxxxx</li>
                        <li className="ps-5">- Tên ngân hàng: Ngân hàng x</li>
                        <li className="ps-5">
                           - Nội dung chuyển khoản: Mã đơn hàng & Số điện thoại
                           mua hàng
                        </li>
                     </ul>
                     <li className="ps-5 pt-3">
                        - Trường hợp quý khách chuyển khoản qua cây ATM không
                        ghi được nội dung, vui lòng giữ lại biên nhận và gọi vào
                        hotline 0978899150 hoặc gửi tin nhắn vào fanpage để được
                        hỗ trợ xác nhận thanh toán. Sau khi đơn hàng được cập
                        nhật thanh toán thành công sẽ được xử lý và ship đi sớm
                        nhất có thể.
                     </li>
                  </ul>
                  <li className="ps-5 mt-3">
                     - Thanh toán qua VNPAY: Sau khi khách hàng bấm vào Hoàn tất
                     đơn hàng, trang web sẽ hiển thị giao diện thanh toán, quý
                     khách chọn quét mã QR để tiến hành thanh toán. Trong trường
                     hợp quý khách chưa kịp thanh toán mà lỡ thoát khỏi giao
                     diện hoặc mã QR hết hạn, vui lòng liên hệ trực tiếp với
                     fanpage hoặc hotline 0978899150 để được hỗ trợ thanh toán
                     và xác nhận đơn hàng.
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
});

export default DeliveryPayment;
