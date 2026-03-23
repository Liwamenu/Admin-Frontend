import { useEffect, useRef, useState } from "react";
import { CancelI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addPayment,
  resetAddPayment,
} from "../../../redux/payments/addPaymentSlice";
import CustomInput from "../../common/customInput";
import { formatSelectorData, validPrice } from "../../../utils/utils";
import CustomSelect from "../../common/customSelector";
import paymentLicenseType from "../../../enums/paymentLicenseType";
import statuses from "../../../enums/statuses";
import { getUsers } from "../../../redux/users/getUsersSlice";
import PaymentMethod from "../../../enums/paymentMethods";
import CustomFileInput from "../../common/customFileInput";

const AddPayment = ({ onSuccess }) => {
  const { setPopupContent } = usePopup();
  return (
    <button
      className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
      onClick={() => {
        setPopupContent(<AddPaymentPopup data={null} onSuccess={onSuccess} />);
      }}
    >
      Ödeme Ekle
    </button>
  );
};
export default AddPayment;

//
////
function AddPaymentPopup({ onSuccess }) {
  const { setPopupContent } = usePopup();

  const toastId = useRef();
  const dispatch = useDispatch();
  const { data, success, loading } = useSelector((state) => state.payments.add);
  const { users } = useSelector((state) => state.users.getUsers);

  const [usersData, setUsersData] = useState(null);
  const [paymentData, setPaymentData] = useState({
    userId: "",
    user: { label: "Kullanıcı Seç" },
    amount: "",
    basket: "",
    paymentType: "",
    licenseType: "",
    unFormattedPaymentType: { label: "Ödeme tipi seç" },
    unFormattedLicenseType: { label: "Lisans tipi seç" },
    status: "",
    unFormattedStatus: { label: "Durum Seç" },
    document: null,
    unFormattedTotalPrice: "",
  });
  const isBankTransfer = paymentData.paymentType === "BankTransfer";

  function handleSubmit(e) {
    e.preventDefault();
    const { userId, amount, paymentType, licenseType, status, document } =
      paymentData;
    dispatch(
      addPayment({
        userId,
        amount,
        paymentType,
        licenseType,
        status,
        document,
      }),
    );
  }

  //LINK TOAST
  useEffect(() => {
    if (success) {
      onSuccess();
      setPopupContent(false);
      toast.dismiss(toastId.current);
      toast.success("Ödemenız başarıyla eklenmiştir.");
      dispatch(resetAddPayment());
    }
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
  }, [loading, success, data]);

  //GET USERS
  useEffect(() => {
    if (!usersData) {
      dispatch(getUsers({}));
    }
  }, [usersData]);

  //SET USERS
  useEffect(() => {
    if (users) {
      const formattedUsers = formatSelectorData(users.data);
      setUsersData([{ label: "Hiç", value: null }, ...formattedUsers]);
    }
  }, [users]);

  return (
    <main>
      <div className="w-full flex justify-center">
        <div className="w-full pt-8 pb-4 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl overflow-y-auto max-h-[98dvh]">
          <div className="flex flex-col bg-[--white-1] relative">
            <div className="absolute -top-4 right-3">
              <div
                className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
                onClick={() => setPopupContent(false)}
              >
                <CancelI />
              </div>
            </div>
            <h1 className="self-center text-2xl font-bold">Ödeme Ekle</h1>

            <main className="flex flex-col px-4 sm:px-14 w-full text-left gap-2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div>
                    <CustomSelect
                      label="Kullanıcı (Opsiyonel)"
                      style={{ padding: "0px" }}
                      className="mt-[0] sm:mt-[0] text-sm"
                      value={paymentData.user}
                      options={usersData}
                      onChange={(e) =>
                        setPaymentData((prev) => {
                          return {
                            ...prev,
                            user: e,
                            userId: e.id,
                          };
                        })
                      }
                    />
                  </div>

                  <div>
                    <CustomSelect
                      required
                      label="Lisans Tipi"
                      style={{ padding: "0px" }}
                      className2="mt-[0] sm:mt-[0]"
                      className="mt-[0] sm:mt-[0] text-sm"
                      value={paymentData.unFormattedLicenseType}
                      options={paymentLicenseType}
                      onChange={(e) =>
                        setPaymentData((prev) => {
                          return {
                            ...prev,
                            unFormattedLicenseType: e,
                            licenseType: e.value,
                          };
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <CustomSelect
                      required
                      label="Ödeme Tipi"
                      style={{ padding: "0px" }}
                      className2="mt-[0] sm:mt-[0]"
                      className="mt-[0] sm:mt-[0] text-sm"
                      value={paymentData.unFormattedPaymentType}
                      options={PaymentMethod}
                      onChange={(e) =>
                        setPaymentData((prev) => {
                          return {
                            ...prev,
                            unFormattedPaymentType: e,
                            paymentType: e.value,
                            document: null,
                          };
                        })
                      }
                    />
                  </div>
                  <div>
                    <CustomSelect
                      required
                      label="Durum"
                      style={{ padding: "0px" }}
                      className2="mt-[0] sm:mt-[0]"
                      className="mt-[0] sm:mt-[0] text-sm"
                      value={paymentData.unFormattedStatus}
                      options={statuses}
                      onChange={(e) =>
                        setPaymentData((prev) => {
                          return {
                            ...prev,
                            unFormattedStatus: e,
                            status: e.value,
                          };
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <CustomInput
                      required
                      name="price"
                      label="Toplam Fiyat"
                      className="mt-[0] sm:mt-[0] text-sm py-[8px]"
                      className2="mt-[0] sm:mt-[0]"
                      value={paymentData.unFormattedTotalPrice}
                      onChange={(e) =>
                        setPaymentData((prev) => {
                          return {
                            ...prev,
                            amount: validPrice(e),
                            unFormattedTotalPrice: e,
                          };
                        })
                      }
                    />
                  </div>
                </div>

                {isBankTransfer && (
                  <div className="flex flex-col gap-3">
                    <CustomFileInput
                      className="h-[8rem] p-4"
                      value={paymentData.document}
                      onChange={(file) =>
                        setPaymentData((prev) => {
                          return {
                            ...prev,
                            document: file,
                          };
                        })
                      }
                      accept={"image/png, image/jpeg, application/pdf"}
                      required={false}
                    />
                  </div>
                )}

                <div className="w-full flex gap-2 justify-end pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-[--primary-1] py-2 px-12 rounded-lg hover:opacity-90"
                  >
                    Ekle
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
