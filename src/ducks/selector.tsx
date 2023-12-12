import { createSelector } from '@reduxjs/toolkit';
import { RoleStateProps, StateProps, initRoleValues } from './types';

export const roleSelector = (state: StateProps) => state.roles;

export const getRoleList = createSelector(
  roleSelector,
  (state: RoleStateProps) => {
    return state.roleList || [];
  }
);

export const getRoleViewData = createSelector(
  roleSelector,
  (state: RoleStateProps) => {
    return state.roleViewData || initRoleValues;
  }
);

export const getRoleTableData = createSelector(
  roleSelector,
  (state: RoleStateProps) => {
    return state.roleTableData || [];
  }
);
