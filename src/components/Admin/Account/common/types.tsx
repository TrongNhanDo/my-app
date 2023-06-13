export type RoleType = {
   _id: string;
   roleId: number;
   roleName: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
};

export const InitRole = {
   _id: "",
   roleId: 0,
   roleName: "",
   createdAt: "",
   updatedAt: "",
   __v: 0,
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
   roleId: number;
};

export type InputInsertType = {
   username: string;
   password: string;
   confirmPwd: string;
   roleId: number;
};

export const ActionTypes = {
   SET_USERS: "SET_USERS",
   SELECTED_USER: "SELECTED_USER",
};
