import React from "react";
import Sidebar from "../../../Common/Sidebar";

const Warranty = React.memo(() => {
   return (
      <div className="div-contai flex mt-5">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               đổi trả bảo hành
            </div>
            <div className="flex flex-col mt-5">
               <div className="item-col">
                  <p>
                     <span style={{ color: "#356d69" }}>
                        <em>
                           Quý khách vui lòng kiểm tra lại sản phẩm trước khi
                           thanh toán và rời cửa hàng.
                        </em>
                     </span>
                  </p>
                  <p>
                     <span style={{ color: "#356d69" }}>
                        <span style={{ color: "#fec340" }}>
                           <strong>
                              <em>Yay – For Kids</em>
                           </strong>
                        </span>
                        <em>
                           {" "}
                           không áp dụng trả hàng &amp; hoàn lại tiền sau khi
                           mua.
                        </em>
                     </span>
                  </p>
                  <h3>
                     <span style={{ color: "#356d69" }}>
                        <strong>Điều kiện đổi hàng:</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        » Hàng Đổi là hàng hóa mua tại cửa hàng{" "}
                        <span style={{ color: "#99cbc3" }}>
                           <strong>
                              <span style={{ color: "#fec340" }}>
                                 Yay – For Kids
                              </span>{" "}
                           </strong>
                        </span>
                        và phải có Hoá đơn tính tiền tương ứng đính kèm khi đổi
                        hàng.
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        »&nbsp;Sản phẩm được áp dụng đổi hàng đối với hàng mua
                        tại cửa hàng và đơn đặt hàng online trong vòng 14 ngày
                        (kể từ ngày nhận hàng).
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        »&nbsp;Sản phẩm{" "}
                        <span style={{ color: "#e5657c" }}>
                           được áp dụng đổi hàng
                        </span>{" "}
                        trong các điều kiện sau:
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        – Sản phẩm bị lỗi kỹ thuật do nhà sản xuất hoặc thiếu
                        chi tiết nhưng bên ngoài sản phẩm không bị trầy xước/
                        bể/ vỡ/ móp méo.
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        – Sản phẩm khách hàng nhận không đúng sản phẩm đã đặt
                        hàng và sản phẩm còn bao bì nguyên vẹn, không bị rách/
                        móp.
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        <strong>Đối với đơn hàng online</strong>
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        – Nếu Quý khách kiên quyết trả lại hàng khi bưu tá đến
                        giao, Quý khách vui lòng thanh toán các chi phí giao
                        hàng: phí vận chuyển và phí dịch vụ cộng thêm (nếu có)
                        cho bưu cục.
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        – Sản phẩm đổi trả phải còn hóa đơn bán hàng do{" "}
                        <span style={{ color: "#99cbc3" }}>
                           <strong>
                              <span style={{ color: "#fec340" }}>
                                 Yay – For Kids
                              </span>
                           </strong>
                        </span>{" "}
                        gửi kèm theo kiện hàng.
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        » Giá trị hàng đổi phải bằng hoặc lớn hơn sản phẩm đã
                        mua trước đó; nếu sản phẩm đổi có giá trị nhỏ hơn thì số
                        dư còn lại sẽ được tính thành credit để lại cửa hàng cho
                        lần thanh toán tiếp theo.
                     </span>
                  </p>
                  <h3>
                     <span style={{ color: "#356d69" }}>
                        <strong>
                           Các trường hợp bị từ chối đổi hàng, bảo hành:
                        </strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        › Sản phẩm bị hư hại do thiên tai, hỏa hoạn, lụt lội,
                        sét đánh…
                     </span>
                  </p>
                  <div
                     className="mailmunch-forms-in-post-middle"
                     style={{ display: "none !important" }}
                  />
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        › Sản phẩm bị đặt tại nơi bụi bẩn, ẩm ướt;
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        › Sản phẩm bị biến dạng do tác động nhiệt, tác động lực
                        bên ngoài;
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        › Sản phẩm có vết mốc, rỉ sét hoặc bị ăn mòn, oxy hóa
                        bởi hóa chất;
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        › Sản phẩm sử dụng không đúng theo hướng dẫn của{" "}
                        <span style={{ color: "#99cbc3" }}>
                           <strong>
                              <span style={{ color: "#fec340" }}>
                                 Yay – For Kids
                              </span>
                           </strong>
                        </span>{" "}
                        nên gây ra hư hỏng;
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        › Quá thời hạn đổi trả 14 (mười bốn) ngày đối với khách
                        nội thành; và 17 (mười bảy) ngày đối với khách ngoài
                        tỉnh kể từ ngày nhận hàng.
                     </span>
                  </p>
                  <h3>
                     <span style={{ color: "#356d69" }}>
                        <strong>Cách thức gửi trả hàng:</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        –&nbsp;<strong>Bước 1:&nbsp;</strong>Khách hàng chụp
                        hình/ quay clip sản phẩm bị lỗi hoặc bị hư hỏng… gửi
                        thông tin và yêu cầu trả hàng qua một trong các kênh
                        liên lạc của{" "}
                        <span style={{ color: "#99cbc3" }}>
                           <strong>
                              <span style={{ color: "#fec340" }}>
                                 Yay – For Kids
                              </span>
                           </strong>
                        </span>{" "}
                        (hotline, facebook, zalo)
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        –&nbsp;<strong>Bước 2:&nbsp;</strong>Khách hàng gửi trả
                        hàng theo 1 trong những cách sau:
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        Cách 1: Khách hàng mang hàng trực tiếp đến trả tại cửa
                        hàng.
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        Cách 2:&nbsp;Gửi về địa chỉ cửa hàng trên kiện hàng
                        khách đã nhận.
                     </span>
                  </p>
                  <p>&nbsp;</p>
               </div>
            </div>
         </div>
      </div>
   );
});

export default Warranty;
