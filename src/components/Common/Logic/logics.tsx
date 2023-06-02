import { Currency } from "react-tender";
import { format } from "date-fns";
import { RoleConvert, Roles } from "../../Admin/Account/common/constants";

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

export const formatCurrency = (
   money: number,
   currency?: string,
   locale?: string
) => {
   return (
      <Currency
         value={money || 0}
         currency={currency || "USD"}
         locale={locale || "en-US"}
      />
   );
};
