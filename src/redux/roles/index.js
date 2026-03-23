export { getRoles, resetGetRoles, resetGetRolesState } from "./getRolesSlice";
export {
  getPermissions,
  resetGetPermissions,
  resetGetPermissionsState,
} from "./getPermissionsSlice";
export { createRole, resetCreateRole } from "./createRoleSlice";
export { updateRole, resetUpdateRole } from "./updateRoleSlice";
export { deleteRole, resetDeleteRole } from "./deleteRoleSlice";

export { default as getRolesReducer } from "./getRolesSlice";
export { default as getPermissionsReducer } from "./getPermissionsSlice";
export { default as createRoleReducer } from "./createRoleSlice";
export { default as updateRoleReducer } from "./updateRoleSlice";
export { default as deleteRoleReducer } from "./deleteRoleSlice";
