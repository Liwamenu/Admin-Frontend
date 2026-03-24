// MODULES
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//COMP
import StepBar from "../../common/stepBar";
import StepFrame from "../../common/stepFrame";
import PaymentTypes from "../../../enums/paymentTypes";
import DoubleArrowRI from "../../../assets/icon/doubleArrowR";

//STEPS
import FirstStep from "../extendLicenseSteps/1stStep";
import SecondStep from "../extendLicenseSteps/2ndStep";
import ThirdStep from "../extendLicenseSteps/3rdStep";
import FourthStep from "../extendLicenseSteps/4thStep";
import FifthStep from "../extendLicenseSteps/5thStep";

//REDUX
import { clearCart } from "../../../redux/cart/cartSlice";

const ExtendLicensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const pathArray = currentPath.split("/");
  const { user, restaurant } = location.state || {};
  const actionType = pathArray[pathArray.length - 1];

  const initialPackage = {
    value: null,
    label: "Lisans Paketi Seç",
    id: null,
    time: null,
  };

  const cartItems = useSelector((state) => state.cart.items);

  const steps = 5;
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [userInvData, setUserInvData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [restaurantData, setRestaurantData] = useState({
    label: "Restoran Seç",
  });
  const [licensePackageData, setLicensePackageData] = useState(initialPackage);
  const [paymentMethod, setPaymentMethod] = useState({
    selectedOption: PaymentTypes[0],
    options: PaymentTypes,
  });
  const selectedMethod = paymentMethod.selectedOption.value || "";

  useEffect(() => {
    return () => {
      if (cartItems) {
        dispatch(clearCart());
        setLicensePackageData(initialPackage);
      }
    };
  }, []);

  return (
    <section className="lg:ml-[280px] pt-28 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-max flex gap-1 text-[--gr-1] pt-4 text-sm font-[300] cursor-pointer">
        <div
          className="flex items-center gap-1"
          onClick={() =>
            navigate(currentPath.replace("/extend-license", ""), {
              replace: true,
            })
          }
        >
          {currentPath.includes("users") &&
            (user ? (
              <>
                {user.fullName} <DoubleArrowRI />
              </>
            ) : (
              <>
                Kullanıcılar <DoubleArrowRI />
              </>
            ))}
          {currentPath.includes("restaurants") &&
            (restaurant ? (
              <>
                {restaurant.name} <DoubleArrowRI />
              </>
            ) : (
              <>
                Restoranlar <DoubleArrowRI />
              </>
            ))}
          Lisanslar
          <DoubleArrowRI />
          Lisansı Uzat
        </div>
      </div>

      <div className="flex flex-col items-center w-full text-base">
        <div className="flex flex-col w-full pt-4 pb-4 text-[--black-2] relative max-w-xl">
          <StepBar step={step} steps={steps} className="px-10" />

          <div className="w-full self-center overflow-x-clip">
            <div
              className={`w-full h-[32rem] border-2 border-dashed border-[--light-3] rounded-sm relative ${
                selectedMethod === "onlinePayment" && step === 2 && "h-[31rem]"
              }`}
            >
              <div className="w-full h-full">
                <StepFrame
                  step={step}
                  steps={steps}
                  percent={40}
                  measure="rem"
                  component={[
                    <FirstStep
                      key={0}
                      step={step}
                      restaurantData={restaurantData}
                      setRestaurantData={setRestaurantData}
                      licensePackageData={licensePackageData}
                      setLicensePackageData={setLicensePackageData}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      setStep={setStep}
                      actionType={actionType}
                    />,
                    <SecondStep
                      key={1}
                      step={step}
                      setStep={setStep}
                      userData={userData}
                      setUserData={setUserData}
                      userInvData={userInvData}
                      restaurantData={restaurantData}
                      setUserInvData={setUserInvData}
                    />,
                    <ThirdStep
                      key={2}
                      step={step}
                      steps={steps}
                      setStep={setStep}
                      userData={userData}
                      userInvData={userInvData}
                      paymentMethod={paymentMethod}
                      setPaymentStatus={setPaymentStatus}
                    />,
                    <FourthStep
                      key={3}
                      step={step}
                      user={userData}
                      setStep={setStep}
                      userInvData={userInvData}
                      paymentMethod={paymentMethod}
                      setPaymentStatus={setPaymentStatus}
                    />,
                    <FifthStep
                      key={4}
                      step={step}
                      paymentMethod={paymentMethod}
                      paymentStatus={paymentStatus}
                    />,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtendLicensePage;
