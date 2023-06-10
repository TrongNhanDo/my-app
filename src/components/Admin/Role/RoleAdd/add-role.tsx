import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FormikBagType, InitFormikBag } from "./types";
import { validationSchema } from "./validations";
import { callApi } from "../../../../api/callApi/callApi";
import { Loader } from "../../../Common/Loader/loader";
import { Input } from "../../../Common/Input/input";
import { scrollTop } from "../../../Common/Logic/logics";

export const AddRole = () => {
   const navigate = useNavigate();
   const [showLoading, setShowLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");
   const [success, setSuccess] = useState<boolean>(false);

   const onSubmit = useCallback(async (formikValues: FormikBagType) => {
      setSuccess(false);
      setShowLoading(true);
      const requestPayload = {
         ...formikValues,
         roleName: formikValues.roleName.trim(),
      };
      await callApi("roles", "post", requestPayload)
         .then(() => {
            setError("Insert new role success");
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
         <form onSubmit={formikBag.handleSubmit} className="container">
            <div className="div-register dark:bg-gray-700">
               <div className="mb-6">
                  <div className="text-2xl font-bold text-center">
                     INSERT NEW AGE CATEGORY
                  </div>
                  {error && error !== "" && (
                     <div className="bg-lime-300 w-full text-orange-600 mt-4 py-2 px-5 rounded-md">
                        {error}
                     </div>
                  )}
               </div>
               <div className="mb-6">
                  <Input
                     label="Role Id:"
                     name="roleId"
                     id="roleId"
                     type="text"
                     className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 ${
                        formikBag.errors.roleId && formikBag.touched.roleId
                           ? "bg-yellow"
                           : ""
                     }`}
                     onChange={formikBag.handleChange}
                     value={formikBag.values.roleId || ""}
                  />
                  {formikBag.errors.roleId && formikBag.touched.roleId && (
                     <p className="text-orange-600">
                        {formikBag.errors.roleId}
                     </p>
                  )}
               </div>
               <div className="mb-6">
                  <Input
                     type="text"
                     label="Role Name:"
                     name="roleName"
                     id="roleName"
                     className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 ${
                        formikBag.errors.roleName && formikBag.touched.roleName
                           ? "bg-yellow"
                           : ""
                     }`}
                     onChange={formikBag.handleChange}
                     value={formikBag.values.roleName || ""}
                  />
                  {formikBag.errors.roleName && formikBag.touched.roleName && (
                     <p className="text-orange-600">
                        {formikBag.errors.roleName}
                     </p>
                  )}
               </div>
               <div className="grid gap-6 mb-1 md:grid-cols-2">
                  <div>
                     <button
                        type="button"
                        onClick={handleSubmit}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
                     >
                        Submit
                     </button>
                  </div>
                  <div>
                     <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-100"
                     >
                        Back
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};
