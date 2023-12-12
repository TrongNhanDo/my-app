import { combineReducers } from 'redux';
import * as types from './types';

const roleReducer = (
  state: types.RoleStateProps = types.initRoleState,
  action: {
    type: types.TypeValues;
    payload: any;
  }
): types.RoleStateProps => {
  const { type, payload } = action;
  switch (type) {
    case types.TypeValues.setRoleList:
      return {
        ...state,
        roleList: payload || [],
      };
    case types.TypeValues.clearRoleList:
      return {
        ...state,
        roleList: [],
      };
    case types.TypeValues.addRole: {
      const oldArray = state.roleList
        ? state.roleList.map((value) => value)
        : [];
      oldArray.push(payload);
      return {
        ...state,
        roleList: oldArray,
      };
    }
    case types.TypeValues.deleteRole: {
      const newList = state.roleList
        ? state.roleList.filter((value) => value.roleName !== payload)
        : [];
      return {
        ...state,
        roleList: newList,
      };
    }
    case types.TypeValues.setRoleViewData:
      return {
        ...state,
        roleViewData: payload,
      };
    case types.TypeValues.setRoleTableData:
      return {
        ...state,
        roleTableData: payload,
      };
    default:
      return state;
  }
};

const userHomeReducer = (
  state: types.UserHomeProps = types.initUserHomeValues,
  action: {
    type: types.TypeValues;
    payload: any;
  }
): types.UserHomeProps => {
  const { type, payload } = action;
  switch (type) {
    case types.TypeValues.setRoleList:
      return {
        ...state,
        newProductsList: payload || [],
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  roles: roleReducer,
  userHomepage: userHomeReducer,
});

export default reducers;
