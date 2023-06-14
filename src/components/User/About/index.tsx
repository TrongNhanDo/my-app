import React from "react";
import Sidebar from "../../Common/Sidebar";

const About = React.memo(() => {
   return (
      <div className="div-contai flex mt-5">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               giới thiệu về dtn shop
            </div>
            <div className="flex flex-col mt-5">
               <div className="">
                  Yay For Kids là đơn vị kinh doanh Đồ chơi Giáo dục, kích thích
                  trí thông minh và phát triển năng lực sáng tạo của trẻ. Với
                  mong muốn đem đến những món đồ chơi trí tuệ chất lượng tốt,
                  giá cả phải chăng, phục vụ cho nhu cầu học mà chơi, chơi mà
                  học của trẻ em Việt Nam, chúng tôi luôn tìm kiếm những đối tác
                  uy tín, có kinh nghiệm lâu năm trong ngành thiết kế, phát
                  triển và sản xuất Đồ chơi Trí Tuệ. Các thương hiệu mà chúng
                  tôi phân phối đều đạt nhiều tiêu chuẩn an toàn và thỏa mãn các
                  điều kiện xuất khẩu châu Âu. Chúng tôi cho rằng, một món đồ
                  chơi Giáo dục đạt chuẩn phải vừa đem lại niềm vui cho trẻ,
                  nhưng cũng phải đem lại sự an tâm cho ba mẹ. Do đó, việc lựa
                  chọn các chất liệu an toàn là vô cùng quan trọng.
               </div>
               <div className="mt-3">
                  Yay cũng rất quan tâm đến trải nghiệm người dùng, luôn trân
                  trọng những tình cảm mà khách hàng muốn gửi gắm qua các món
                  quà dành tặng bạn bè, người thân. Vậy nên ở Yay, chúng tôi
                  chăm chút, chỉn chu đến từng chi tiết nhỏ nhất mỗi khi gói quà
                  tặng theo yêu cầu của khách, tìm mọi cách để thể hiện tình cảm
                  của khách hàng một cách tốt nhất.
               </div>
               <div className="text-2xl font-bold mt-3">Tầm Nhìn</div>
               <div className="mt-3 ps-5">
                  » Trở thành công ty hàng đầu về đồ chơi trí tuệ, phát triển
                  bền vững vì lợi ích người tiêu dùng.
               </div>
               <div className="text-2xl font-bold mt-3">Sứ Mệnh</div>
               <div className="mt-3 ps-5">
                  » Tạo ra một tuổi thơ đầy niềm vui cho trẻ, tạo nên thế hệ trẻ
                  em phát triển sáng tạo về tư duy và đầy đủ về cảm xúc.
               </div>
               <div className="text-2xl font-bold mt-3">Khát vọng</div>
               <div className="mt-3 ps-5">
                  » Cố gắng hết sức để góp phần nâng cao tầm vóc về cảm xúc,
                  phát triển tư duy logic, phát triển trí tuệ cảm xúc cho trẻ em
                  Việt Nam. Tạo ra nhiều hơn nữa những ước mơ, những tài năng
                  sáng tạo, những cảm xúc phấn khởi, vì một tương lai Việt.
               </div>
            </div>
         </div>
      </div>
   );
});

export default About;
