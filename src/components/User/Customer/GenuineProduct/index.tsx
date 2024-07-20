import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../Common/Sidebar';

const GenuineProduct = React.memo(() => {
  const { t } = useTranslation(['user_genuine_product']);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  return (
    <div className="div-contai about flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-white rounded p-5 text-justify">
        <div className="uppercase text-2xl font-bold text-center">
          {t('title')}
        </div>
        <div className="text-base mt-5">
          <div>{t('text1')}</div>
          <div className="my-3">{t('text2')}</div>
          <div>{t('text3')}</div>
        </div>
        <div className="text-base mt-3">
          <div>
            <button
              type="button"
              className="text-base font-bold w-fit text-left"
              onClick={() => setCheck1(!check1)}
            >
              {check1 ? '🔽 ' : '▶️ '}
              {t('heading1')}
            </button>
            {check1 && (
              <img
                src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1689595110/childrenToy/rmjv7foevogtix3j6it3.png"
                alt=""
                className="w-full h-auto object-cover mt-2 mb-5"
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className="text-base font-bold w-fit text-left"
              onClick={() => setCheck2(!check2)}
            >
              {check2 ? '🔽 ' : '▶️ '}
              {t('heading2')}
            </button>
            {check2 && (
              <img
                src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1689595109/childrenToy/qqrbva1mxtttaoa8e8ap.png"
                alt=""
                className="w-full h-auto object-cover mt-2 mb-5"
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className="text-base font-bold w-fit text-left"
              onClick={() => setCheck3(!check3)}
            >
              {check3 ? '🔽 ' : '▶️ '}
              {t('heading3')}
            </button>
            {check3 && (
              <img
                src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1689595108/childrenToy/jlvmikrsmp2nmuss6use.png"
                alt=""
                className="w-full h-auto object-cover mt-2 mb-5"
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className="text-base font-bold w-fit text-left"
              onClick={() => setCheck4(!check4)}
            >
              {check4 ? '🔽 ' : '▶️ '}
              {t('heading4')}
            </button>
            {check4 && (
              <img
                src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1689595111/childrenToy/wnyjs2hba0k0ilt3owkw.png"
                alt=""
                className="w-full h-auto object-cover mt-2 mb-5"
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className="text-base font-bold w-fit text-left"
              onClick={() => setCheck5(!check5)}
            >
              {check5 ? '🔽 ' : '▶️ '}
              {t('heading5')}
            </button>
            {check5 && (
              <img
                src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1689595104/childrenToy/k7lefdw6li7ligj3fvex.jpg"
                alt=""
                className="w-full h-auto object-cover mt-2 mb-5"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default GenuineProduct;
