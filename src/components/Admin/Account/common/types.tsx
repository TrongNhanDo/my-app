export type RoleType = {
   _id: string;
   roleId: number;
   roleName: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
};

export type UserType = {
   active: boolean;
   createdAt: string;
   roleId: number;
   updatedAt: string;
   username: string;
   __v: number;
   _id: string;
   role: RoleType;
};

export type InitStateType = {
   count: number;
   returnCnt: number;
   users: UserType[];
   totalPage: number;
};

export type InitStateUserDetailType = {
   user: UserType;
};

export type ActionType = {
   type: string;
   payload: InitStateType;
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
