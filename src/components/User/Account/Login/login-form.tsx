import React, { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../../api/callApi/callApi";
import { validationSchema } from "./validations";
import { FormikValueType, initValueFormik } from "./types";
import { useTranslation } from "react-i18next";
import { SumProductContext } from "../../../../context/SumProductContext";

const LoginForm = React.memo(() => {
   const { t } = useTranslation();
   const { setUserId } = useContext(SumProductContext);
   const navigate = useNavigate();
   const [msg, setMsg] = useState<string>();

   const onSubmit = useCallback(
      async (formikValues: FormikValueType) => {
         try {
            const payload = {
               username: formikValues.email || "",
               password: formikValues.password || "",
            };
            const response = await callApi(
               "users/login",
               "post",
               payload
            ).catch((err) => setMsg(err.response.data.message));

            if (response) {
               const currentUserId = response.data._id || "";
               setUserId(currentUserId);
               sessionStorage.setItem("userId", currentUserId);
               setMsg("");
               navigate("/");
            }
         } catch (error) {
            console.log({ error });
         }
      },
      [navigate, setUserId]
   );

   const formikBag = useFormik({
      initialValues: initValueFormik,
      validationSchema: validationSchema(t),
      onSubmit: (value) => onSubmit(value),
   });

   return (
      <div className="div-contai w-1/3 bg-white rounded-lg shadow">
         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white uppercase text-center">
               {t("user.login.title")}
            </div>
            {msg && (
               <div className="w-full mt-2 text-red-600 text-center">{msg}</div>
            )}
            <form
               className="space-y-4 md:space-y-6"
               onSubmit={formikBag.handleSubmit}
            >
               <div>
                  <label
                     htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     {t("user.login.email")}:
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
                     placeholder={t("user.login.email_placeholder")}
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
                     {t("user.login.password")}:
                  </label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     placeholder={t("user.login.password_placeholder")}
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
               <div className="flex items-center justify-between">
                  <div className="flex items-start">
                     <div className="flex items-center h-5">
                        <input
                           id="remember"
                           aria-describedby="remember"
                           type="checkbox"
                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                     </div>
                     <div className="ml-3 text-sm">
                        <label
                           htmlFor="remember"
                           className="text-gray-500 dark:text-gray-300"
                        >
                           {t("user.login.remember_login")}
                        </label>
                     </div>
                  </div>
                  <Link
                     to="/forget-password"
                     className="text-gray-500 dark:text-gray-300 underline"
                  >
                     {t("user.login.forget_password")}
                  </Link>
               </div>
               <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
               >
                  {t("user.login.submit")}
               </button>
               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("user.login.text1")}{" "}
                  <Link to="/register" className="font-medium underline">
                     {t("user.login.register")}
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
});

export default LoginForm;
