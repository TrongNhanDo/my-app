import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "./validations";
import "./register-form.css";
import { FormikInputTypes } from "./types";

export const RegisterFrom = () => {
   const initValues = {
      name: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      confirmPwd: "",
   };

   const onSubmit = useCallback(async (formikValue: FormikInputTypes) => {
      return formikValue;
   }, []);

   const formikBag = useFormik({
      initialValues: initValues,
      validationSchema,
      onSubmit: (values) => onSubmit(values),
   });

   return (
      <div className="div-contai">
         <form
            onSubmit={formikBag.handleSubmit}
            className="w-3/4 dark:bg-gray-700 div-register rounded-lg"
         >
            <div className="font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10 uppercase text-center text-3xl">
               SIGN UP
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
               <div>
                  <label
                     htmlFor="first_name"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     First name
                  </label>
                  <input
                     type="text"
                     id="first_name"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="John"
                  />
               </div>
               <div>
                  <label
                     htmlFor="last_name"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Last name
                  </label>
                  <input
                     type="text"
                     id="last_name"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Doe"
                  />
               </div>
               <div>
                  <label
                     htmlFor="company"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Company
                  </label>
                  <input
                     type="text"
                     id="company"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Flowbite"
                  />
               </div>
               <div>
                  <label
                     htmlFor="phone"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Phone number
                  </label>
                  <input
                     type="tel"
                     id="phone"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="123-45-678"
                     pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  />
               </div>
               <div>
                  <label
                     htmlFor="website"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Website URL
                  </label>
                  <input
                     type="url"
                     id="website"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="flowbite.com"
                  />
               </div>
               <div>
                  <label
                     htmlFor="visitors"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Unique visitors (per month)
                  </label>
                  <input
                     type="number"
                     id="visitors"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder=""
                  />
               </div>
            </div>
            <div className="mb-6">
               <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Email address
               </label>
               <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
               />
            </div>
            <div className="mb-6">
               <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Password
               </label>
               <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
               />
            </div>
            <div className="mb-6">
               <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Confirm password
               </label>
               <input
                  type="password"
                  id="confirm_password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
               />
            </div>
            <div className="flex items-start mb-6">
               <div className="flex items-center h-5">
                  <input
                     id="remember"
                     type="checkbox"
                     defaultValue=""
                     className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
               </div>
               <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
               >
                  I agree with the{" "}
                  <Link
                     to="#"
                     className="text-blue-600 hover:underline dark:text-blue-500 underline"
                  >
                     terms and conditions
                  </Link>
                  .
               </label>
            </div>
            <button
               type="submit"
               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-100"
            >
               Submit
            </button>
         </form>
      </div>
   );
};
