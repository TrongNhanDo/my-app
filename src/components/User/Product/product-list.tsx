import React, { useCallback, useEffect, useMemo, useState } from "react";
import { callApi } from "../../../api/callApi/callApi";
import { DataPropsType, ProductType } from "./types";
import { formatCurrency, scrollTop } from "../../Common/Logic/logics";
import Loader from "../../Common/Loader/loader";

const UserProductList = React.memo(() => {
   const [viewData, setViewData] = useState<DataPropsType>();
   const [showLoading, setShowLoading] = useState<boolean>(true);
   const dataPerPage = import.meta.env.VITE_PER_PAGE || 10;
   const [currentPage, setCurrentPage] = useState<number>(1);

   const fetchApi = useCallback(async () => {
      setCurrentPage(1);
      const response = await callApi("products/paginate", "post", {
         perPage: dataPerPage,
         page: 1,
      }).catch((err) => console.log({ err }));
      const data: DataPropsType = response.data || [];
      if (data && data.returnCnt) {
         setViewData(data);
      }
      setShowLoading(false);
      scrollTop();
   }, [dataPerPage]);

   const changePage = useCallback(async (perPage: number, page: number) => {
      setShowLoading(true);
      setCurrentPage(page);
      const response = await callApi("products/paginate", "post", {
         perPage: perPage || 10,
         page: page || 1,
      }).catch((err) => console.log({ err }));
      const data: DataPropsType = response.data || null;
      setViewData(data);
      scrollTop();
      setShowLoading(false);
   }, []);

   const Pagination = useMemo(() => {
      const buttons = [];
      if (viewData && viewData.totalPage) {
         for (let index = 1; index <= viewData.totalPage; index++) {
            const isCurrentPage = currentPage === index;
            buttons.push(
               <button
                  key={index}
                  type="button"
                  className={`focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
                     isCurrentPage
                        ? "bg-gray-400 cursor-not-allowed"
                        : "hover:bg-green-800"
                  }`}
                  onClick={() => changePage(dataPerPage, index)}
                  disabled={isCurrentPage}
               >
                  {index}
               </button>
            );
         }
      }
      return buttons.length > 0 ? buttons : [];
   }, [changePage, viewData, dataPerPage, currentPage]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   const renderStar = useCallback((rate: number) => {
      const stars = [];
      for (let index = 1; index <= 5; index++) {
         stars.push(
            <button
               key={index}
               type="button"
               className="w-fit inline-block"
               disabled={true}
            >
               {index <= rate ? (
                  <i
                     className="fa-solid fa-star"
                     style={{ color: "#d2d51a" }}
                  ></i>
               ) : (
                  <i className="fa-regular fa-star"></i>
               )}
            </button>
         );
      }
      return stars || [];
   }, []);

   return (
      <div className="div-contai">
         {showLoading && <Loader />}
         {viewData && viewData.products && viewData.products.length ? (
            <>
               {viewData.products.map((value: ProductType, index: number) => (
                  <div className="w-1/4 inline-block p-4" key={index}>
                     <div className="flex flex-col w-full bg-white p-4 rounded border-solid border-2 border-gray-200">
                        <img
                           src={
                              value.images && value.images[0]
                                 ? value.images[0]
                                 : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                           }
                           alt=""
                           className="w-full h-52 object-cover rounded"
                        />
                        <div className="font-bold mt-2 mb-1 line-clamp-2 text-center">
                           {value.productName || ""}
                        </div>
                        <div className="text-center">
                           Branch:{" "}
                           <span className="font-bold">
                              {value.branch && value.branch.branchName
                                 ? value.branch.branchName
                                 : ""}
                           </span>
                        </div>
                        <div className="text-center font-bold text-xl text-orange-800">
                           {value.price
                              ? formatCurrency(value.price, "VND", "vi")
                              : "0"}
                        </div>
                        <div className="flex justify-center">
                           {renderStar && renderStar.length ? (
                              renderStar(value.rate || 0)
                           ) : (
                              <span>Chưa có lượt đánh giá</span>
                           )}
                        </div>
                        <button className="block w-full bg-blue-400 rounded py-1 mt-3 hover:bg-blue-500">
                           Chi tiết sản phẩm
                        </button>
                     </div>
                  </div>
               ))}
               <div className="flex w-full justify-center mt-3">
                  {Pagination.length && Pagination}
               </div>
            </>
         ) : (
            <>
               <div className="flex justify-center py-10">
                  Sản phẩm đang được cập nhật
               </div>
            </>
         )}
      </div>
   );
});

export default UserProductList;
