import { useEffect, useState } from "react";
import CustomInput from "../../common/customInput";
import { getAuth } from "../../../redux/api";

import { useDispatch, useSelector } from "react-redux";
import CustomPhoneInput from "../../common/customPhoneInput";
import { formatEmail } from "../../../utils/utils";
import Button from "../../common/button";

import { isEqual } from "lodash";
import toast from "react-hot-toast";
import {
  resetUpdateAdminState,
  updateAdminData,
} from "../../../redux/admin/updateAdminDataSlice";

const EditAdminProfile = () => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.admin.updateAdminData,
  );
  const admin = getAuth().user;
  const initialData = {
    firstName: admin.firstName,
    lastName: admin.lastName,
    phoneNumber: admin.phoneNumber ? "9" + admin.phoneNumber : "",
    email: admin.email,
    roleId: admin.roles[0],
  };

  const [userDataBefore, setUserDataBefore] = useState(initialData);
  const [userData, setUserData] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(userDataBefore, userData)) {
      toast.error("Hiç bir geğişiklik yapmadınız");
    } else {
      dispatch(
        updateAdminData({
          ...userData,
          phoneNumber: userData.phoneNumber.slice(1),
        }),
      );
    }
  }

  // TOAST
  useEffect(() => {
    if (error) {
      dispatch(resetUpdateAdminState());
    } else if (success) {
      toast.success("Profiliniz başarıyla güncelendi🤩");
    }
  }, [loading, success, error]);

  return (
    <main className="flex flex-col items-start px-6 mt-10 w-full bg-[--white-1] min-h-0 max-md:px-5">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="w-full max-w-3xl flex max-sm:flex-col sm:gap-10 gap-2 max-sm:items-center">
          <CustomInput
            label="Ad"
            className="rounded-2xl py-3.5"
            value={userData.firstName}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  firstName: e,
                };
              });
            }}
          />
          <CustomInput
            label="Soyad"
            className="rounded-2xl py-3.5"
            value={userData.lastName}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  lastName: e,
                };
              });
            }}
          />
        </div>
        <div className="w-full max-w-3xl flex max-sm:flex-col sm:gap-10 gap-2 max-sm:items-center">
          <CustomPhoneInput
            label="Telefon"
            className="rounded-2xl py-3.5"
            value={userData.phoneNumber}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  phoneNumber: e,
                };
              });
            }}
          />

          <CustomInput
            label="E-Posta"
            className="rounded-2xl py-3.5"
            value={userData.email}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  email: formatEmail(e),
                };
              });
            }}
          />
        </div>

        <div className="flex justify-end mt-16 sm:mt-52">
          <Button
            text="Kaydet"
            className="bg-[--primary-1] text-white text-[1.1rem] rounded-xl py-[.8rem] sm:px-16 border-[0px]"
            type="submit"
          />
        </div>
      </form>
    </main>
  );
};

export default EditAdminProfile;
