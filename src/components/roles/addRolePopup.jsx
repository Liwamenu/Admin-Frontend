import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CancelI } from "../../assets/icon";
import { usePopup } from "../../context/PopupContext";
import CustomInput from "../common/customInput";
import CustomCheckbox from "../common/customCheckbox";
import { createRole, resetCreateRole } from "../../redux/roles/createRoleSlice";
import { getPermissions } from "../../redux/roles/getPermissionsSlice";

const AddRolePopup = () => {
  const { setPopupContent } = usePopup();
  const dispatch = useDispatch();
  const toastId = useRef();

  const { success, loading, error } = useSelector((state) => state.createRole);
  const { permissions } = useSelector((state) => state.getPermissions);

  const [roleData, setRoleData] = useState({
    name: "",
    description: "",
    isActive: true,
    permissions: [],
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Fetch permissions
  useEffect(() => {
    dispatch(getPermissions());
  }, []);

  // Handle success
  useEffect(() => {
    if (success) {
      setPopupContent(false);
      toast.dismiss(toastId.current);
      toast.success("Rol başarıyla oluşturuldu", { id: "role-success" });
      dispatch(resetCreateRole());
    }
    if (loading) {
      toastId.current = toast.loading("İşleniyor...", { id: "role-success" });
    }
  }, [loading, success]);

  const handlePermissionChange = (permissionKey) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionKey)) {
        return prev.filter((p) => p !== permissionKey);
      } else {
        return [...prev, permissionKey];
      }
    });
  };

  const handleModulePermissionsChange = (modulePermissions, isChecked) => {
    setSelectedPermissions((prev) => {
      if (isChecked) {
        return [...new Set([...prev, ...modulePermissions])];
      }
      return prev.filter(
        (permission) => !modulePermissions.includes(permission),
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleData.name.trim()) {
      toast.error("Rol adı gereklidir");
      return;
    }

    dispatch(
      createRole({
        name: roleData.name,
        description: roleData.description,
        isActive: roleData.isActive,
        permissions: selectedPermissions,
      }),
    );
  };

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full pt-8 pb-4 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-3xl max-h-[95vh] overflow-y-auto">
        <div className="flex flex-col bg-[--white-1] relative px-6">
          <div className="absolute -top-4 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={() => setPopupContent(false)}
            >
              <CancelI />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6">Yeni Rol Oluştur</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Role Name */}
            <div>
              <CustomInput
                required
                type="text"
                label="Rol Adı"
                placeholder="Rol adı"
                value={roleData.name}
                onChange={(e) => setRoleData((prev) => ({ ...prev, name: e }))}
              />
            </div>

            {/* Description */}
            <div>
              <CustomInput
                type="text"
                label="Açıklama"
                placeholder="Rol açıklaması"
                value={roleData.description}
                onChange={(e) =>
                  setRoleData((prev) => ({ ...prev, description: e }))
                }
              />
            </div>

            {/* Active Status */}
            <div>
              <CustomCheckbox
                id="role-is-active"
                label="Aktif"
                checked={roleData.isActive}
                onChange={(e) =>
                  setRoleData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className2="text-sm text-[--black-1]"
              />
            </div>

            {/* Permissions */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">İzinler</h2>
              {permissions?.data ? (
                <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto border border-[--light-4] rounded-lg p-4">
                  {permissions.data.map((module) => (
                    <div key={module.module}>
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <h3 className="font-semibold text-sm capitalize">
                          {module.module}
                        </h3>
                        <CustomCheckbox
                          id={`select-all-${module.module}`}
                          label="Tumu"
                          checked={module.permissions.every((permission) =>
                            selectedPermissions.includes(permission),
                          )}
                          onChange={(e) =>
                            handleModulePermissionsChange(
                              module.permissions,
                              e.target.checked,
                            )
                          }
                          size="4"
                          className2="text-xs text-[--black-2]"
                        />
                      </div>
                      <div className="flex flex-col gap-2 ml-2">
                        {module.permissions.map((permission) => (
                          <CustomCheckbox
                            key={permission}
                            id={`permission-${permission}`}
                            label={permission}
                            checked={selectedPermissions.includes(permission)}
                            onChange={() => handlePermissionChange(permission)}
                            size="4"
                            className="w-full"
                            className2="text-sm text-[--black-2] break-all"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[--black-2]">İzinler yükleniyor...</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-2 justify-end pt-6">
              <button
                type="button"
                onClick={() => setPopupContent(false)}
                disabled={loading}
                className="px-6 py-2 border border-[--primary-2] text-[--primary-2] rounded-lg hover:bg-[--light-3] transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[--primary-1] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? "Oluşturuluyor..." : "Oluştur"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddRolePopup;
