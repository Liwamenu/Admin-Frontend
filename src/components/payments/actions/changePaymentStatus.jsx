//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CancelI } from "../../../assets/icon";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";

//DATA
import statuses from "../../../enums/statuses";

//REDUX
import {
  updatePaymentStatus,
  resetUpdatePaymentStatus,
} from "../../../redux/payments/updatePaymentStatusSlice";

const ChangePaymentStatus = ({ payment, onSuccess }) => {
  const paymentStatusRef = useRef();
  const { setPopupContent } = usePopup();
  const statusClass = paymentStatus(payment).statusClass;

  const handleEditPaymentStatus = () => {
    setPopupContent(
      <EditPaymentStatusPopup payment={payment} onSuccess={onSuccess} />,
    );
  };

  return (
    <>
      <span
        className={`text-xs font-normal px-3 py-1 border border-solid rounded-full cursor-pointer ${statusClass} `}
        onClick={handleEditPaymentStatus}
        ref={paymentStatusRef}
      >
        ● {statuses.find((s) => s.value === payment.status)?.label}
      </span>
    </>
  );
};

export default ChangePaymentStatus;

function EditPaymentStatusPopup({ payment, onSuccess }) {
  const toastId = useRef();
  const dispatch = useDispatch();
  const statusClass = paymentStatus(payment).statusClass;

  const { loading, success, error } = useSelector(
    (state) => state.payments.updateStatus,
  );

  const { setPopupContent, contentRef, setContentRef } = usePopup();

  const [paymentData, setPaymentData] = useState({
    paymentId: payment.id,
    status: payment.status,
    selectData: { value: null, label: "Durum seç" },
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  function editPaymentStatus(e) {
    e.preventDefault();
    dispatch(updatePaymentStatus(paymentData));
  }

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...🤩");
    }
    if (error) {
      dispatch(resetUpdatePaymentStatus());
    } else if (success) {
      onSuccess();
      closeForm();
      toastId.current && toast.dismiss(toastId.current);
      toast.success("Ödemenın durumu güncelendi🥳");
      dispatch(resetUpdatePaymentStatus());
    }
  }, [loading, success, error]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-3">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={closeForm}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Ödemenın Durumu</h1>
          <form
            onSubmit={editPaymentStatus}
            className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left gap-2"
          >
            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">Durum:</p>
              <p
                className={`py-3 border border-dashed w-24 text-center rounded-md ${statusClass}`}
              >
                ● {statuses.find((s) => s.value === payment.status)?.label}
              </p>
            </div>

            {payment.url && (
              <div className="max-w-full flex gap-12 items-center mt-2">
                <p className="min-w-28">Dekont:</p>
                <p className="max-w-28 text-sm text-[--link-1] text-wrap">
                  <a href={payment.url} target="_blank">
                    Dekontu Gör
                  </a>
                </p>
              </div>
            )}

            <div className="w-full flex gap-12 items-center">
              <p className="min-w-28">İşlem:</p>
              <CustomSelect
                required={true}
                label="Durum"
                placeholder="Durum"
                style={{ padding: "1px 0px" }}
                className="text-sm"
                value={paymentData.selectData}
                options={statuses.filter((s) => s.id !== payment.status)}
                onChange={(selectedOption) => {
                  setPaymentData((prev) => {
                    return {
                      ...prev,
                      selectData: selectedOption,
                      status: selectedOption.value,
                    };
                  });
                }}
              />
            </div>

            <div className="w-full flex gap-12 items-center justify-end">
              <button
                disabled={loading}
                className="py-2 px-3 bg-[--primary-1] text-white rounded-lg"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function paymentStatus(payment) {
  const paymentStat = payment.status;
  const status = statuses.find((s) => s.value === paymentStat)?.value;
  const waiting = "text-[--yellow-1] bg-[--status-yellow] border-[--yellow-1]";
  const success = "text-[--green-1] bg-[--status-green] border-[--green-1]";
  const canceled = "text-[--red-1] bg-[--status-red] border-[--red-1]";
  const statusClass =
    status === "Waiting" ? waiting : status === "Success" ? success : canceled;

  return { statusClass };
}
