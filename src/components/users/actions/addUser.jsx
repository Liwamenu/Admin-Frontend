//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

//COMP
import CustomInput from "../../common/customInput";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";
import CustomCheckbox from "../../common/customCheckbox";
import CustomTextarea from "../../common/customTextarea";
import CustomPhoneInput from "../../common/customPhoneInput";
import { ArrowID, ArrowIU, CancelI } from "../../../assets/icon";
import { formatEmail, formatSelectorData } from "../../../utils/utils";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getDealers } from "../../../redux/users/getUsersSlice";
import { addUser, resetaddUserState } from "../../../redux/users/addUserSlice";
import { getRoles } from "../../../redux/roles/getRolesSlice";

const AddUser = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const toastId = useRef();

  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.users.addUser,
  );

  const { dealers: dealersData } = useSelector((state) => state.users.getUsers);
  const { roles: rolesData } = useSelector((state) => state.getRoles);

  const [openFatura, setOpenFatura] = useState(false);

  const [dealers, setDealers] = useState([]);
  const [roles, setRoles] = useState([{ value: "User", label: "Normal User" }]);
  const [sendSMSNotify, setSendSMSNotify] = useState(false);
  const [sendEmailNotify, setSendEmailNotify] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    dealerId: null,
    role: { value: "User", label: "Normal User" },
  });

  const [userInvoice, setUserInvoice] = useState({
    taxOffice: "",
    taxNumber: "",
    title: "",
    address: "",
    tradeRegistryNumber: "",
    mersisNumber: "",
  });

  const handleAddUser = (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      toast.error("Şifreler aynı değil");
      return;
    }

    if (openFatura) {
      dispatch(
        addUser({
          ...userData,
          dealerId: userData.dealerId.value,
          roles: [userData.role?.value || "User"],
          sendSMSNotify,
          sendEmailNotify,
          userInvoiceAddressDTO: {
            ...userInvoice,
          },
        }),
      );
    } else {
      dispatch(
        addUser({
          ...userData,
          dealerId: userData.dealerId.value,
          roles: [userData.role?.value || "User"],
          sendSMSNotify,
          sendEmailNotify,
        }),
      );
    }
  };

  const clearForm = () => {
    setPopupContent(null);
  };

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      dispatch(resetaddUserState());
    } else if (success) {
      toast.dismiss(toastId.current);
      onSuccess();
      setPopupContent(null);
      toast.success("Başarılı");
      dispatch(resetaddUserState());
    }
  }, [loading, success, error]);

  // GET DEALERS
  useEffect(() => {
    if (!dealersData) {
      dispatch(getDealers({ dealer: true }));
    } else {
      const liwaSoft = dealersData.filter(
        (dealer) => dealer.email === "pentegrasyon@liwasoft.com",
      )[0];
      if (liwaSoft) {
        setUserData({
          ...userData,
          dealerId: {
            label: liwaSoft.fullName,
            id: liwaSoft.id,
            value: liwaSoft.id,
          },
        });
      }
      setDealers(formatSelectorData(dealersData));
    }

    // return () => {
    //   if (dealersData) {
    //     dispatch(resetDealers());
    //   }
    // };
  }, [dealersData, dispatch]);

  // GET ROLES
  useEffect(() => {
    if (!rolesData) {
      dispatch(getRoles());
      return;
    }

    const apiRoles = (rolesData?.data || []).map((role) => ({
      value: role.role,
      label: role.role,
      id: role.id,
    }));

    const hasNormalUser = apiRoles.some((role) => role.value === "User");
    const formattedRoles = hasNormalUser
      ? apiRoles
      : [{ value: "User", label: "Normal User" }, ...apiRoles];

    setRoles(formattedRoles);
  }, [rolesData, dispatch]);

  return (
    <div className="w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[95dvh] overflow-y-auto">
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={clearForm}
          >
            <CancelI />
          </div>
        </div>
        <h1 className="self-center text-2xl font-bold">Kullanıcı Ekle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-4s w-full text-left">
          <form onSubmit={handleAddUser} ref={formRef}>
            <>
              <div className="flex gap-4">
                <CustomInput
                  required={true}
                  label="Ad"
                  placeholder="Ad"
                  className="py-[.45rem]"
                  value={userData.firstName}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        firstName: e,
                      };
                    });
                  }}
                />
                <CustomInput
                  required={true}
                  label="Soyad"
                  placeholder="Soyad"
                  className="py-[.45rem]"
                  value={userData.lastName}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        lastName: e,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex gap-4">
                <CustomPhoneInput
                  required={true}
                  label="Telefone"
                  placeholder="Telefone"
                  className="py-[.45rem]"
                  maxLength={14}
                  value={userData.phoneNumber}
                  onChange={(phone) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        phoneNumber: phone,
                      };
                    });
                  }}
                />
                <CustomInput
                  required={true}
                  label="E-Posta"
                  placeholder="E-Posta"
                  className="py-[.45rem]"
                  value={userData.email}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        email: formatEmail(e),
                      };
                    });
                  }}
                />
              </div>

              <div className="flex gap-4">
                <CustomInput
                  required={true}
                  label="Şifre"
                  placeholder="Şifre"
                  className="py-[.45rem]"
                  letIcon={true}
                  value={userData.password}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        password: e,
                      };
                    });
                  }}
                />
                <CustomInput
                  required={true}
                  label="Şifreyi onayla"
                  placeholder="Şifre"
                  className="py-[.45rem]"
                  letIcon={true}
                  value={userData.confirmPassword}
                  onChange={(e) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        confirmPassword: e,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex gap-4">
                <CustomSelect
                  required={true}
                  label="Bayi"
                  placeholder="Ad"
                  style={{ padding: "1px 0px" }}
                  className="text-sm"
                  options={[{ value: null, label: "Bayi seç" }, ...dealers]}
                  value={
                    userData.dealerId
                      ? userData.dealerId
                      : { value: null, label: "Bayi seç" }
                  }
                  onChange={(selectedOption) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        dealerId: selectedOption,
                      };
                    });
                  }}
                />

                <CustomSelect
                  required={true}
                  label="Rol"
                  placeholder="Rol seçiniz"
                  style={{ padding: "1px 0px" }}
                  className="text-sm"
                  options={roles}
                  value={
                    userData.role
                      ? userData.role
                      : { value: "User", label: "Normal User" }
                  }
                  onChange={(selectedOption) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        role: selectedOption,
                      };
                    });
                  }}
                />
              </div>

              <div className="w-full flex justify-between mt-8 text-sm">
                <CustomCheckbox
                  label="SMS Kayıt Bilgilendirmesi gönder"
                  checked={sendSMSNotify}
                  onChange={() => {
                    setSendSMSNotify(!sendSMSNotify);
                  }}
                />
                <CustomCheckbox
                  label="E-Posta Kayıt Bilgilendirmesi gönder"
                  checked={sendEmailNotify}
                  onChange={() => {
                    setSendEmailNotify(!sendEmailNotify);
                  }}
                />
              </div>
            </>

            <>
              <div
                className="w-full flex border-b border-solid border-[--border-1] cursor-pointer mt-14"
                onClick={() => setOpenFatura(!openFatura)}
              >
                <h1 className="w-full text-center text-xl font-bold ">
                  Fatura Adresi
                </h1>
                <span>{openFatura ? <ArrowIU /> : <ArrowID />}</span>
              </div>
              {openFatura && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      required={true}
                      label="İsim/Ünvan"
                      placeholder="İsim/Ünvan"
                      className="py-[.45rem] text-sm"
                      value={userInvoice.title}
                      onChange={(e) => {
                        setUserInvoice((prev) => {
                          return {
                            ...prev,
                            title: e,
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      required={true}
                      label="VKN veya TCKN"
                      placeholder="VKN veya TCKN"
                      className="py-[.45rem] text-sm"
                      value={userInvoice.tradeRegistryNumber}
                      onChange={(e) => {
                        setUserInvoice((prev) => {
                          return {
                            ...prev,
                            tradeRegistryNumber: e,
                          };
                        });
                      }}
                    />
                    <CustomInput
                      required={true}
                      label="Vergi Dairesi"
                      placeholder="Vergi Dairesi"
                      className="py-[.45rem] text-sm"
                      value={userInvoice.taxOffice}
                      onChange={(e) => {
                        setUserInvoice((prev) => {
                          return {
                            ...prev,
                            taxOffice: e,
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      required={true}
                      label="Tic.Sic.No"
                      placeholder="Tic.Sic.No"
                      className="py-[.45rem] text-sm"
                      value={userInvoice.taxNumber}
                      onChange={(e) => {
                        setUserInvoice((prev) => {
                          return {
                            ...prev,
                            taxNumber: e,
                          };
                        });
                      }}
                    />
                    <CustomInput
                      required={true}
                      label="Mersis No"
                      placeholder="Mersis No"
                      className="py-[.45rem] text-sm"
                      value={userInvoice.mersisNumber}
                      onChange={(e) => {
                        setUserInvoice((prev) => {
                          return {
                            ...prev,
                            mersisNumber: e,
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomTextarea
                      required={true}
                      label="Adres"
                      placeholder="Adres"
                      className="text-sm"
                      value={userInvoice.address}
                      onChange={(e) =>
                        setUserInvoice((prev) => {
                          return {
                            ...prev,
                            address: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                </>
              )}
            </>

            <div className="w-full flex justify-end mt-10">
              <button
                className="py-2 px-3 bg-[--primary-1] text-white rounded-lg"
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
