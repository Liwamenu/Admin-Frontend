import { useEffect, useRef } from "react";
import { CancelI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import CreatePaymentLink from "./createPaymentLink";

const TakePayment = ({ onSuccess }) => {
  const { setPopupContent } = usePopup();
  return (
    <button
      className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
      onClick={() => {
        setPopupContent(<TakePaymentPopup data={null} onSuccess={onSuccess} />);
      }}
    >
      Ödeme Linki Oluştur
    </button>
  );
};

export default TakePayment;

function TakePaymentPopup({ onSuccess }) {
  const { setPopupContent } = usePopup();

  return (
    <main>
      <div className="w-full flex justify-center">
        <div className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
          <div className="flex flex-col bg-[--white-1] relative">
            <div className="absolute -top-6 right-3">
              <div
                className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
                onClick={() => setPopupContent(false)}
              >
                <CancelI />
              </div>
            </div>
            <h1 className="self-center text-2xl font-bold">Ödeme Al</h1>

            <main className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left gap-2">
              <CreatePaymentLink onSuccess={onSuccess} />
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
