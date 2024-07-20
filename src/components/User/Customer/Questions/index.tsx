import React, { useState } from 'react';
import Sidebar from '../../../Common/Sidebar';
import { useTranslation } from 'react-i18next';

const QuestionsFrequently = React.memo(() => {
  const { t } = useTranslation(['user_frequently_question']);
  const [check1, setCheck1] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>(false);
  const [check3, setCheck3] = useState<boolean>(false);

  return (
    <div className="div-contai about flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-white rounded p-5 text-justify">
        <div className="uppercase text-2xl font-bold text-center">
          {t('title')}
        </div>
        <div className="div-question flex flex-col mt-5">
          <button
            type="button"
            className="text-xl font-bold w-fit"
            onClick={() => setCheck1(!check1)}
          >
            {check1 ? '🔽 ' : '▶️ '}
            {t('heading1')}
          </button>
          {check1 && (
            <div>
              <i>{t('text1')}</i>
            </div>
          )}
          <button
            type="button"
            className="text-xl font-bold w-fit mt-2"
            onClick={() => setCheck2(!check2)}
          >
            {check2 ? '🔽 ' : '▶️ '}
            {t('heading2')}
          </button>
          {check2 && (
            <div>
              <i>{t('text2')}</i>
            </div>
          )}
          <button
            type="button"
            className="text-xl font-bold w-fit mt-2"
            onClick={() => setCheck3(!check3)}
          >
            {check3 ? '🔽 ' : '▶️ '}
            {t('heading3')}
          </button>
          {check3 && (
            <div>
              <i>{t('text3')}</i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default QuestionsFrequently;
