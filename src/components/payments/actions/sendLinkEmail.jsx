//MODULES
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";

//COMP
import CustomInput from "../../common/customInput";
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";
import { CancelI, CopyI, SendI } from "../../../assets/icon";

//REDUX
import {
  sendEmailPaymentLink,
  resetSendEmailPaymentLink,
} from "../../../redux/payments/sendEmailPaymentLinkSlice";

const SendEmail = ({ payment }) => {
  const { setPopupContent } = usePopup();
  const URL = payment.URL;
  const handlePopup = (event) => {
    event.stopPropagation();
    setPopupContent(<SendEmailPopup URL={URL} copy={payment.copy} />);
  };

  return (
    URL && (
      <ActionButton
        element2="E-Posta Gönder"
        onClick={handlePopup}
        element={<SendI className="w-[1.1rem] -rotate-45" />}
      />
    )
  );
};

export default SendEmail;

//
////
const SendEmailPopup = ({ URL, copy }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success } = useSelector(
    (state) => state.payments.sendEmailPaymentLink
  );

  const [toAddress, setToAddress] = useState("");

  //send email
  function sendEmail(e) {
    e.preventDefault();
    dispatch(sendEmailPaymentLink({ toAddress, payTRPaymentLink: URL }));
  }

  //e-posta toast
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("E-Posta İşleniyor...");
    }
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("E-Posta Başarıyla Gönderildi.");
      dispatch(resetSendEmailPaymentLink());
    }
  }, [loading, success]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-lg">
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

          <form onSubmit={sendEmail}>
            <div className="px-6">
              <CustomInput
                required
                type="email"
                label="E-Posta"
                value={toAddress}
                onChange={(e) => setToAddress(e)}
              />
            </div>

            <div className="mt-10 flex justify-center gap-3 px-4 text-white">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 text-base bg-[--primary-1] rounded-lg"
              >
                E-Posta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
