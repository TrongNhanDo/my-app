import React from "react";
import Sidebar from "../../../Common/Sidebar";
import { useTranslation } from "react-i18next";

const DeliveryPayment = React.memo(() => {
   const { t } = useTranslation(["user_payment_delivery"]);

   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t("title")}
            </div>
            <div className="flex flex-col mt-5">
               <div className="text-xl">{t("text1")}</div>
               <div className="uppercase font-bold text-xl my-2">
                  {t("heading1")}
               </div>
               <ul className="">
                  <li className="ps-5 flex">{t("text2")}</li>
                  <li className="ps-5">{t("text3")}</li>
               </ul>
               <div className="uppercase font-bold text-xl my-2">
                  {t("heading2")}
               </div>
               <ul className="">
                  <li className="ps-5">{t("text4")}</li>
                  <li className="ps-5">{t("text5")}</li>
                  <ul className="ms-10">
                     <li className="ps-5 py-3">{t("text6")}</li>
                     <ul className="ms-10">
                        <li className="ps-5">{t("text7")}</li>
                        <li className="ps-5">{t("text8")}</li>
                        <li className="ps-5">{t("text9")}</li>
                        <li className="ps-5">{t("text10")}</li>
                     </ul>
                     <li className="ps-5 pt-3">{t("text11")}</li>
                  </ul>
                  <li className="ps-5 mt-3">{t("text12")}</li>
               </ul>
            </div>
         </div>
      </div>
   );
});

export default DeliveryPayment;
