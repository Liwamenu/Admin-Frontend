//MODULES
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";

//COMP
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";
import { CancelI, CopyI, SendI } from "../../../assets/icon";
import CustomPhoneInput from "../../common/customPhoneInput";

//REDUX
import {
  sendSMSPaymentLink,
  resetSendSMSPaymentLink,
} from "../../../redux/payments/sendSMSPaymentLinkSlice";

const SendSMS = ({ payment }) => {
  const { setPopupContent } = usePopup();
  const URL = payment.URL;
  const handlePopup = (event) => {
    event.stopPropagation();
    setPopupContent(<SendSMSPopup URL={URL} copy={payment.copy} />);
  };

  return (
    URL && (
      <ActionButton
        element2="SMS Gönder"
        onClick={handlePopup}
        element={<SendI className="w-[1.1rem] -rotate-45" />}
      />
    )
  );
};

export default SendSMS;

//
////
const SendSMSPopup = ({ URL, copy }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success } = useSelector(
    (state) => state.payments.sendSMSPaymentLink
  );

  const [phoneNumber, setPhoneNumber] = useState("");

  //semd sms
  function sendSMS(e) {
    e.preventDefault();
    dispatch(
      sendSMSPaymentLink({
        phoneNumber: phoneNumber.slice(1),
        payTRPaymentLink: URL,
      })
    );
  }

  //sms toast
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("SMS İşleniyor...");
    }
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("SMS Başarıyla Gönderildi.");
      dispatch(resetSendSMSPaymentLink());
    }
  }, [loading, success]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full  max-w-lg pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2]">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-white transition-colors"
              onClick={() => setPopupContent(false)}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Bağlantıyı Gönder</h1>

          <div className="w-full flex justify-center items-center py-6">
            <a
              href={URL}
              target="_blank"
              className="text-center text-[--primary-1]"
            >
              {URL}
            </a>
            <button
              onClick={() => copy()}
              className="size-7 flex justify-center items-center rounded-full border border-[--primary-1] ml-3"
            >
              <CopyI className="mx-1 text-[--primary-1]" strokeWidth={2} />
            </button>
          </div>
          <form onSubmit={sendSMS}>
            <div className="px-6">
              <CustomPhoneInput
                required
                label="Tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e)}
              />
            </div>

            <div className="mt-10 flex justify-center gap-3 px-4 text-white">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 text-base bg-[--primary-1] rounded-lg"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
