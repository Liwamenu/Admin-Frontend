//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomInput from "../../common/customInput";
import CustomCheckbox from "../../common/customCheckbox";
import CustomDatePicker from "../../common/customDatePicker";
import CustomPhoneInput from "../../common/customPhoneInput";
import { CancelI, CopyI, DeleteI } from "../../../assets/icon";
import CustomNumberSlider from "../../common/customNumberSlider";

//UTILS
import {
  copyToClipboard,
  formatToIso,
  formatToPrice,
  validPrice,
} from "../../../utils/utils";

//REDUX
import {
  createPaymentLink,
  resetCreatePaymentLink,
} from "../../../redux/payments/createPaymentLinkSlice";
import {
  sendEmailPaymentLink,
  resetSendEmailPaymentLink,
} from "../../../redux/payments/sendEmailPaymentLinkSlice";
import {
  sendSMSPaymentLink,
  resetSendSMSPaymentLink,
} from "../../../redux/payments/sendSMSPaymentLinkSlice";

const CreatePaymentLink = ({ onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { data, success, loading } = useSelector(
    (state) => state.payments.createPayemtLink
  );
  const { loading: smsLoading, success: smsSuccess } = useSelector(
    (state) => state.payments.sendSMSPaymentLink
  );
  const { loading: emailLoading, success: emailSuccess } = useSelector(
    (state) => state.payments.sendEmailPaymentLink
  );

  const [copied, setCopied] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentData, setPaymentData] = useState({
    basket: [{ name: "", price: "", unFormattedPrice: "" }],
    products: "",
    totalPrice: "",
    unFormattedTotalPrice: "",
    installment: 1,
    stockQuantity: "",
    createQR: true,
    expiryDate: "",
    unFormattedEndDate: "",
  });

  // Handle Submit
  function handleSubmit(e) {
    e.preventDefault();
    console.log(paymentData);
    dispatch(createPaymentLink(paymentData));
  }

  //send email
  function sendEmail(e) {
    e.preventDefault();
    dispatch(
      sendEmailPaymentLink({ toAddress, payTRPaymentLink: paymentLink })
    );
  }

  //semd sms
  function sendSMS(e) {
    e.preventDefault();
    dispatch(
      sendSMSPaymentLink({
        phoneNumber: phoneNumber.slice(1),
        payTRPaymentLink: paymentLink,
      })
    );
  }

  // Handle adding a new item
  function handleAddItem() {
    setPaymentData((prev) => ({
      ...prev,
      basket: [...prev.basket, { name: "", price: "" }],
    }));
  }

  // Handle removing an item by index
  function handleRemoveItem(index) {
    setPaymentData((prev) => ({
      ...prev,
      basket: prev.basket.filter((_, i) => i !== index),
    }));
  }

  //LINK TOAST
  useEffect(() => {
    if (success) {
      onSuccess();
      toast.dismiss(toastId.current);
      const elmnt = (
        <div>
          <p>Ödeme bağlantınız başarıyla oluşturulmuştur.</p>
          {!data?.data?.link && (
            <p className="text-[--red-1] font-bold">
              Ancak işlem başarısız olmuştur.
            </p>
          )}
        </div>
      );
      toast.success(elmnt);
      console.log(data);
      setPaymentLink(data?.data?.link);
      dispatch(resetCreatePaymentLink());
    }
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
  }, [loading, success, data]);

  //sms toast
  useEffect(() => {
    if (smsLoading) {
      toastId.current = toast.loading("SMS İşleniyor...");
    }
    if (smsSuccess) {
      toast.dismiss(toastId.current);
      toast.success("SMS Başarıyla Gönderildi.");
      dispatch(resetSendSMSPaymentLink());
    }
  }, [smsLoading, smsSuccess]);

  //e-posta toast
  useEffect(() => {
    if (emailLoading) {
      toastId.current = toast.loading("E-Posta İşleniyor...");
    }
    if (emailSuccess) {
      toast.dismiss(toastId.current);
      toast.success("E-Posta Başarıyla Gönderildi.");
      dispatch(resetSendEmailPaymentLink());
    }
  }, [emailLoading, emailSuccess]);

  return paymentLink ? (
    <div>
      <div>
        <p className="border-b border-[--link-1] font-bold mb-9">
          Ödeme linki başarıyla oluşturulmuştur.
        </p>
      </div>
      <div>
        <p>Ödeme linkiniz:</p>
        <div
          className="flex items-center text-[--link-1] cursor-pointer"
          onClick={() =>
            copyToClipboard({ text: paymentLink, setStatus: setCopied })
          }
        >
          <p className="text-sm overflow-wrap break-all">{paymentLink}</p>
          <button className="min-w-max px-3">
            <CopyI strokeWidth={2} />
          </button>
        </div>
        <div className="h-9 flex items-end">
          {copied && <p className="text-green-500">Bağlantı kopyalandı!</p>}
        </div>
      </div>

      <form onSubmit={sendEmail}>
        <div>
          <CustomInput
            required
            type="email"
            label="E-Posta"
            value={toAddress}
            onChange={(e) => setToAddress(e)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm bg-[--primary-1] rounded-md"
          >
            E-Posta
          </button>
        </div>
      </form>

      <form onSubmit={sendSMS}>
        <div>
          <CustomPhoneInput
            required
            label="Tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-2 text-sm bg-[--primary-1] rounded-md"
          >
            SMS
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="w-full overflow-x-hidden max-h-[80dvh] overflow-y-auto">
      <p className="border-b border-[--link-1] mb-3 font-bold">
        Ödeme linki oluştur
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-end">
            <button onClick={handleAddItem} type="button">
              <CancelI
                strokeWidth={3}
                className="rotate-45 text-[--primary-1] size-[19px] hover:rotate-[90] transition-transform duration-1000"
              />
            </button>
          </div>

          {paymentData.basket.map((item, index) => (
            <div key={index} className="flex gap-2">
              <CustomInput
                required
                label={index == 0 ? "Ürün Adı" : ""}
                className2="mt-[0] sm:mt-[0]"
                className="mt-[0] sm:mt-[0] text-sm py-[6px]"
                value={item.name}
                onChange={(e) =>
                  setPaymentData((prev) => {
                    const newBasket = [...prev.basket];
                    newBasket[index].name = e;
                    const products = newBasket.map((B) => B.name).join(", ");
                    return { ...prev, products, basket: newBasket };
                  })
                }
              />
              <CustomInput
                required
                name="price"
                label={index == 0 ? "Fiyatı" : ""}
                className2="mt-[0] sm:mt-[0]"
                className="mt-[0] sm:mt-[0] text-sm py-[6px]"
                value={item.unFormattedPrice}
                onChange={(e) =>
                  setPaymentData((prev) => {
                    const newBasket = [...prev.basket];
                    newBasket[index].price = validPrice(e);
                    newBasket[index].unFormattedPrice = e;
                    const tot = newBasket.reduce(
                      (acc, B) => acc + (B.price || 0),
                      0
                    );
                    const unFormattedTotalPrice = formatToPrice(
                      String(tot).replace(".", ",")
                    );
                    return {
                      ...prev,
                      totalPrice: tot.toFixed(2),
                      unFormattedTotalPrice,
                      basket: newBasket,
                    };
                  })
                }
              />
              {!(index == 0 && paymentData.basket.length == 1) && (
                <div className="flex items-center pt-3">
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <DeleteI
                      className="text-[--red-1] size-[16px]"
                      strokeWidth={2.3}
                    />
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-between pr-6 text-[--primary-1] text-sm">
            <p>Toplam</p>
            <p>{paymentData.unFormattedTotalPrice || "0,00"} ₺</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="#" className="text-xs text-[--gr-1] font-semibold">
              Taksit Sayısı
            </label>
            <div className="flex justify-start items-center">
              <CustomNumberSlider
                value={paymentData.installment}
                onChange={(e) =>
                  setPaymentData((prev) => {
                    return {
                      ...prev,
                      installment: e,
                    };
                  })
                }
                min={1}
                max={12}
              />
              <p className="text-sm text-[--gr-1] font-semibold whitespace-nowrap pl-2">
                {paymentData.installment == 1
                  ? "Taksit Yok"
                  : paymentData.installment}
              </p>
            </div>
          </div>
          <div>
            <CustomInput
              required
              name="digit"
              label="Ürün Sayısı"
              className2="mt-[0] sm:mt-[0]"
              className="mt-[0] sm:mt-[0] text-sm py-[8px]"
              value={paymentData.stockQuantity}
              onChange={(e) =>
                setPaymentData((prev) => {
                  return {
                    ...prev,
                    stockQuantity: e,
                  };
                })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <CustomDatePicker
              required
              label="Ödemenin Bitiş Tarihi"
              className2="mt-[0] sm:mt-[0]"
              style={{ padding: "0px !important" }}
              className="mt-[0] sm:mt-[0] text-sm py-[8px]"
              popperClassName="react-datepicker-popper-filter-order-1"
              value={paymentData?.unFormattedEndDate}
              onChange={(selectedDate) => {
                setPaymentData((prev) => {
                  return {
                    ...prev,
                    expiryDate: formatToIso(selectedDate),
                    unFormattedEndDate: selectedDate,
                  };
                });
              }}
            />
          </div>

          <div>
            <CustomCheckbox
              required
              label="QR oluştur"
              checked={paymentData.createQR}
              onChange={(e) =>
                setPaymentData((prev) => {
                  return {
                    ...prev,
                    createQR: !prev.createQR,
                  };
                })
              }
            />
          </div>
        </div>

        <div className="w-full flex gap-2 justify-center pt-10">
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-[--primary-1] py-2 px-12 rounded-lg hover:opacity-90"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePaymentLink;
