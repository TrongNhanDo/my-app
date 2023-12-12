import React from 'react';
import Sidebar from '../../../Common/Sidebar';
import { useTranslation } from 'react-i18next';

const ShoppingGuide = React.memo(() => {
  const { t } = useTranslation(['user_shopping_guide']);

  return (
    <div className="div-contai flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-white rounded p-5 text-justify">
        <div className="uppercase text-2xl font-bold text-center">
          {t('title')}
        </div>
        <div className="flex flex-col mt-5">
          <div className="uppercase font-bold text-xl">{t('heading1')}</div>
          <div className="my-2">{t('text1')}</div>
          <div className="uppercase font-bold text-xl">{t('heading2')}</div>
          <div className="my-2">{t('text2')}</div>
          <ul>
            <li className="ps-5">{t('text3')}</li>
            <li className="ps-5">{t('text4')}</li>
          </ul>
          <div className="my-2">{t('text5')}</div>
          <div className="uppercase font-bold text-xl">{t('heading3')}</div>
          <div className="mt-2">{t('text6')}</div>
          <div className="mt-2">{t('text7')}</div>
          <div className="mt-2 text-base font-bold">{t('heading4')}</div>
          <ul className="my-2">
            <li className="ps-5">{t('text8')}</li>
            <li className="ps-5">{t('text9')}</li>
            <li className="ps-5">{t('text10')}</li>
          </ul>
          <div className="uppercase font-bold text-xl">{t('heading5')}</div>
          <div className="mt-2">{t('text11')}</div>
          <div className="mt-2">{t('text12')}</div>
          <div className="mt-2 font-bold">
            <i>{t('text13')}</i>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShoppingGuide;
