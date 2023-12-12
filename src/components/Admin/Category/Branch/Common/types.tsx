export type BranchType = {
  _id: string;
  branchId: number;
  branchName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const ActionValues = {
  SET_BRANCHES: 'SET_BRANCHES',
  GET_BRANCH: 'GET_BRANCH',
};
