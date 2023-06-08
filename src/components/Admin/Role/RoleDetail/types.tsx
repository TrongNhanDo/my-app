import { RoleType } from "../Common/types";

export type ActionReducerType = {
   type: string;
   payload: RoleType | null;
};

export type StateReducerType = {
   role: RoleType | null;
};

export const InitRoleValue = {
   _id: "",
   roleId: 0,
   roleName: "",
   createdAt: "",
   updatedAt: "",
   __v: 0,
};

export const InitStateReducerType = {
   role: InitRoleValue,
};

export type FormikBagType = {
   roleName: string;
};

export const InitFormikValue = {
   roleName: "",
};
