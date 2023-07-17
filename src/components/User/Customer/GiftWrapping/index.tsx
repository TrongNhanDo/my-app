import React from "react";
import Sidebar from "../../../Common/Sidebar";
import { useTranslation } from "react-i18next";

const GiftWrapping = React.memo(() => {
   const { t } = useTranslation();

   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t("user.gift_wrapping.title")}
            </div>
            <div className="mt-5 text-xl text-red-600 font-bold">
               {t("user.gift_wrapping.heading1")}
            </div>
            <div className="text-base mt-5">
               <div>
                  <div className="mb-2">{t("user.gift_wrapping.text1")}</div>
                  <div className="">{t("user.gift_wrapping.text2")}</div>
                  <div className="mb-2 mt-6">
                     {t("user.gift_wrapping.text3")}
                  </div>
                  <div className="">{t("user.gift_wrapping.text4")}</div>
                  <div className="flex flex-col items-center p-10">
                     <img
                        src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1689598232/childrenToy/dojqqzesi0iuqagez5wf.gif"
                        alt=""
                        className="w-9/12 h-auto"
                     />
                     <p className="text-center">
                        {t("user.gift_wrapping.text10")}
                     </p>
                  </div>
               </div>
               <div className="text-xl font-bold my-3">
                  {t("user.gift_wrapping.heading2")}
               </div>
               <div>
                  <div className="">{t("user.gift_wrapping.text5")}</div>
                  <div className="">{t("user.gift_wrapping.text6")}</div>
                  <div className="">{t("user.gift_wrapping.text7")}</div>
                  <div className="">{t("user.gift_wrapping.text8")}</div>
               </div>
               <div className=" mt-6">{t("user.gift_wrapping.text9")}</div>
            </div>
         </div>
      </div>
   );
});

export default GiftWrapping;
