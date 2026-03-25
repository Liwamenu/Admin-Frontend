import { combineReducers } from "@reduxjs/toolkit";
import getAdminSummarySlice from "./getAdminSummarySlice";

const statisticsSlice = combineReducers({
  getAdminSummary: getAdminSummarySlice,
});

export default statisticsSlice;
