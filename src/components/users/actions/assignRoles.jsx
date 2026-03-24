//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import ActionButton from "../../common/actionButton";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";
import { CancelI, UserPlusI } from "../../../assets/icon";
import LoadingI2 from "../../../assets/anim/spinner";

//REDUX
import {
  assignUserRoles,
  resetAssignUserRoles,
} from "../../../redux/roles/assignUserRolesSlice";
import { getRoles } from "../../../redux/roles/getRolesSlice";

const AssignRoles = ({ user, onSuccess }) => {
  const { setPopupContent } = usePopup();

  const handleClick = () => {
    setPopupContent(<AssignRolesPopup user={user} onSuccess={onSuccess} />);
  };

  return (
    <ActionButton
      element={<UserPlusI className="w-5" />}
      element2="Rol Ata"
      onClick={handleClick}
    />
  );
};

export default AssignRoles;

////******POPUP COMPONENT*******////
const AssignRolesPopup = ({ user, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.assignUserRoles,
  );
  const { roles: rolesData } = useSelector((state) => state.getRoles);

  const userCurrentRole = user.roles?.[0] || user.role || "User";

  const [roleData, setRoleData] = useState({
    userId: user.id,
    roles: [userCurrentRole],
  });

  const [roles, setRoles] = useState([{ value: "User", label: "Normal User" }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roleData.roles || roleData.roles.length === 0) {
      toast("Lütfen bir rol seçiniz");
      return;
    }

    dispatch(assignUserRoles(roleData));
  };

  const clearForm = () => {
    setPopupContent(null);
  };

  // GET ROLES AND FORMAT
  useEffect(() => {
    if (!rolesData) {
      dispatch(getRoles());
      return;
    }

    const apiRoles = (rolesData?.data || []).map((role) => ({
      value: role.role,
      label: role.role,
      id: role.id,
    }));

    const hasNormalUser = apiRoles.some((role) => role.value === "User");
    const formattedRoles = hasNormalUser
      ? apiRoles
      : [{ value: "User", label: "Normal User" }, ...apiRoles];

    setRoles(formattedRoles);
  }, [rolesData, dispatch]);

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Rol atanıyor...");
    } else if (error) {
      toast.dismiss(toastId.current);
      error?.message_TR
        ? toast.error(error.message_TR)
        : toast.error("Bir hata oluştu");
      dispatch(resetAssignUserRoles());
    } else if (success) {
      toast.dismiss(toastId.current);
      toast.success("Rol başarıyla atandı");
      onSuccess();
      clearForm();
      dispatch(resetAssignUserRoles());
    }
  }, [loading, success, error, dispatch]);

  return (
    <div className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] relative">
      {loading && (
        <div className="flex justify-center items-center absolute top-24 bottom-0 left-0 right-0 bg-slate-950/[.01]  z-10">
          <div className="pb-72">
            <LoadingI2 className="rounded-full scale-150" />
          </div>
        </div>
      )}
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={clearForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">Rol Ata</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-sm text-[--gr-1] mb-2">
                Kullanıcı: <strong>{user.fullName}</strong>
              </p>
              <p className="text-sm text-[--gr-1] mb-4">
                Mevcut Rol: <strong>{userCurrentRole}</strong>
              </p>
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <CustomSelect
                required={true}
                label="Yeni Rol"
                placeholder="Rol seçiniz"
                style={{ padding: "1px 0px" }}
                className="text-sm"
                value={
                  roles.find((r) => r.value === roleData.roles[0]) || roles[0]
                }
                options={roles}
                onChange={(selectedOption) => {
                  setRoleData((prev) => ({
                    ...prev,
                    roles: [selectedOption.value],
                  }));
                }}
              />
            </div>

            <div className="w-full flex justify-end gap-3 mt-10">
              <button
                disabled={loading}
                type="button"
                onClick={clearForm}
                className="py-2 px-3 bg-[--light-3] text-[--black-2] rounded-lg hover:bg-[--light-4] transition-colors"
              >
                İptal
              </button>
              <button
                disabled={loading}
                className="py-2 px-3 bg-[--primary-1] text-white rounded-lg hover:bg-[--primary-3] transition-colors disabled:opacity-50"
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
