//MODULES
import { useEffect, useRef, useState } from "react";

//COMP
import ShowQR from "./showQR";
import CancelPayment from "./cancelLink";
import DeletePayment from "./deletePayment";
import { MenuI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import SendSMS from "./sendLinkSms";
import SendEmail from "./sendLinkEmail";
import ShowBasketPopup from "./showBasket";
import ShowDocument from "./showDocument";

const Actions = ({ index, payment, itemsPerPage, onSuccess }) => {
  const paymentsMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (paymentsMenuRef) {
      const refs = contentRef.filter((ref) => ref.id !== "paymentsActions");
      setContentRef([
        ...refs,
        {
          id: "paymentsActions",
          outRef: /* outRef.current ? outRef : */ null,
          ref: paymentsMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [paymentsMenuRef, openMenu]);
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={handleClick}
        ref={paymentsMenuRef}
      >
        <MenuI
          className={`w-full ${openMenu === index && "text-[--primary-2]"}`}
        />
      </div>
      <div
        className={`absolute right-9 border-2 border-solid border-[--light-3] rounded-sm z-10 shadow-lg overflow-hidden ${
          index < itemsPerPage / 2 ? "top-5" : "bottom-5"
        } ${openMenu !== index && "invisible"}`}
      >
        <ul className="bg-[--white-1] text-[--gr-1] w-52">
          <ShowQR payment={payment} />
          <SendSMS payment={payment} />
          <SendEmail payment={payment} />
          <CancelPayment payment={payment} onSuccess={onSuccess} />
          <DeletePayment payment={payment} onSuccess={onSuccess} />
          <ShowBasketPopup payment={payment} />
          <ShowDocument payment={payment} />
        </ul>
      </div>
    </>
  );
};

export default Actions;
