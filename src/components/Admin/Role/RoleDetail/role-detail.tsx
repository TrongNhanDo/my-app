import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from './validations';
import { ActionValues } from '../Common/constants';
import {
   ActionReducerType,
   FormikBagType,
   InitFormikValue,
   InitStateReducerType,
   StateReducerType,
} from './types';
import { callApi } from '../../../../api/callApi/callApi';
import Loader from '../../../Common/Loader/loader';
import { ErrorMessages } from '../../../Common/ErrorMessage/error-message';
import {
   ToastTypeOptions,
   formatDate,
   scrollTop,
   showToast,
} from '../../../Common/Logic/logics';

const RoleDetail = React.memo(() => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [msg, setMsg] = useState<string>('');

   const reducer = (state: StateReducerType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.SELECTED_ROLE:
            return {
               role: payload,
            };
         default:
            return state;
      }
   };

   const [data, dispatch] = useReducer(reducer, InitStateReducerType);

   const fetchApi = useCallback(async () => {
      const url = `roles/${id}`;
      const response = await callApi(url, 'get').catch((err) =>
         console.log({ err })
      );
      dispatch({
         type: ActionValues.SELECTED_ROLE,
         payload: response.data || [],
      });
      setIsLoading(false);
   }, [id]);

   const deleteAge = useCallback(
      async (id: string) => {
         if (confirm('Are you sure you want to delete this age category?')) {
            setIsLoading(true);
            const response = await callApi('roles', 'delete', {
               id: id,
            }).catch((err) => console.log({ err }));
            setIsLoading(false);
            if (response) {
               showToast('Delete role success', ToastTypeOptions.Success);
               navigate(-1);
            } else {
               showToast('Delete role fail', ToastTypeOptions.Error);
            }
         }
      },
      [navigate]
   );

   const onSubmit = async (formikValues: FormikBagType) => {
      setMsg('');
      if (
         formikValues.roleName &&
         data.role &&
         formikValues.roleName === data.role.roleName
      ) {
         setMsg('There must be at least one data change');
      } else {
         // show loader while update information
         setIsLoading(true);
         const requestPayload = {
            ...formikValues,
            id: id,
         };
         const response = await callApi('roles', 'patch', requestPayload).catch(
            (err) => setMsg(err.response.data.message || '')
         );
         // close loader when updated information
         setIsLoading(false);
         if (response) {
            setMsg('Update role success');
            fetchApi();
         }
      }
      scrollTop();
   };

   const formikBag = useFormik({
      initialValues: InitFormikValue,
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
      fetchApi();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (data.role && data.role.roleName !== '') {
         formikBag.setFieldValue('roleName', data.role.roleName);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

   return (
      <div>
         {isLoading && <Loader />}
         <div className="div-contai mt-10">
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10">
               ROLE DETAIL
            </h2>
            {msg && ErrorMessages(msg)}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto">
               <form onSubmit={formikBag.handleSubmit}>
                  <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                           <th scope="col" className="px-6 py-3">
                              Properties
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Before Change
                           </th>
                           <th scope="col" className="px-6 py-3">
                              After change
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                           >
                              Role Id
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.role ? data.role.roleId : ''}
                           </td>
                           <td className="px-6 py-4">
                              {data.role ? data.role.roleId : ''}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                           >
                              Role Name
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.role ? data.role.roleName : ''}
                           </td>
                           <td className="px-6 py-4">
                              <input
                                 type="text"
                                 id="roleName"
                                 name="roleName"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-base ${
                                    formikBag.errors.roleName &&
                                    formikBag.touched.roleName
                                       ? 'bg-yellow'
                                       : ''
                                 }`}
                                 value={formikBag.values.roleName || ''}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.roleName &&
                                 formikBag.touched.roleName && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.roleName}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                           >
                              Created Date
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.role && data.role.createdAt
                                 ? formatDate(data.role.createdAt)
                                 : ''}
                           </td>
                           <td className="px-6 py-4 text-base">
                              {data.role && data.role.createdAt
                                 ? formatDate(data.role.createdAt)
                                 : ''}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                           >
                              Updated At
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.role && data.role.updatedAt
                                 ? formatDate(data.role.updatedAt)
                                 : ''}
                           </td>
                           <td className="px-6 py-4 text-base">
                              {data.role && data.role.updatedAt
                                 ? formatDate(data.role.updatedAt)
                                 : ''}
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
                     className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 ms-10 px-20"
                     onClick={() => deleteAge(data.role ? data.role._id : '')}
                  >
                     Delete
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

export default RoleDetail;
