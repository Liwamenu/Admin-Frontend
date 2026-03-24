//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import LoadingI2 from "../../../../assets/anim/spinner";
import { CancelI, EditI } from "../../../../assets/icon";
import { usePopup } from "../../../../context/PopupContext";
import ActionButton from "../../../common/actionButton";
import CustomInput from "../../../common/customInput";
import CustomSelect from "../../../common/customSelector";
import CustomPhoneInput from "../../../common/customPhoneInput";

//FUNC
import { formatEmail } from "../../../../utils/utils";

// REDUX
import {
  resetUpdateUser,
  updateUserData,
} from "../../../../redux/users/updateUserDataByIdSlice";
import { getRoles } from "../../../../redux/roles/getRolesSlice";

const EditUser = ({ user, onSuccess }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<EditUserPopup user={user} onSuccess={onSuccess} />);
  };
  return (
    <ActionButton
      element={<EditI className="w-5" strokeWidth="1.8" />}
      element2="Düzenle"
      onClick={handleClick}
    />
  );
};

export default EditUser;

////******POPUP COMPONENT*******////
const EditUserPopup = ({ user, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.users.updateUser,
  );
  const { roles: rolesData } = useSelector((state) => state.getRoles);

  const initialRole = user.roles?.[0] || user.role || "User";

  const initialData = {
    id: user.id,
    userId: user.id,
    dealerId: user.dealerId,
    email: user.email,
    phoneNumber: "9" + user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    role: {
      value: initialRole,
      label: initialRole === "User" ? "Normal User" : initialRole,
    },
    checked: false,
  };

  const [userDataBefore, setUserDataBefore] = useState(initialData);
  const [userData, setUserData] = useState(initialData);
  const [roles, setRoles] = useState([{ value: "User", label: "Normal User" }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const equalData = isEqual(userDataBefore, userData);
    if (equalData) {
      toast("Her hangı bir deişiklik yapmadınız [user data]");
    } else {
      dispatch(
        updateUserData({
          ...userData,
          roles: [userData.role?.value || "User"],
          phoneNumber: userData.phoneNumber.slice(1),
        }),
      );
    }
  };

  // GET ROLES
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

  //TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Updating user data...");
    } else if (error) {
      toast.dismiss(toastId.current);
      error?.message_TR
        ? toast.error(error.message_TR)
        : toast.error("Something went wrong");
      dispatch(resetUpdateUser());
    } else if (success) {
      toast.dismiss(toastId.current);
      toast.success("User data updated successfully");
      onSuccess(); //renew users table
      setPopupContent(null);
      dispatch(resetUpdateUser());
    }
  }, [loading, success, error, dispatch]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] overflow-y-scroll relative">
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
            onClick={() => setPopupContent(null)}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">Kullanıcı Düzenle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          {user && (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 max-sm:flex-col">
                <CustomInput
                  required={true}
                  label="Ad"
                  placeholder="Ad"
                  className="py-[.45rem] text-sm"
                  value={userData.firstName}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        firstName: e,
                      };
                    });
                  }}
                />
                <CustomInput
                  required={true}
                  label="Soyad"
                  placeholder="Soyad"
                  className="py-[.45rem] text-sm"
                  value={userData.lastName}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        lastName: e,
                      };
                    });
                  }}
                />
              </div>
              <div className="flex gap-4 max-sm:flex-col">
                <CustomPhoneInput
                  required={true}
                  label="Telefone"
                  placeholder="Telefone"
                  className="py-[.45rem] text-sm"
                  value={userData.phoneNumber}
                  onChange={(phone) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        phoneNumber: phone,
                      };
                    });
                  }}
                  maxLength={14}
                />
                <CustomInput
                  required={true}
                  label="E-Posta"
                  placeholder="E-Posta"
                  className="py-[.45rem] text-sm"
                  value={userData.email}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        email: formatEmail(e),
                      };
                    });
                  }}
                />
              </div>

              <div className="flex gap-4 max-sm:flex-col">
                <CustomSelect
                  required={true}
                  label="Rol"
                  placeholder="Rol seç"
                  style={{ padding: "1px 0px" }}
                  className="text-sm"
                  value={
                    userData.role
                      ? userData.role
                      : { value: "User", label: "Normal User" }
                  }
                  options={roles}
                  onChange={(selectedOption) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        role: selectedOption,
                      };
                    });
                  }}
                />
              </div>

              {/* <div className="w-full flex justify-between mt-8">
                <CustomCheckbox
                  label="Kayıt Bilgilendirmesi gönder"
                  className="scale-95 font-[350]"
                  checked={userData.checked}
                  onChange={() => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        checked: !userData.checked,
                      };
                    });
                  }}
                />
              </div> */}
              <div className="w-full flex justify-end mt-10">
                <button
                  disabled={loading}
                  className="py-2 px-3 bg-[--primary-1] text-white rounded-lg"
                  type="submit"
                >
                  Kaydet
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
