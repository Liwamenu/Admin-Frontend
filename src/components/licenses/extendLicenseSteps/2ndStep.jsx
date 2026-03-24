//MODULES
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import BackButton from "../stepsAssets/backButton";
import ForwardButton from "../stepsAssets/forwardButton";

//REDUX
import { getUser, resetGetUser } from "../../../redux/users/getUserByIdSlice";

const SecondStep = ({
  step,
  setStep,
  userData,
  setUserData,
  restaurantData,
}) => {
  const dispatch = useDispatch();

  const { error: getUserErr, user } = useSelector(
    (state) => state.users.getUser,
  );

  //SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    setStep(step + 1);
  }

  //GET USER
  useEffect(() => {
    if (!userData && restaurantData?.userId) {
      dispatch(getUser({ userId: restaurantData?.userId }));
    }
  }, [userData, restaurantData]);

  //SET USER AND INVOICE
  useEffect(() => {
    if (user) {
      setUserData(user);
      if (user.userInvoiceAddressDTO)
        setUserInvData(user.userInvoiceAddressDTO);
      dispatch(resetGetUser());
    } else if (getUserErr) {
      dispatch(resetGetUser());
    }
  }, [user, getUserErr]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full">
        {userData ? (
          <div>
            <h3>{userData.fullName}</h3>
            <p>{userData.email}</p>
          </div>
        ) : (
          <div>Kullanıcı bulunamadı.</div>
        )}
      </div>

      {/* BTNS */}
      <div className="flex gap-3 absolute -bottom-20 -right-0 h-12">
        <BackButton
          text="Geri"
          letIcon={true}
          onClick={() => setStep(step - 1)}
        />
        <ForwardButton text="Devam" letIcon={true} type="submit" />
      </div>
    </form>
  );
};

export default SecondStep;
