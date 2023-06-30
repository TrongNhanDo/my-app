import React from "react";
import Sidebar from "../../Common/Sidebar";
import { useTranslation } from "react-i18next";

const About = React.memo(() => {
   const { t } = useTranslation();

   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t("user.about.title")}
            </div>
            <div className="flex flex-col mt-5">
               <div className="">{t("user.about.text1")}</div>
               <div className="mt-3">{t("user.about.text2")}</div>
               <div className="text-2xl font-bold mt-3">
                  {t("user.about.vision")}
               </div>
               <div className="mt-3 ps-5">{t("user.about.text3")}</div>
               <div className="text-2xl font-bold mt-3">
                  {t("user.about.mission")}
               </div>
               <div className="mt-3 ps-5">{t("user.about.text4")}</div>
               <div className="text-2xl font-bold mt-3">
                  {t("user.about.aspires")}
               </div>
               <div className="mt-3 ps-5">{t("user.about.text5")}</div>
            </div>
         </div>
      </div>
   );
});

export default About;
