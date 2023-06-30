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
};

export const SumProductContext = createContext<ContextProps>({
   sumProduct: 0,
   setSumProduct: () => 0,
});

type Props = {
   children: ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
   const [viewData, setViewData] = useState<CartItemType[]>();
   const [sumProduct, setSumProduct] = useState<number>(0);

   const fetchApi = useCallback(async () => {
      const response = await callApi("carts/get-by-userId", "post", {
         userId: "64760a06575933907791ab2e",
      }).catch((err) => console.log({ err }));

      const data: CartItemType[] = response.data;
      if (data) {
         setViewData(data);
      }
   }, []);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   useEffect(() => {
      if (viewData && viewData.length) {
         const total = viewData.reduce((sum, cur) => sum + cur.amount, 0);
         setSumProduct(total);
      }
   }, [viewData]);

   return (
      <SumProductContext.Provider value={{ sumProduct, setSumProduct }}>
         {children}
      </SumProductContext.Provider>
   );
};
