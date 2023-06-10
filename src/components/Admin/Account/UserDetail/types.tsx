import { InitRole, RoleType, UserType } from "../common/types";

export const InitUserValue = {
   active: false,
   createdAt: "",
   roleId: 0,
   updatedAt: "",
   username: "",
   __v: 0,
   _id: "",
   role: InitRole,
};

export type ActionReducerType = {
   type: string;
   payload: StateReducerType;
};

export type StateReducerType = {
   user: UserType;
   roles: RoleType[];
};

export const InitStateReducerType = {
   user: InitUserValue,
   roles: [InitRole],
};
