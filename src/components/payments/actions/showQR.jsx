//MODULES
import React, { useEffect, useRef } from "react";

//COMP
import QrGenerator from "../../common/qrGenerator";
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";
import { CancelI, CopyI, QRI } from "../../../assets/icon";

const ShowQR = ({ payment }) => {
  const { setPopupContent } = usePopup();
  const URL = payment.URL;
  const handlePopup = (event) => {
    event.stopPropagation();
    setPopupContent(<ShowQRPopup URL={URL} copy={payment.copy} />);
  };

  return (
    URL && (
      <ActionButton
        element2="QR Göster"
        onClick={handlePopup}
        element={<QRI className="w-[1.1rem]" />}
      />
    )
  );
};

export default ShowQR;

//
////
const ShowQRPopup = ({ URL, copy }) => {
  const { setPopupContent } = usePopup();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-white transition-colors"
              onClick={() => setPopupContent(false)}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">QR Kod</h1>
          <QrGenerator url={URL} />
          <div className="w-full flex justify-center items-center">
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
        </div>
      </div>
    </div>
  );
};
