import { createSelector } from '@reduxjs/toolkit';
import { StateAll } from './types';

export const roleSelector = (state: StateAll) => state;

export const getNewestProductList = createSelector(
  roleSelector,
  (state: StateAll) => {
    return state.homePage.newProductsList || [];
  }
);
