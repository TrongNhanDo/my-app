import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { callApi } from "../../../../api/callApi/callApi";
import { validationSchema } from "./validations";
import { FormikValueType, initValueFormik } from "./types";
import Loader from "../../../Common/Loader/loader";
import { useTranslation } from "react-i18next";

const LoginForm = React.memo(() => {
   const { t } = useTranslation();
   const [showLoading, setShowLoading] = useState<boolean>(false);
   const [checkPass, setCheckPass] = useState<boolean>(false);

   const onSubmit = useCallback(async (formikValues: FormikValueType) => {
      try {
         if (formikValues.password !== formikValues.confirmPwd) {
            setCheckPass(true);
            return;
         }
         setShowLoading(true);
         const payload = {
            username: formikValues.email || "",
            password: formikValues.password || "",
            roleId: 1,
         };
         const response = await callApi("users", "post", payload).catch((err) =>
            console.log({ err })
         );
         setShowLoading(false);
         if (response) {
            alert("Register success");
         } else {
            alert("Register fail");
         }
      } catch (error) {
         console.log({ error });
      }
   }, []);

   const formikBag = useFormik({
      initialValues: initValueFormik,
      validationSchema,
      onSubmit: (value) => onSubmit(value),
   });

   useEffect(() => {
      if (checkPass) {
         formikBag.setFieldError("confirmPwd", "Confirm password is incorrect");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [checkPass]);

   return (
      <div className="div-contai w-1/3 bg-white my-10 rounded-lg shadow">
         {showLoading && <Loader />}
         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white uppercase text-center">
               {t("user.register.title")}
            </div>
            <form
               className="space-y-4 md:space-y-6"
               onSubmit={formikBag.handleSubmit}
            >
               <div>
                  <label
                     htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     {t("user.register.email")}:
                  </label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formikBag.errors.email &&
                        formikBag.touched.email &&
                        "bg-yellow"
                     }`}
                     placeholder={t("user.register.email_placeholder")}
                     value={formikBag.values.email || ""}
                     onChange={formikBag.handleChange}
                  />
                  {formikBag.errors.email && formikBag.touched.email && (
                     <span className="text-red-800">
                        {formikBag.errors.email}
                     </span>
                  )}
               </div>
               <div>
                  <label
                     htmlFor="password"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     {t("user.register.password")}:
                  </label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     placeholder={t("user.register.password_placeholder")}
                     className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formikBag.errors.password &&
                        formikBag.touched.password &&
                        "bg-yellow"
                     }`}
                     value={formikBag.values.password || ""}
                     onChange={formikBag.handleChange}
                  />
                  {formikBag.errors.password && formikBag.touched.password && (
                     <span className="text-red-800">
                        {formikBag.errors.password}
                     </span>
                  )}
               </div>
               <div>
                  <label
                     htmlFor="confirmPwd"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     {t("user.register.confirmPwd")}:
                  </label>
                  <input
                     type="password"
                     name="confirmPwd"
                     id="confirmPwd"
                     placeholder={t("user.register.confirmPwd_placeholder")}
                     className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formikBag.errors.confirmPwd &&
                        formikBag.touched.confirmPwd &&
                        "bg-yellow"
                     }`}
                     value={formikBag.values.confirmPwd || ""}
                     onChange={formikBag.handleChange}
                  />
                  {formikBag.errors.confirmPwd &&
                     formikBag.touched.confirmPwd && (
                        <span className="text-red-800">
                           {formikBag.errors.confirmPwd}
                        </span>
                     )}
               </div>
               <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
               >
                  {t("user.register.submit")}
               </button>
               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("user.register.text1")}{" "}
                  <Link to="/login" className="font-medium underline">
                     {t("user.register.login")}
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
});

export default LoginForm;
