import { RoleProps, TypeValues } from './types';

export const setRoleList = (payload?: RoleProps[]) => {
   return {
      type: TypeValues.setRoleList,
      payload,
   };
};

export const setRoleViewData = (payload: RoleProps) => {
   return {
      type: TypeValues.setRoleViewData,
      payload,
   };
};

export const setRoleTableData = (payload?: RoleProps[]) => {
   return {
      type: TypeValues.setRoleTableData,
      payload,
   };
};

export const addRole = (payload: RoleProps) => {
   return {
      type: TypeValues.addRole,
      payload,
   };
};

export const clearRoleList = () => {
   return {
      type: TypeValues.clearRoleList,
   };
};

export const deleteRole = (roleName: string) => {
   return {
      type: TypeValues.deleteRole,
      payload: roleName,
   };
};
