import { combineReducers } from "@reduxjs/toolkit";
import getSMSParametersSlice from "./getSMSParametersSlice";
import getEmailParametersSlice from "./getEmailParametersSlice";
import getPayTRParametersSlice from "./getPayTRParametersSlice";

const parametersSlice = combineReducers({
  sms: getSMSParametersSlice,
  email: getEmailParametersSlice,
  paytr: getPayTRParametersSlice,
});

export default parametersSlice;
