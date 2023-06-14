import { Currency } from "react-tender";
import { format } from "date-fns";

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

export const delay = (time: number) => {
   return new Promise((resolve) => setTimeout(resolve, time));
};

export const scrollTop = () => {
   window.scrollTo(0, 0);
};

export const checkIsAdmin = (pathname: string) => {
   if (pathname && pathname.includes("admin")) {
      return true;
   }

   return false;
};
