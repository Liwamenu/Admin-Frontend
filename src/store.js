import { configureStore } from "@reduxjs/toolkit";

// INDEX
import authSlice from "./redux/auth";
import dataSlice from "./redux/data";
import adminSlice from "./redux/admin";
// import generalVariablesSlice from "./redux/generalVars";
import licensePackagesSlice from "./redux/licensePackages";
import licensesSlice from "./redux/licenses";
import restaurantsSlice from "./redux/restaurants";
// import userSlice from "./redux/user";
import usersSlice from "./redux/users";
// import getContextSlice from "./redux/payTR/getContextSlice";
import cartSlice from "./redux/cart/cartSlice";
// import templatesSlice from "./redux/templates";
// import accountsSlice from "./redux/accounts";
// import dashboardSlice from "./redux/dashboard";
// import messagesSlice from "./redux/messages";
import paymentsSlice from "./redux/payments";
import parametersSlice from "./redux/parameters";
import statisticsSlice from "./redux/statistics";
// import getirYemekSlice from "./redux/getirYemek";
// import integrationInformationsSlice from "./redux/informations";
// import managersSlice from "./redux/managers";
import loadingSlice from "./redux/loadingSlice";
import loadingMiddleware from "../middlewares/loadingMiddleware";
import getRolesReducer from "./redux/roles/getRolesSlice";
import getPermissionsReducer from "./redux/roles/getPermissionsSlice";
import createRoleReducer from "./redux/roles/createRoleSlice";
import updateRoleReducer from "./redux/roles/updateRoleSlice";
import deleteRoleReducer from "./redux/roles/deleteRoleSlice";
import assignUserRolesReducer from "./redux/roles/assignUserRolesSlice";
// import emailSlice from "./redux/email";
// import smsSlice from "./redux/sms";
// import tempUsersSlice from "./redux/tempUsers";

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    // user: userSlice,
    users: usersSlice,
    // tempUsers: tempUsersSlice,
    restaurants: restaurantsSlice,
    licenses: licensesSlice,
    licensePackages: licensePackagesSlice,
    data: dataSlice,
    // generalVars: generalVariablesSlice,
    // getContext: getContextSlice,
    cart: cartSlice,
    // templates: templatesSlice,
    // accounts: accountsSlice,
    // dashboard: dashboardSlice,
    // messages: messagesSlice,
    payments: paymentsSlice,
    parameters: parametersSlice,
    statistics: statisticsSlice,
    // getirYemek: getirYemekSlice,
    // integrationInfos: integrationInformationsSlice,
    // managers: managersSlice,
    isLoading: loadingSlice,
    // email: emailSlice,
    getRoles: getRolesReducer,
    getPermissions: getPermissionsReducer,
    createRole: createRoleReducer,
    updateRole: updateRoleReducer,
    deleteRole: deleteRoleReducer,
    assignUserRoles: assignUserRolesReducer,
    // sms: smsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingMiddleware),
});

export default store;
