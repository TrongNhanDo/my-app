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

export type AgeCategoryProps = {
  _id: string;
  ageId: number;
  ageName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initAgeValues: AgeCategoryProps = {
  _id: '',
  ageId: 0,
  ageName: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export type BranchCategoryProps = {
  _id: string;
  branchId: number;
  branchName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initBranchValues: BranchCategoryProps = {
  _id: '',
  branchId: 0,
  branchName: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export type SkillCategoryProps = {
  _id: string;
  skillId: number;
  skillName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initSkillValues: SkillCategoryProps = {
  _id: '',
  skillId: 0,
  skillName: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export type ProductProps = {
  _id: string;
  ageId: number;
  branchId: number;
  skillId: number;
  productName: string;
  price: string;
  describes: string;
  amount: number;
  rate: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  age: AgeCategoryProps;
  branch: BranchCategoryProps;
  skill: SkillCategoryProps;
  __v: number;
};

export const initProductValues: ProductProps = {
  _id: '',
  ageId: 0,
  branchId: 0,
  skillId: 0,
  productName: '',
  price: '',
  describes: '',
  amount: 0,
  rate: 0,
  images: [],
  createdAt: '',
  updatedAt: '',
  age: initAgeValues,
  branch: initBranchValues,
  skill: initSkillValues,
  __v: 0,
};

export type UserHomeProps = {
  newProductsList: ProductProps[];
};

export const initUserHomeValues = {
  newProductsList: [],
};
