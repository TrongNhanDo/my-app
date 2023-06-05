export const checkIsAdmin = (pathname: string) => {
   if (pathname && pathname.includes("admin")) {
      return true;
   }

   return false;
};
