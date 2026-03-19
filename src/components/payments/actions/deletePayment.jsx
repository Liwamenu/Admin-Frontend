import toast from "react-hot-toast";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { DeleteI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";

//REDUX
import {
  deletePaymentById,
  resetDeletePaymentById,
} from "../../../redux/payments/deletePaymentByIdSlice";

const DeletePayment = ({ payment, onSuccess }) => {
  const { setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setPopupContent(<DeletePopup data={payment} onSuccess={onSuccess} />);
  };

  return (
    <ActionButton
      element2="Sil"
      onClick={handlePopup}
      className="text-[--red-1]"
      element={<DeleteI className="w-[1.1rem]" />}
    />
  );
};

export default DeletePayment;

const DeletePopup = ({ data, onSuccess }) => {
  const dispatch = useDispatch();
  const toastId = useRef();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.payments.deleteById
  );

  const handleDelete = () => {
    dispatch(deletePaymentById({ paymentId: data.id }));
  };

  //TOAST DELETE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      dispatch(resetDeletePaymentById());
      toast.dismiss(toastId.current);
    }
    if (success) {
      onSuccess();
      setPopupContent(false);
      dispatch(resetDeletePaymentById());
      toast.dismiss(toastId.current);
      toast.success("Ödeme Başarıyla Silindi");
    }
  }, [loading, success, error, dispatch]);

  return (
    <section className="w-full flex items-center">
      <div className="flex flex-col mx-auto w-full max-w-xl pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base">
        <h1 className="self-center text-2xl font-bold">Silinecek</h1>
        <div className="flex flex-col px-4 mt-9 w-full text-left">
          <p className="self-center">
            Ödemeyı Silmek istediğinizden emin misiniz ?
          </p>

          <div className="flex gap-3 self-center mt-9 text-white">
            <button
              className="px-10 py-2 text-base bg-[--red-1] rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handleDelete}
            >
              Sil
            </button>
            <button
              className="px-6 py-2 text-base bg-[--primary-1] rounded-lg"
              onClick={() => {
                setPopupContent(false);
              }}
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
