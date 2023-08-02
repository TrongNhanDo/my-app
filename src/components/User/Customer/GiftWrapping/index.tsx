import React from 'react';
import Sidebar from '../../../Common/Sidebar';
import { useTranslation } from 'react-i18next';

const GiftWrapping = React.memo(() => {
   const { t } = useTranslation(['user_gift_wrapping']);

   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t('title')}
            </div>
            <div className="mt-5 text-xl text-red-600 font-bold">
               {t('heading1')}
            </div>
            <div className="text-base mt-5">
               <div>
                  <div className="mb-2">{t('text1')}</div>
                  <div className="">{t('text2')}</div>
                  <div className="mb-2 mt-6">{t('text3')}</div>
                  <div className="">{t('text4')}</div>
                  <div className="flex flex-col items-center p-10">
                     <img
                        src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1689598232/childrenToy/dojqqzesi0iuqagez5wf.gif"
                        alt=""
                        className="w-9/12 h-auto"
                     />
                     <p className="text-center">{t('text10')}</p>
                  </div>
               </div>
               <div className="text-xl font-bold my-3">{t('heading2')}</div>
               <div>
                  <div className="">{t('text5')}</div>
                  <div className="">{t('text6')}</div>
                  <div className="">{t('text7')}</div>
                  <div className="">{t('text8')}</div>
               </div>
               <div className=" mt-6">{t('text9')}</div>
            </div>
         </div>
      </div>
   );
});

export default GiftWrapping;
