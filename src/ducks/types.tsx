export enum TypeValues {
  setRoleList = 'roles/setRoleList',
  clearRoleList = 'roles/clearRoleList',
  addRole = 'roles/addRole',
  deleteRole = 'roles/deleteRole',
  setRoleViewData = 'roles/setRoleViewData',
  setRoleTableData = 'roles/setRoleTableData',
}

export type NumberActionProps = {
  type: TypeValues;
};

export type RoleActionProps = {
  type: TypeValues;
  payload: RoleProps[];
};

export type RoleProps = {
  _id: string;
  roleId: number;
  roleName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initRoleValues: RoleProps = {
  _id: '',
  updatedAt: '',
  roleName: '',
  createdAt: '',
  roleId: 0,
  __v: 0,
};

export type StateProps = {
  roles: RoleStateProps;
};

export type RoleStateProps = {
  roleList?: RoleProps[];
  roleViewData: RoleProps;
  roleTableData: RoleProps[];
};

export const initRoleState: RoleStateProps = {
  roleList: [],
  roleViewData: initRoleValues,
  roleTableData: [],
};
