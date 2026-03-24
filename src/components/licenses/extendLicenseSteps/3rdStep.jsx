//MODULES
import { useLocation } from "react-router-dom";

//COMP
import ThirdStepBankPayment from "./3thStepBankPayment";
import OnlinePayment from "../paymentTypes/onlinePayment";
import WithOutPayment from "../paymentTypes/withOutPayment";

const ThirdStep = ({
  step,
  steps,
  setStep,
  userData,
  userInvData,
  paymentMethod,
  setPaymentStatus,
}) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const actionType = pathArray[pathArray.length - 1];

  const value = paymentMethod.selectedOption.value;
  return (
    step === 3 && (
      <div className="h-full">
        <div className="flex flex-col w-full items-center h-full overflow-y-auto">
          {value === "onlinePayment" ? (
            <OnlinePayment
              steps={steps}
              setStep={setStep}
              userData={userData}
              actionType={actionType}
              userInvData={userInvData}
              setPaymentStatus={setPaymentStatus}
            />
          ) : value === "bankPayment" ? (
            <ThirdStepBankPayment step={step} setStep={setStep} />
          ) : (
            <WithOutPayment
              step={step}
              user={userData}
              setStep={setStep}
              actionType={actionType}
              setPaymentStatus={setPaymentStatus}
            />
          )}
        </div>
      </div>
    )
  );
};

export default ThirdStep;
