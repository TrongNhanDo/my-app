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

export type ActionType = {
   type: string;
   payload: any;
};

export const ActionTypes = {
   SET_PRODUCTS: 'SET_PRODUCTS'
};