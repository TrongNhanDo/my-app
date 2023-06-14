import React, { useCallback } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { callApi } from "../../../../api/callApi/callApi";
import { validationSchema } from "./validations";

type FormikValueType = {
   email: string;
   password: string;
};

const LoginForm = React.memo(() => {
   const initValueFormik: FormikValueType = {
      email: "",
      password: "",
   };

   const onSubmit = useCallback(async (formikValues: FormikValueType) => {
      try {
         const payload = {
            username: formikValues.email || "",
            password: formikValues.password || "",
         };
         const response = await callApi("users/login", "post", payload).catch(
            (err) => console.log({ err })
         );

         if (response) {
            alert("Login success");
         } else {
            alert("Login fail");
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

   return (
      <div className="div-contai flex flex-col items-center justify-center w-full">
         <div className="w-2/4 rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-500 dark:bg-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
               <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white uppercase text-center">
                  Sign in to your account
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
                        Your email
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
                        placeholder="Enter username"
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
                        Password
                     </label>
                     <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                           formikBag.errors.password &&
                           formikBag.touched.password &&
                           "bg-yellow"
                        }`}
                        value={formikBag.values.password || ""}
                        onChange={formikBag.handleChange}
                     />
                     {formikBag.errors.password &&
                        formikBag.touched.password && (
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
                              Remember me
                           </label>
                        </div>
                     </div>
                     <Link
                        to="/forget-password"
                        className="text-gray-500 dark:text-gray-300 underline"
                     >
                        Forgot password?
                     </Link>
                  </div>
                  <button
                     type="submit"
                     className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                  >
                     Login
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                     Don’t have an account yet?{" "}
                     <Link
                        to="/register"
                        className="font-medium text-primary-600 hover:underline dark:text-white-500 underline text-stone-50"
                     >
                        Sign up
                     </Link>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
});

export default LoginForm;
