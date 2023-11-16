import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { AgeType, BranchType, SkillType } from '../common/types';
import { validationSchema } from './validations';
import Loader from '../../../Common/Loader/loader';
import { FormikBagType, InitFormikValues, StateReducerType } from './types';
import {
   ToastTypeOptions,
   scrollTop,
   showToast,
   callApi,
   upLoadImage,
   MethodProps,
} from '../../../Common/Logic/logics';

const AddProduct = React.memo(() => {
   const navigate = useNavigate();
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const [images, setImages] = useState<File[]>();
   const [viewData, setViewData] = useState<StateReducerType>();
   const [success, setSuccess] = useState<boolean>(false);

   const fetchApi = useCallback(async () => {
      // data for age dropdown
      const ageResponse = await callApi('ages', MethodProps.GET).catch((err) =>
         console.log({ err })
      );
      // data for branch dropdown
      const branchResponse = await callApi('branches', MethodProps.GET).catch(
         (err) => console.log({ err })
      );
      // data for skill dropdown
      const skillResponse = await callApi('skills', MethodProps.GET).catch(
         (err) => console.log({ err })
      );
      setViewData({
         ageCategory: ageResponse.data || [],
         branchCategory: branchResponse.data || [],
         skillCategory: skillResponse.data || [],
      });
      setShowLoader(false);
   }, []);

   const onSubmit = useCallback(async (formikValues: FormikBagType) => {
      setShowLoader(true);
      const arrayUrl = await upLoadImage(formikValues.images);
      if (arrayUrl.length) {
         const requestPayload = {
            ...formikValues,
            images: arrayUrl,
         };
         await callApi('products', MethodProps.POST, requestPayload)
            .then(() => {
               setSuccess(true);
               setImages([]);
               showToast('Add product success', ToastTypeOptions.Success);
            })
            .catch((err) => {
               console.log({ err });
               showToast('Add product fail', ToastTypeOptions.Error);
            });
      } else {
         showToast('Upload image fail', ToastTypeOptions.Error);
      }
      setShowLoader(false);
      scrollTop();
   }, []);

   const formikBag = useFormik({
      initialValues: InitFormikValues,
      validationSchema,
      onSubmit,
   });

   const handleSubmit = useCallback(() => {
      try {
         formikBag.submitForm();
      } catch (error) {
         console.log({ error });
      }
   }, [formikBag]);

   const handleChangImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const myFiles = files ? Array.from(files) : [];
      formikBag.setFieldValue('images', myFiles);
      setImages(myFiles);
   };

   const ListImage = () => {
      const buttons = [];
      if (images && images.length) {
         for (let index = 0; index < images.length; index++) {
            buttons.push(
               <img
                  className="inline-block"
                  style={{
                     width: '200px',
                     height: '200px',
                     marginRight: '10px',
                     objectFit: 'cover',
                  }}
                  key={index}
                  src={URL.createObjectURL(images[index])}
                  alt=""
               />
            );
         }
         return buttons.length > 0 ? buttons : [];
      }
      return [];
   };

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   useEffect(() => {
      if (success) {
         formikBag.resetForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [success]);

   return (
      <div className="div-contai">
         {showLoader && <Loader />}
         <div className="mt-10">
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
               INSERT NEW PRODUCT
            </h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto w-2/3">
               <form onSubmit={formikBag.handleSubmit}>
                  <table className="w-full text-sm text-left text-gray-500">
                     <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4">
                              <label htmlFor="productName">Product Name:</label>
                              <input
                                 type="email"
                                 id="productName"
                                 name="productName"
                                 placeholder="Enter product name"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base mt-1 ${
                                    formikBag.errors.productName &&
                                    formikBag.touched.productName
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 value={formikBag.values.productName || ''}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.productName &&
                                 formikBag.touched.productName && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.productName}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4">
                              <label htmlFor="productName">Age Category:</label>
                              <select
                                 name="ageId"
                                 id="ageId"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base ${
                                    formikBag.errors.ageId &&
                                    formikBag.touched.ageId
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 value={formikBag.values.ageId}
                                 onChange={formikBag.handleChange}
                              >
                                 {viewData &&
                                    viewData.ageCategory &&
                                    viewData.ageCategory.map(
                                       (value: AgeType, index: number) => {
                                          return (
                                             <option
                                                key={index}
                                                value={value.ageId}
                                             >
                                                {value.ageName}
                                             </option>
                                          );
                                       }
                                    )}
                              </select>
                              {formikBag.errors.ageId &&
                                 formikBag.touched.ageId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.ageId}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4">
                              <label htmlFor="productName">
                                 Branch Category:
                              </label>
                              <select
                                 name="branchId"
                                 id="branchId"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base ${
                                    formikBag.errors.branchId &&
                                    formikBag.touched.branchId
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 value={formikBag.values.branchId}
                                 onChange={formikBag.handleChange}
                              >
                                 {viewData &&
                                    viewData.branchCategory &&
                                    viewData.branchCategory.map(
                                       (value: BranchType, index: number) => {
                                          return (
                                             <option
                                                key={index}
                                                value={value.branchId}
                                             >
                                                {value.branchName}
                                             </option>
                                          );
                                       }
                                    )}
                              </select>
                              {formikBag.errors.branchId &&
                                 formikBag.touched.branchId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.branchId}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4">
                              <label htmlFor="productName">
                                 Skill Category:
                              </label>
                              <select
                                 name="skillId"
                                 id="skillId"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base ${
                                    formikBag.errors.skillId &&
                                    formikBag.touched.skillId
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 value={formikBag.values.skillId}
                                 onChange={formikBag.handleChange}
                              >
                                 {viewData &&
                                    viewData.skillCategory &&
                                    viewData.skillCategory.map(
                                       (value: SkillType, index: number) => {
                                          return (
                                             <option
                                                key={index}
                                                value={value.skillId}
                                             >
                                                {value.skillName}
                                             </option>
                                          );
                                       }
                                    )}
                              </select>
                              {formikBag.errors.skillId &&
                                 formikBag.touched.skillId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.skillId}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4 w-1/5">
                              <label
                                 htmlFor="productName"
                                 className="flex justify-between"
                              >
                                 Images:
                                 <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                    onChange={(e) => handleChangImage(e)}
                                    className={`${
                                       formikBag.errors.images &&
                                       formikBag.touched.images
                                          ? 'bg-yellow'
                                          : ''
                                    }`}
                                 />
                              </label>
                              {formikBag.errors.images &&
                                 formikBag.touched.images && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.images}
                                    </p>
                                 )}
                              {ListImage && (
                                 <div className="mt-3">{ListImage()}</div>
                              )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4 text-base">
                              <label htmlFor="productName">Price:</label>
                              <input
                                 type="text"
                                 name="price"
                                 id="price"
                                 placeholder="Enter product's price"
                                 value={formikBag.values.price || ''}
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base ${
                                    formikBag.errors.price &&
                                    formikBag.touched.price
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.price &&
                                 formikBag.touched.price && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.price}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4 text-base">
                              <label htmlFor="productName">Amount:</label>
                              <input
                                 type="text"
                                 name="amount"
                                 id="amount"
                                 placeholder="Enter amount's price"
                                 value={formikBag.values.amount || ''}
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base ${
                                    formikBag.errors.amount &&
                                    formikBag.touched.amount
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.amount &&
                                 formikBag.touched.amount && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.amount}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                           <td className="px-6 py-4 text-base">
                              <label htmlFor="productName">Describes:</label>
                              <textarea
                                 name="describes"
                                 id="describes"
                                 rows={5}
                                 value={formikBag.values.describes || ''}
                                 placeholder="Enter describe about product"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base ${
                                    formikBag.errors.describes &&
                                    formikBag.touched.describes
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.describes &&
                                 formikBag.touched.describes && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.describes}
                                    </p>
                                 )}
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </form>
            </div>
            <div className="flex w-full mt-10 justify-center">
               <>
                  <button
                     type="button"
                     className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 px-20"
                     onClick={handleSubmit}
                  >
                     Update
                  </button>
                  <button
                     type="button"
                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 focus:outline-none px-20 ms-10"
                     onClick={() => navigate(-1)}
                  >
                     Back
                  </button>
               </>
            </div>
         </div>
      </div>
   );
});

export default AddProduct;
