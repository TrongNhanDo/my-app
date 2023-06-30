import React from "react";
import Sidebar from "../../../Common/Sidebar";
import { useTranslation } from "react-i18next";

const ShoppingGuide = React.memo(() => {
   const { t } = useTranslation();

   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t("user.shopping_guide.title")}
            </div>
            <div className="flex flex-col mt-5">
               <div className="uppercase font-bold text-xl">
                  {t("user.shopping_guide.heading1")}
               </div>
               <div className="my-2">{t("user.shopping_guide.text1")}</div>
               <div className="uppercase font-bold text-xl">
                  {t("user.shopping_guide.heading2")}
               </div>
               <div className="my-2">{t("user.shopping_guide.text2")}</div>
               <ul>
                  <li className="ps-5">{t("user.shopping_guide.text3")}</li>
                  <li className="ps-5">{t("user.shopping_guide.text4")}</li>
               </ul>
               <div className="my-2">{t("user.shopping_guide.text5")}</div>
               <div className="uppercase font-bold text-xl">
                  {t("user.shopping_guide.heading3")}
               </div>
               <div className="mt-2">{t("user.shopping_guide.text6")}</div>
               <div className="mt-2">{t("user.shopping_guide.text7")}</div>
               <div className="mt-2 text-base font-bold">
                  {t("user.shopping_guide.heading4")}
               </div>
               <ul className="my-2">
                  <li className="ps-5">{t("user.shopping_guide.text8")}</li>
                  <li className="ps-5">{t("user.shopping_guide.text9")}</li>
                  <li className="ps-5">{t("user.shopping_guide.text10")}</li>
               </ul>
               <div className="uppercase font-bold text-xl">
                  {t("user.shopping_guide.heading5")}
               </div>
               <div className="mt-2">{t("user.shopping_guide.text11")}</div>
               <div className="mt-2">{t("user.shopping_guide.text12")}</div>
               <div className="mt-2 font-bold">
                  <i>{t("user.shopping_guide.text13")}</i>
               </div>
            </div>
         </div>
      </div>
   );
});

export default ShoppingGuide;
