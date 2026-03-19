import { combineReducers } from "@reduxjs/toolkit";
import getPaymentsSlice from "./getPaymentsSlice";
import updatePaymentStatusSlice from "./updatePaymentStatusSlice";
import deletePaymentByIdSlice from "./deletePaymentByIdSlice";
import createPaymentLinkSlice from "./createPaymentLinkSlice";
import deletePaymentLinkSlice from "./deletePaymentLinkSlice";
import addPaymentSlice from "./addPaymentSlice";
import sendSMSPaymentLinkSlice from "./sendSMSPaymentLinkSlice";
import sendEmailPaymentLinkSlice from "./sendEmailPaymentLinkSlice";

// Slices
const paymentsSlice = combineReducers({
  get: getPaymentsSlice,
  add: addPaymentSlice,
  deleteById: deletePaymentByIdSlice,
  cancelById: deletePaymentLinkSlice,
  updateStatus: updatePaymentStatusSlice,
  createPayemtLink: createPaymentLinkSlice,
  sendSMSPaymentLink: sendSMSPaymentLinkSlice,
  sendEmailPaymentLink: sendEmailPaymentLinkSlice,
});

export default paymentsSlice;
