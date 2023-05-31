import { ActionType, ActionTypes, InitStateType } from "./types";
import { useEffect, useReducer } from "react";
import { callApi } from "../../../api/callApi/callApi";

export const UserList = () => {
   const reducer = (state: InitStateType, action: ActionType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionTypes.SET_PRODUCTS:
            return {
               ...state,
               products: payload,
            };
            break;
         default:
            return state;
      }
   };
   const [data, dispatch] = useReducer(reducer, { products: [] });
   const fetchApi = async () => {
      const response = await callApi('users', 'get').catch(err => console.log({ err }));
      dispatch({
         type: ActionTypes.SET_PRODUCTS,
         payload: response.data,
      });
   };

   useEffect(() => {
      fetchApi();
   }, []);

   return (
      <div>
         {data.products[0] && data.products.map((value: any, index: any) => (
            <h1 key={index}>{value.username}</h1>
         ))}
      </div>
   );
};
