import { Currency } from "react-tender";
import { format } from "date-fns";

export const formatDate = (inputDate: string) => {
   const date = new Date(inputDate);
   return format(date, "HH:mm:ss dd/MM/yyyy");
};

export const formatCurrency = (
   money: number | string,
   currency?: string,
   locale?: string
) => {
   return (
      <Currency
         value={parseFloat(money.toString()) || 0}
         currency={currency || "VND"}
         locale={locale || "vi"}
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

export const renderStar = (rate: number) => {
   const stars = [];
   for (let index = 1; index <= 5; index++) {
      stars.push(
         <button
            key={index}
            type="button"
            className="w-fit inline-block"
            disabled={true}
         >
            {index <= rate ? (
               <i className="fa-solid fa-star" style={{ color: "#d2d51a" }}></i>
            ) : (
               <i className="fa-regular fa-star"></i>
            )}
         </button>
      );
   }
   return stars;
};
