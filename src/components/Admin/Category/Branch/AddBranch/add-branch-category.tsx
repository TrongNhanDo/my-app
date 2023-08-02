import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import Loader from '../../../../Common/Loader/loader';
import { FormikBagType, InitFormikBag } from './types';
import { Input } from '../../../../Common/Input/input';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from './validations';
import { callApi } from '../../../../../api/callApi/callApi';
import { scrollTop } from '../../../../Common/Logic/logics';

const AddBranchCategory = React.memo(() => {
   const navigate = useNavigate();
   const [showLoading, setShowLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>('');
   const [success, setSuccess] = useState<boolean>(false);

   const onSubmit = useCallback(async (formikValues: FormikBagType) => {
      setSuccess(false);
      setShowLoading(true);
      const requestPayload = {
         branchId: formikValues.branchId,
         branchName: formikValues.branchName.trim(),
      };
      await callApi('branches', 'post', requestPayload)
         .then(() => {
            setError('Insert new branch category success');
            setSuccess(true);
         })
         .catch((err) => {
            setError(err.response.data.message);
         });
      setShowLoading(false);
      scrollTop();
   }, []);

   const formikBag = useFormik({
      initialValues: InitFormikBag,
      validationSchema,
      onSubmit: (value) => onSubmit(value),
   });

   const handleSubmit = useCallback(() => {
      try {
         formikBag.submitForm();
      } catch (error) {
         console.log({ error });
      }
   }, [formikBag]);

   useEffect(() => {
      if (success) {
         formikBag.resetForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [success]);

   return (
      <div>
         {showLoading && <Loader />}
         <form onSubmit={formikBag.handleSubmit} className="div-contai">
            <div className="div-register">
               <div className="mb-6">
                  <div className="text-2xl font-bold text-center">
                     INSERT NEW BRANCH CATEGORY
                  </div>
                  {error && error !== '' && (
                     <div className="bg-lime-300 w-full text-orange-600 mt-4 py-2 px-5 rounded-md">
                        {error}
                     </div>
                  )}
               </div>
               <div className="mb-6">
                  <Input
                     label="Branch Category ID:"
                     name="branchId"
                     id="branchId"
                     type="text"
                     className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 ${
                        formikBag.errors.branchId && formikBag.touched.branchId
                           ? 'bg-yellow'
                           : ''
                     }`}
                     onChange={formikBag.handleChange}
                     value={formikBag.values.branchId || ''}
                  />
                  {formikBag.errors.branchId && formikBag.touched.branchId && (
                     <p className="text-orange-600">
                        {formikBag.errors.branchId}
                     </p>
                  )}
               </div>
               <div className="mb-6">
                  <Input
                     type="text"
                     label="Branch Category Name:"
                     name="branchName"
                     id="branchName"
                     className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 ${
                        formikBag.errors.branchName &&
                        formikBag.touched.branchName
                           ? 'bg-yellow'
                           : ''
                     }`}
                     onChange={formikBag.handleChange}
                     value={formikBag.values.branchName || ''}
                  />
                  {formikBag.errors.branchName &&
                     formikBag.touched.branchName && (
                        <p className="text-orange-600">
                           {formikBag.errors.branchName}
                        </p>
                     )}
               </div>
               <div className="grid gap-6 mb-1 md:grid-cols-2">
                  <div>
                     <button
                        type="button"
                        onClick={handleSubmit}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
                     >
                        Submit
                     </button>
                  </div>
                  <div>
                     <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center w-100"
                     >
                        Back
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
});

export default AddBranchCategory;
