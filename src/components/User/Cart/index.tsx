import React from "react";
import { Link } from "react-router-dom";

const CartList = React.memo(() => {
   return (
      <div className="div-contai mx-auto rounded">
         <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
               <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">4 Items</h2>
               </div>
               <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                     Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                     Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                     Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                     Total
                  </h3>
               </div>
               <hr />
               <div className="flex items-center hover:bg-gray-100 py-5">
                  <div className="flex w-2/5">
                     <div className="w-20">
                        <img
                           className="h-24"
                           src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                           alt=""
                        />
                     </div>
                     <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">Iphone 6S</span>
                        <span className="text-red-500 text-xs">Apple</span>
                        <Link
                           to=""
                           className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                           Remove
                        </Link>
                     </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➖
                     </button>
                     <input
                        className="mx-2 border text-center w-2/5 text-2xl"
                        type="text"
                        defaultValue={1}
                     />
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➕
                     </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
               </div>
               <hr />
               <div className="flex items-center hover:bg-gray-100 py-5">
                  <div className="flex w-2/5">
                     <div className="w-20">
                        <img
                           className="h-24"
                           src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                           alt=""
                        />
                     </div>
                     <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">Iphone 6S</span>
                        <span className="text-red-500 text-xs">Apple</span>
                        <Link
                           to=""
                           className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                           Remove
                        </Link>
                     </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➖
                     </button>
                     <input
                        className="mx-2 border text-center w-2/5 text-2xl"
                        type="text"
                        defaultValue={1}
                     />
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➕
                     </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
               </div>
               <hr />
               <div className="flex items-center hover:bg-gray-100 py-5">
                  <div className="flex w-2/5">
                     <div className="w-20">
                        <img
                           className="h-24"
                           src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                           alt=""
                        />
                     </div>
                     <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">Iphone 6S</span>
                        <span className="text-red-500 text-xs">Apple</span>
                        <Link
                           to=""
                           className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                           Remove
                        </Link>
                     </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➖
                     </button>
                     <input
                        className="mx-2 border text-center w-2/5 text-2xl"
                        type="text"
                        defaultValue={1}
                     />
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➕
                     </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
               </div>
               <hr />
               <div className="flex items-center hover:bg-gray-100 py-5">
                  <div className="flex w-2/5">
                     <div className="w-20">
                        <img
                           className="h-24"
                           src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                           alt=""
                        />
                     </div>
                     <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">Iphone 6S</span>
                        <span className="text-red-500 text-xs">Apple</span>
                        <Link
                           to=""
                           className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                           Remove
                        </Link>
                     </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➖
                     </button>
                     <input
                        className="mx-2 border text-center w-2/5 text-2xl"
                        type="text"
                        defaultValue={1}
                     />
                     <button
                        type="button"
                        className="px-2 rounded hover:bg-orange-300"
                     >
                        ➕
                     </button>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                     $400.00
                  </span>
               </div>
               <hr />
               <hr />
               <Link
                  to="/product-list"
                  className="flex font-bold hover:text-orange-400 text-indigo-600 text-sm mt-4 w-fit"
               >
                  ⬅ Continue Shopping
               </Link>
            </div>
            <div
               id="summary"
               className="w-1/4 px-8 py-10 border-solid border-2 border-gray-200"
            >
               <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
               </h1>
               <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                     Items: 3
                  </span>
                  <span className="font-semibold text-sm">590$</span>
               </div>
               <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                     Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm rounded">
                     <option>Giao hàng tiêu chuẩn</option>
                     <option>Giao hàng hỏa tốc ( Nội thành )</option>
                  </select>
               </div>
               <div className="py-10">
                  <label
                     htmlFor="promo"
                     className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                     Promo Code
                  </label>
                  <input
                     type="text"
                     id="promo"
                     placeholder="Enter your code"
                     className="p-2 text-sm w-full rounded"
                  />
               </div>
               <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded">
                  Apply
               </button>
               <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                     <span>Total cost</span>
                     <span>$600</span>
                  </div>
                  <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded">
                     Checkout
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
});

export default CartList;
