import { format } from "date-fns";
import { RoleConvert, Roles } from "./constants";

export const formatRole = (role: number) => {
   switch (role) {
      case Roles.User:
         return RoleConvert.User;
      case Roles.Employee:
         return RoleConvert.Employee;
      case Roles.Admin:
         return RoleConvert.Admin;
      default:
         return RoleConvert.User;
   }
};

export const formatDate = (inputDate: string) => {
   const date = new Date(inputDate);
   return format(date, "HH:mm:ss dd/MM/yyyy");
};
