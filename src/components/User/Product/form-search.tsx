import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const SearchForm = React.memo(() => {
   const { t } = useTranslation(['user_product', 'user_error']);
   const navigate = useNavigate();
   const [searchParamValues] = useSearchParams();
   const [ageId, setAgeId] = useState<string>('');
   const [branchId, setBranchId] = useState<string>('');
   const [skillId, setSkillId] = useState<string>('');
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

      const url = `?ageId=${ageId ? ageId.trim() : ''}&branchId=${
         branchId ? branchId.trim() : ''
      }&skillId=${skillId ? skillId.trim() : ''}&productName=${
         productName ? productName.trim() : ''
      }`;

      navigate(url, { replace: true });
   }, [navigate, ageId, branchId, skillId, productName, isSelected]);

   const handleClearSearch = useCallback(() => {
      setAgeId('');
      setBranchId('');
      setSkillId('');
      setProductName('');
   }, []);

   useEffect(() => {
      if (searchParamValues.get('ageId')) {
         const item = searchParamValues.get('ageId') || '';
         setAgeId(item);
      } else {
         setAgeId('');
      }

      if (searchParamValues.get('branchId')) {
         const item = searchParamValues.get('branchId') || '';
         setBranchId(item);
      } else {
         setBranchId('');
      }

      if (searchParamValues.get('skillId')) {
         const item = searchParamValues.get('skillId') || '';
         setSkillId(item);
      } else {
         setSkillId('');
      }

      if (searchParamValues.get('productName')) {
         const item = searchParamValues.get('productName') || '';
         setProductName(item);
      } else {
         setProductName('');
      }
   }, [searchParamValues]);

   return (
      <>
         <div className="flex flex-col w-full">
            <span className="text-xl font-bold">{t('base_on_branch')} 🔽</span>
            <div className="flex mt-4">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch1"
                     name="branchId"
                     value="1"
                     className="cursor-pointer"
                     checked={branchId === '1'}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch1" className="ps-3 cursor-pointer">
                     {t('branch1')}
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch2"
                     name="branchId"
                     value="2"
                     className="cursor-pointer"
                     checked={branchId === '2'}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch2" className="ps-3 cursor-pointer">
                     {t('branch2')}
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch3"
                     name="branchId"
                     value="3"
                     className="cursor-pointer"
                     checked={branchId === '3'}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch3" className="ps-3 cursor-pointer">
                     {t('branch3')}
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch4"
                     name="branchId"
                     value="4"
                     className="cursor-pointer"
                     checked={branchId === '4'}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch4" className="ps-3 cursor-pointer">
                     {t('branch4')}
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch5"
                     name="branchId"
                     value="5"
                     className="cursor-pointer"
                     checked={branchId === '5'}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch5" className="ps-3 cursor-pointer">
                     {t('branch5')}
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch6"
                     name="branchId"
                     value="6"
                     className="cursor-pointer"
                     checked={branchId === '6'}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch6" className="ps-3 cursor-pointer">
                     {t('branch6')}
                  </label>
               </div>
            </div>
            <hr className="my-5" />
            <span className="text-xl font-bold">{t('base_on_age')} 🔽</span>
            <div className="flex mt-4">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age1"
                     name="ageId"
                     value="1"
                     className="cursor-pointer"
                     checked={ageId === '1'}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age1" className="ps-3 cursor-pointer">
                     {t('age1')}
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age2"
                     name="ageId"
                     value="2"
                     className="cursor-pointer"
                     checked={ageId === '2'}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age2" className="ps-3 cursor-pointer">
                     {t('age2')}
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age3"
                     name="ageId"
                     value="3"
                     className="cursor-pointer"
                     checked={ageId === '3'}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age3" className="ps-3 cursor-pointer">
                     {t('age3')}
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age4"
                     name="ageId"
                     value="4"
                     className="cursor-pointer"
                     checked={ageId === '4'}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age4" className="ps-3 cursor-pointer">
                     {t('age4')}
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age5"
                     name="ageId"
                     value="5"
                     className="cursor-pointer"
                     checked={ageId === '5'}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age5" className="ps-3 cursor-pointer">
                     {t('age5')}
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age6"
                     name="ageId"
                     value="6"
                     className="cursor-pointer"
                     checked={ageId === '6'}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age6" className="ps-3 cursor-pointer">
                     {t('age6')}
                  </label>
               </div>
            </div>
            <hr className="my-5" />
            <span className="text-xl font-bold mb-4">
               {t('base_on_skill')} 🔽
            </span>
            <div className="w-full">
               <input
                  type="radio"
                  id="skill1"
                  name="skillId"
                  value="1"
                  className="cursor-pointer"
                  checked={skillId === '1'}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill1" className="ps-3 cursor-pointer">
                  {t('skill1')}
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill2"
                  name="skillId"
                  value="2"
                  className="cursor-pointer"
                  checked={skillId === '2'}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill2" className="ps-3 cursor-pointer">
                  {t('skill2')}
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill3"
                  name="skillId"
                  value="3"
                  className="cursor-pointer"
                  checked={skillId === '3'}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill3" className="ps-3 cursor-pointer">
                  {t('skill3')}
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill4"
                  name="skillId"
                  value="4"
                  className="cursor-pointer"
                  checked={skillId === '4'}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill4" className="ps-3 cursor-pointer">
                  {t('skill4')}
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill5"
                  name="skillId"
                  value="5"
                  className="cursor-pointer"
                  checked={skillId === '5'}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill5" className="ps-3 cursor-pointer">
                  {t('skill5')}
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill6"
                  name="skillId"
                  value="6"
                  className="cursor-pointer"
                  checked={skillId === '6'}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill6" className="ps-3 cursor-pointer">
                  {t('skill6')}
               </label>
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
