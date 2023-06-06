export type UserType = {
   active: boolean;
   createdAt: string;
   role: number;
   updatedAt: string;
   username: string;
   __v: number;
   _id: string;
};

export const InitUserValue = {
   active: false,
   createdAt: "",
   role: 0,
   updatedAt: "",
   username: "",
   __v: 0,
   _id: "",
};

export type ActionReducerType = {
   type: string;
   payload: UserType | null;
};

export type StateReducerType = {
   user: UserType | null;
};

export const InitStateReducerType = {
   user: InitUserValue,
};
