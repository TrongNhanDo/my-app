import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "../../../api/callApi/callApi";
import { ProductType } from "./types";
import Loader from "../../Common/Loader/loader";
import { formatCurrency, renderStar } from "../../Common/Logic/logics";

const UserProductDetail = React.memo(() => {
   const { productId } = useParams();
   const navigate = useNavigate();
   const [showLoading, setShowLoading] = useState<boolean>(true);
   const [viewData, setViewData] = useState<ProductType>();
   const [amountNum, setAmountNum] = useState<number>(1);

   const fetchApi = useCallback(async () => {
      const url = `products/${productId}`;
      const response = await callApi(url, "get").catch((err) =>
         console.log({ err })
      );
      if (!response || !response.data) {
         alert("Sản phẩm không tồn tại");
         navigate(-1);
      } else {
         const viewData: ProductType = response.data;
         setViewData(viewData);
      }
      setShowLoading(false);
   }, [productId, navigate]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   return (
      <div className="div-contai flex flex-col my-5 bg-white p-5 rounded">
         {showLoading && <Loader />}
         <div className="flex w-full">
            <div className="w-2/12 pe-5">
               {viewData && viewData.images.length ? (
                  viewData.images.map((value: string, index: number) => {
                     return (
                        <img
                           key={index}
                           src={
                              value ||
                              import.meta.env.VITE_IMAGE_NOT_FOUND ||
                              ""
                           }
                           alt=""
                           className="w-full h-auto object-cover rounded"
                        />
                     );
                  })
               ) : (
                  <img
                     src={import.meta.env.VITE_IMAGE_NOT_FOUND || ""}
                     alt=""
                  />
               )}
            </div>
            <div className="w-5/12">
               <img
                  src={
                     viewData && viewData.images[0]
                        ? viewData.images[0]
                        : import.meta.env.VITE_IMAGE_NOT_FOUND || ""
                  }
                  alt=""
                  className="w-full h-auto object-cover rounded"
               />
            </div>
            <div className="w-5/12 px-10 flex flex-col">
               <div className="text-2xl font-bold line-clamp-3">
                  {viewData ? viewData.productName : ""}
               </div>
               <div className="text-xl mt-3 font-bold line-clamp-3">
                  Thương hiệu:{" "}
                  {viewData && viewData.branch
                     ? viewData.branch.branchName
                     : ""}
               </div>
               <div className="text-2xl font-bold mt-3">
                  {viewData ? formatCurrency(viewData.price || 0) : ""}
               </div>
               <div className="flex mt-3">
                  <div>{renderStar(viewData?.rate || 0)}</div>
                  <div className="underline mx-2">0</div>
                  nhận xét
               </div>
               <div className="flex mt-5">
                  <button
                     className="bg-orange-400 p-1 rounded hover:bg-orange-200"
                     onClick={() => setAmountNum(amountNum - 1)}
                  >
                     ➖
                  </button>
                  <span className="text-xl font-bold mx-3">{amountNum}</span>
                  <button
                     className="bg-orange-400 p-1 rounded hover:bg-orange-200"
                     onClick={() => setAmountNum(amountNum + 1)}
                  >
                     ➕
                  </button>
               </div>
               <div className="flex mt-10">
                  <button className="block bg-orange-200 hover:bg-orange-400 py-1 px-5 rounded">
                     Thêm vào giỏ hàng
                  </button>
                  <button className="block bg-orange-400 hover:bg-orange-200 py-1 px-5 rounded ms-5">
                     Mua ngay
                  </button>
               </div>
               <div className="mt-10">
                  <div className="text-xl font-bold ">
                     ĐĂNG KÝ NHẬN THÔNG BÁO KHI MÓN HÀNG NÀY QUAY TRỞ LẠI
                  </div>
                  <form className="mt-3">
                     <input
                        type="email"
                        name="customer-email"
                        id="customer-email"
                        placeholder="Nhập địa chỉ email"
                        className="px-4 py-2 rounded border-solid border-2 border-gray-200"
                     />
                     <button
                        type="button"
                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
                     >
                        Send
                     </button>
                  </form>
               </div>
            </div>
         </div>
         <div className="flex flex-col w-full mt-20">
            <div className="text-xl font-bold">Mô tả sản phẩm</div>
            <div className="mt-4">
               {viewData && viewData.describes ? viewData.describes : ""}
            </div>
         </div>
      </div>
   );
});

export default UserProductDetail;
