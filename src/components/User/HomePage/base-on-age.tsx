import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const BaseOnAge = React.memo(() => {
  const { t } = useTranslation(['user_home']);

  return (
    <div className="div-age w-full flex flex-col bg-white rounded p-5 mt-5">
      <div className="div-age-top flex w-full items-center">
        <div className="uppercase text-2xl font-bold w-1/2">
          {t('base_on_age')}
        </div>
        <div className="w-1/2 flex justify-end">
          <Link to="/product-list" className="hover:text-blue-500">
            {t('see_more')}
          </Link>
        </div>
      </div>
      <div className="div-age-bot flex w-full mt-5 justify-around">
        <Link to="/product-list?ageId=1">
          <img
            src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age1_y21mrq.png"
            alt=""
          />
        </Link>
        <Link to="/product-list?ageId=2">
          <img
            src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age2_lupwlo.png"
            alt=""
          />
        </Link>
        <Link to="/product-list?ageId=3">
          <img
            src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age3_hp0bnk.png"
            alt=""
          />
        </Link>
        <Link to="/product-list?ageId=4">
          <img
            src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age4_yqjwcp.png"
            alt=""
          />
        </Link>
        <Link to="/product-list?ageId=5">
          <img
            src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/age5_nlukml.png"
            alt=""
          />
        </Link>
        <Link to="/product-list?ageId=6">
          <img
            src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709992/childrenToy/age6_n4q4fz.png"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
});

export default BaseOnAge;
