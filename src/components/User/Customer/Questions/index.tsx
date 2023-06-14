import React, { useState } from "react";
import Sidebar from "../../../Common/Sidebar";

const QuestionsFrequently = React.memo(() => {
   const [check1, setCheck1] = useState<boolean>(false);
   const [check2, setCheck2] = useState<boolean>(false);
   const [check3, setCheck3] = useState<boolean>(false);

   return (
      <div className="div-contai flex mt-5">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               câu hỏi thường gặp
            </div>
            <div className="flex flex-col mt-5">
               <button
                  type="button"
                  className="text-xl font-bold w-fit"
                  onClick={() => setCheck1(!check1)}
               >
                  {check1 ? "🔽" : "▶️"}Tôi theo dõi đơn hàng của mình ở đâu?
               </button>
               {check1 && (
                  <div>
                     <i>
                        Quý khách có thể vào Tài khoản {">"} Đơn hàng để biết
                        mình đã đặt những đơn hàng nào và bao gồm những sản phẩm
                        gì. Nếu như quý khách muốn theo dõi đơn hàng của mình
                        chi tiết và cụ thể hơn nữa (đơn vị vận chuyển, lộ trình
                        vận chuyển, thời gian giao hàng, mã vận đơn,…), vui lòng
                        liên hệ trực tiếp đến fanpage của Yay hoặc gọi hotline
                        để chúng tôi có thể cung cấp thông tin cho quý khách.
                     </i>
                  </div>
               )}
               <button
                  type="button"
                  className="text-xl font-bold w-fit mt-2"
                  onClick={() => setCheck2(!check2)}
               >
                  {check2 ? "🔽" : "▶️"}Tôi không hài lòng với sản phẩm và muốn
                  đổi/trả thì phải làm như thế nào?
               </button>
               {check2 && (
                  <div>
                     <i>
                        Mời quý khách tham khảo chính sách đổi trả hàng của
                        chúng tôi tại ĐÂY. Ngoài ra, nếu như quý khách chưa vừa
                        ý với bất kỳ khía cạnh nào, quý khách có thể góp ý trực
                        tiếp với chúng tôi thông qua fanpage chính thức. Yay xin
                        tiếp nhận ý kiến xây dựng của quý khách để có thể phục
                        vụ quý khách tốt hơn trong tương lai.
                     </i>
                  </div>
               )}
               <button
                  type="button"
                  className="text-xl font-bold w-fit mt-2"
                  onClick={() => setCheck3(!check3)}
               >
                  {check3 ? "🔽" : "▶️"}Sản phẩm của Yay có đáng tin không?
               </button>
               {check3 && (
                  <div>
                     <i>
                        Chúng tôi có thể khẳng định rằng, tất cả sản phẩm của
                        chúng tôi đều là hàng nhập khẩu chính hãng có giấy chứng
                        nhận ISO9001, XUẤT KHẨU CHÂU ÂU, FAMA DISNEY,… từ các
                        hãng đồ chơi lớn trên thế giới như MIDEER, TOI, AVENIR,…
                        đảm bảo được độ an toàn và thân thiện với trẻ nhỏ.
                     </i>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
});

export default QuestionsFrequently;
