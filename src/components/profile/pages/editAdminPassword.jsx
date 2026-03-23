//MOD
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import Button from "../../common/button";
import CustomInput from "../../common/customInput";

// REDUX
import {
  resetUpdateAdminPassword,
  updateAdminPassword,
} from "../../../redux/admin/updateAdminPasswordSlice";

const EditAdminPassword = () => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.admin.updatePassword
  );

  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Updating password...");
    } else if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUpdateAdminPassword());
    } else if (success) {
      toast.dismiss(toastId.current);
      toast.success("Password updated");
      dispatch(resetUpdateAdminPassword());
    }
  }, [loading, success, error, dispatch]);

  function handleSubmit(e) {
    e.preventDefault();

    if (userPassword.confirmPassword !== userPassword.password) {
      toast.error("Şifreler aynı değil");
      return;
    }

    dispatch(
      updateAdminPassword({
        newPassword: userPassword.password,
        newPasswordConfirm: userPassword.confirmPassword,
      })
    );
  }

  return (
    <main className="flex flex-col items-start px-6 mt-10 w-full bg-[--white-1] min-h-0 max-md:px-5">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex gap-4 mt-4 max-sm:flex-col  max-w-3xl">
          <CustomInput
            required
            label="Şifre"
            placeholder="Şifre"
            className="py-3.5 text-sm"
            letIcon={true}
            minLength={4}
            value={userPassword.password}
            onChange={(e) => {
              setUserPassword((prev) => {
                return {
                  ...prev,
                  password: e,
                };
              });
            }}
          />
          <CustomInput
            required
            label="Şifreyi onayla"
            placeholder="Şifre"
            className="py-3.5 text-sm"
            letIcon={true}
            minLength={4}
            value={userPassword.confirmPassword}
            onChange={(e) => {
              setUserPassword((prev) => {
                return {
                  ...prev,
                  confirmPassword: e,
                };
              });
            }}
          />
        </div>

        <div className="flex justify-end mt-16">
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

export default EditAdminPassword;
