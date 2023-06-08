export type RoleType = {
   _id: string;
   roleId: number;
   roleName: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
};

export type InitReducer = {
   roles?: RoleType[];
   totalPage: number;
};

export type InputActionType = {
   type: string;
   payload?: InitReducer;
};

export type FormikUpdate = {
   roleId: number;
   roleName: string;
};
