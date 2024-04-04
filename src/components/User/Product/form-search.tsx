import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const SearchForm = React.memo(() => {
  const { t } = useTranslation(['user_product', 'user_error']);
  const navigate = useNavigate();
  const [searchParamValues] = useSearchParams();
  const [ageId, setAgeId] = useState<string[]>([]);
  const [branchId, setBranchId] = useState<string[]>([]);
  const [skillId, setSkillId] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>('');

  const isSelected = useMemo(() => {
    if (ageId || branchId || skillId || productName) {
      return true;
    }
    return false;
  }, [ageId, branchId, skillId, productName]);

  const handleSubmit = useCallback(() => {
    if (!isSelected) {
      return;
    }

    const url = `?ageId=${ageId ? ageId.toString() : ''}&branchId=${
      branchId ? branchId.toString() : ''
    }&skillId=${skillId ? skillId.toString() : ''}&productName=${
      productName ? productName.trim() : ''
    }`;

    navigate(url, { replace: true });
  }, [navigate, ageId, branchId, skillId, productName, isSelected]);

  const handleClearSearch = useCallback(() => {
    setAgeId([]);
    setBranchId([]);
    setSkillId([]);
    setProductName('');
  }, []);

  useEffect(() => {
    if (searchParamValues.get('ageId')) {
      const item = searchParamValues.get('ageId') || '';
      setAgeId(item.split(','));
    } else {
      setAgeId([]);
    }

    if (searchParamValues.get('branchId')) {
      const item = searchParamValues.get('branchId') || '';
      setBranchId(item.split(','));
    } else {
      setBranchId([]);
    }

    if (searchParamValues.get('skillId')) {
      const item = searchParamValues.get('skillId') || '';
      setSkillId(item.split(','));
    } else {
      setSkillId([]);
    }

    if (searchParamValues.get('productName')) {
      const item = searchParamValues.get('productName') || '';
      setProductName(item);
    } else {
      setProductName('');
    }
  }, [searchParamValues]);

  const handleChangeCheckbox = (
    setValue: React.Dispatch<React.SetStateAction<string[]>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue((prev) => {
      if (e.target.checked) {
        return [...prev, e.target.value];
      }
      return prev.filter((value) => value !== e.target.value);
    });
  };

  return (
    <>
      <div className="flex flex-col w-full">
        {/** BRANCH */}
        <span className="text-xl font-bold">{t('base_on_branch')} 🔽</span>
        <div className="w-full">
          {Array.from({ length: 6 }).map((_, index: number) => (
            <div className="w-1/2 inline-block mt-2">
              <input
                type="checkbox"
                id={`branch${index + 1}`}
                name="branchId"
                value={index + 1}
                className="cursor-pointer"
                checked={branchId.includes((index + 1).toString())}
                onChange={(e) => handleChangeCheckbox(setBranchId, e)}
              />
              <label
                htmlFor={`branch${index + 1}`}
                className="ps-3 cursor-pointer"
              >
                {t(`branch${index + 1}`)}
              </label>
            </div>
          ))}
        </div>
        <hr className="my-5" />

        {/** AGE */}
        <span className="text-xl font-bold">{t('base_on_age')} 🔽</span>
        <div className="w-full">
          {Array.from({ length: 6 }).map((_, index: number) => (
            <div className="w-1/2 inline-block mt-2">
              <input
                type="checkbox"
                id={`age${index + 1}`}
                name="ageId"
                value={index + 1}
                className="cursor-pointer"
                checked={ageId.includes((index + 1).toString())}
                onChange={(e) => handleChangeCheckbox(setAgeId, e)}
              />
              <label
                htmlFor={`age${index + 1}`}
                className="ps-3 cursor-pointer"
              >
                {t(`age${index + 1}`)}
              </label>
            </div>
          ))}
        </div>
        <hr className="my-5" />

        {/** SKILL */}
        <span className="text-xl font-bold mb-2">{t('base_on_skill')} 🔽</span>
        <div className="w-full">
          {Array.from({ length: 6 }).map((_, index: number) => (
            <div className="w-1/2 inline-block mt-2">
              <input
                type="checkbox"
                id={`skill${index + 1}`}
                name="skillId"
                value={index + 1}
                className="cursor-pointer"
                checked={skillId.includes((index + 1).toString())}
                onChange={(e) => handleChangeCheckbox(setSkillId, e)}
              />
              <label
                htmlFor={`skill${index + 1}`}
                className="ps-3 cursor-pointer lb"
              >
                {t(`skill${index + 1}`)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-5" />
      <div className="w-full flex justify-center px-1">
        <input
          type="text"
          name="productName"
          id="productName"
          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder={t('name_placeholder')}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <hr className="my-5" />
      <div className="flex w-full justify-around items-center">
        <Link
          to="/product-list"
          className={`w-fit py-2 px-3 w-2/6 rounded text-white ${
            isSelected
              ? 'hover:bg-red-500 bg-red-600'
              : 'cursor-not-allowed bg-gray-500'
          }`}
          onClick={handleClearSearch}
        >
          {t('uncheck')}
        </Link>
        <button
          type="button"
          className={`block py-2 w-3/6 rounded text-white ${
            isSelected
              ? 'hover:bg-green-700 bg-green-500'
              : 'cursor-not-allowed bg-gray-500'
          }`}
          onClick={handleSubmit}
          disabled={!isSelected}
        >
          {t('search')}
        </button>
      </div>
    </>
  );
});

export default SearchForm;
