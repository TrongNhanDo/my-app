import React, {
   ReactNode,
   createContext,
   useCallback,
   useEffect,
   useState,
} from "react";
import { callApi } from "../api/callApi/callApi";
import { CartItemType } from "../components/User/Cart/types";

type ContextProps = {
   sumProduct: number;
   setSumProduct: React.Dispatch<React.SetStateAction<number>>;
   userId: string;
   setUserId: React.Dispatch<React.SetStateAction<string>>;
   roleId: string | number;
   setRoleId: React.Dispatch<React.SetStateAction<string | number>>;
   locale: string;
   setLocale: React.Dispatch<React.SetStateAction<string>>;
};

export const SumProductContext = createContext<ContextProps>({
   sumProduct: 0,
   setSumProduct: () => 0,
   userId: "",
   setUserId: () => "",
   roleId: "",
   setRoleId: () => "",
   locale: "eng",
   setLocale: () => "eng",
});

type Props = {
   children: ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
   const [viewData, setViewData] = useState<CartItemType[]>();
   const [sumProduct, setSumProduct] = useState<number>(0);
   const [userId, setUserId] = useState<string>("");
   const [roleId, setRoleId] = useState<string | number>("");
   const [locale, setLocale] = useState<string>("eng");

   useEffect(() => {
      const currentUserId = sessionStorage.getItem("userId");
      if (currentUserId) {
         setUserId(currentUserId);
      }
   }, []);

   useEffect(() => {
      const currentRoleId = sessionStorage.getItem("roleId");
      if (currentRoleId) {
         setRoleId(currentRoleId);
      }
   }, []);

   const fetchApi = useCallback(async () => {
      if (userId) {
         const response = await callApi("carts/get-by-userId", "post", {
            userId: userId,
         }).catch((err) => console.log({ err }));

         const data: CartItemType[] = response.data;
         if (data) {
            setViewData(data);
         }
      }
   }, [userId]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   useEffect(() => {
      const currentLocale = localStorage.getItem("locale");
      if (currentLocale) {
         setLocale(currentLocale);
      }
   }, []);

   useEffect(() => {
      if (viewData && viewData.length) {
         const total = viewData.reduce((sum, cur) => sum + cur.amount, 0);
         setSumProduct(total);
      }
   }, [viewData]);

   return (
      <SumProductContext.Provider
         value={{
            sumProduct,
            setSumProduct,
            userId,
            setUserId,
            roleId,
            setRoleId,
            locale,
            setLocale,
         }}
      >
         {children}
      </SumProductContext.Provider>
   );
};
