import { combineReducers } from 'redux';
import * as types from './types';

const homePageReducer = (
  state: types.HomePageProps = types.initHomePagesValues,
  action: {
    type: types.TypeValues;
    payload: any;
  }
): types.HomePageProps => {
  const { type, payload } = action;
  switch (type) {
    case types.TypeValues.setNewestProductList:
      return {
        ...state,
        newProductsList: payload || [],
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  homePage: homePageReducer,
});

export default reducers;
