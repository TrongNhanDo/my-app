export type UserType = {
   active: boolean,
   createdAt: string,
   role: number,
   updatedAt: string,
   username: string,
   __v: number,
   _id: string,
};

export type InitStateType = {
   products: UserType;
};

export type InitStateUserDetailType = {
   product: UserType;
};

export type ActionType = {
   type: string;
   payload?: any;
};

export type FormikPropType = {
   username: string;
   role: number;
};

export const ActionTypes = {
   SET_PRODUCTS: 'SET_PRODUCTS',
   SELECTED_PRODUCT: 'SELECTED_PRODUCT',
};