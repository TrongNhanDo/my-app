import { useFormik } from "formik";
import { InputType } from "./types";
import { useCallback } from "react";

export const UserList = () => {
   const initValues: InputType = {
      username: "",
      password: "",
   };

   const onSubmit = useCallback(async (formikValues: InputType) => {
      return formikValues;
   }, []);

   const formikBag = useFormik({
      initialValues: initValues,
      onSubmit: (values) => onSubmit(values),
   });

   return (
      <div>
         <form onSubmit={formikBag.handleSubmit}>
            <input
               type="text"
               name="username"
               id="username"
               value={formikBag.values.username || ""}
               onChange={formikBag.handleChange}
            />
            <input
               type="text"
               name="password"
               id="password"
               value={formikBag.values.password || ""}
               onChange={formikBag.handleChange}
            />
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};
