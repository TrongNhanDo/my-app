export type UserType = {
   active: boolean;
   createdAt: string;
   role: number;
   updatedAt: string;
   username: string;
   __v: number;
   _id: string;
};

export type InitStateType = {
   users: UserType[];
   totalPage: number;
};

export type InitStateUserDetailType = {
   user: UserType;
};

export type ActionType = {
   type: string;
   payload: InitStateType | null;
};

export type FormikPropType = {
   username: string;
   role: number;
};

export type InputInsertType = {
   username: string;
   password: string;
   confirmPwd: string;
   role: number;
};

export const ActionTypes = {
   SET_USERS: "SET_USERS",
   SELECTED_USER: "SELECTED_USER",
};
