import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../common/customInput";
import CustomToggle from "../common/customToggle";

import {
  getSMSParameters,
  resetUpdateSMSParametersState,
  updateSMSParameters,
} from "../../redux/parameters/getSMSParametersSlice";
import {
  getEmailParameters,
  resetUpdateEmailParametersState,
  updateEmailParameters,
} from "../../redux/parameters/getEmailParametersSlice";
import {
  getPayTRParameters,
  resetUpdatePayTRParametersState,
  updatePayTRParameters,
} from "../../redux/parameters/getPayTRParametersSlice";

const ParametersPage = () => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const smsState = useSelector((state) => state.parameters.sms);
  const emailState = useSelector((state) => state.parameters.email);
  const paytrState = useSelector((state) => state.parameters.paytr);

  const [smsForm, setSmsForm] = useState(null);
  const [emailForm, setEmailForm] = useState(null);
  const [paytrForm, setPaytrForm] = useState(null);

  useEffect(() => {
    dispatch(getSMSParameters());
    dispatch(getEmailParameters());
    dispatch(getPayTRParameters());
  }, [dispatch]);

  useEffect(() => {
    if (smsState.data?.data) {
      setSmsForm(smsState.data.data);
    }
  }, [smsState.data]);

  useEffect(() => {
    if (emailState.data?.data) {
      setEmailForm(emailState.data.data);
    }
  }, [emailState.data]);

  useEffect(() => {
    if (paytrState.data?.data) {
      setPaytrForm(paytrState.data.data);
    }
  }, [paytrState.data]);

  useEffect(() => {
    if (smsState.updateLoading) {
      toastId.current = toast.loading("SMS parametreleri güncelleniyor...");
      return;
    }

    if (smsState.updateError) {
      toast.dismiss(toastId.current);
      toast.error(smsState.updateError?.message_TR || "SMS güncelleme hatası");
      dispatch(resetUpdateSMSParametersState());
      return;
    }

    if (smsState.updateSuccess) {
      toast.dismiss(toastId.current);
      toast.success("SMS parametreleri güncellendi");
      dispatch(resetUpdateSMSParametersState());
      dispatch(getSMSParameters());
    }
  }, [
    smsState.updateLoading,
    smsState.updateError,
    smsState.updateSuccess,
    dispatch,
  ]);

  useEffect(() => {
    if (emailState.updateLoading) {
      toastId.current = toast.loading("E-Posta parametreleri güncelleniyor...");
      return;
    }

    if (emailState.updateError) {
      toast.dismiss(toastId.current);
      toast.error(
        emailState.updateError?.message_TR || "E-Posta güncelleme hatası",
      );
      dispatch(resetUpdateEmailParametersState());
      return;
    }

    if (emailState.updateSuccess) {
      toast.dismiss(toastId.current);
      toast.success("E-Posta parametreleri güncellendi");
      dispatch(resetUpdateEmailParametersState());
      dispatch(getEmailParameters());
    }
  }, [
    emailState.updateLoading,
    emailState.updateError,
    emailState.updateSuccess,
    dispatch,
  ]);

  useEffect(() => {
    if (paytrState.updateLoading) {
      toastId.current = toast.loading("PayTR parametreleri güncelleniyor...");
      return;
    }

    if (paytrState.updateError) {
      toast.dismiss(toastId.current);
      toast.error(
        paytrState.updateError?.message_TR || "PayTR güncelleme hatası",
      );
      dispatch(resetUpdatePayTRParametersState());
      return;
    }

    if (paytrState.updateSuccess) {
      toast.dismiss(toastId.current);
      toast.success("PayTR parametreleri güncellendi");
      dispatch(resetUpdatePayTRParametersState());
      dispatch(getPayTRParameters());
    }
  }, [
    paytrState.updateLoading,
    paytrState.updateError,
    paytrState.updateSuccess,
    dispatch,
  ]);

  const isSmsChanged = useMemo(() => {
    return (
      JSON.stringify(smsForm || {}) !==
      JSON.stringify(smsState.data?.data || {})
    );
  }, [smsForm, smsState.data]);

  const isEmailChanged = useMemo(() => {
    return (
      JSON.stringify(emailForm || {}) !==
      JSON.stringify(emailState.data?.data || {})
    );
  }, [emailForm, emailState.data]);

  const isPaytrChanged = useMemo(() => {
    return (
      JSON.stringify(paytrForm || {}) !==
      JSON.stringify(paytrState.data?.data || {})
    );
  }, [paytrForm, paytrState.data]);

  const handleUpdateSMS = (e) => {
    e.preventDefault();
    if (!isSmsChanged) {
      toast("SMS alanlarında değişiklik yok");
      return;
    }

    dispatch(
      updateSMSParameters({
        smsUsername: smsForm.smsUsername,
        smsPassword: smsForm.smsPassword,
        smsTitle: smsForm.smsTitle,
        smsnlss: !!smsForm.smsnlss,
      }),
    );
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    if (!isEmailChanged) {
      toast("E-Posta alanlarında değişiklik yok");
      return;
    }

    dispatch(
      updateEmailParameters({
        smtpServer: emailForm.smtpServer,
        smtpPort: Number(emailForm.smtpPort || 0),
        smtpUsername: emailForm.smtpUsername,
        smtpPassword: emailForm.smtpPassword,
        fromEmail: emailForm.fromEmail,
      }),
    );
  };

  const handleUpdatePayTR = (e) => {
    e.preventDefault();
    if (!isPaytrChanged) {
      toast("PayTR alanlarında değişiklik yok");
      return;
    }

    dispatch(
      updatePayTRParameters({
        merchantId: Number(paytrForm.merchantId || 0),
        merchantKey: paytrForm.merchantKey,
        merchantSalt: paytrForm.merchantSalt,
      }),
    );
  };

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      <div className="w-full text-[--black-2] py-4 text-2xl font-bold">
        <h2>Parametreler</h2>
      </div>

      <div className="w-full max-w-[1050px] flex flex-col gap-4 mt-5">
        <form
          className="w-full bg-[--white-1] border border-solid border-[--border-1] rounded-xl p-5"
          onSubmit={handleUpdateSMS}
        >
          <h3 className="text-lg font-semibold text-[--black-2] mb-3">
            SMS Parametreleri
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomInput
              label="smsUsername"
              value={smsForm?.smsUsername || ""}
              onChange={(value) =>
                setSmsForm((prev) => ({ ...prev, smsUsername: value }))
              }
            />
            <CustomInput
              label="smsPassword"
              value={smsForm?.smsPassword || ""}
              onChange={(value) =>
                setSmsForm((prev) => ({ ...prev, smsPassword: value }))
              }
            />
            <CustomInput
              label="smsTitle"
              value={smsForm?.smsTitle || ""}
              onChange={(value) =>
                setSmsForm((prev) => ({ ...prev, smsTitle: value }))
              }
            />
            <div className="flex items-end pb-2">
              <CustomToggle
                label="smsnlss"
                checked={!!smsForm?.smsnlss}
                onChange={() =>
                  setSmsForm((prev) => ({ ...prev, smsnlss: !prev?.smsnlss }))
                }
              />
            </div>
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="submit"
              disabled={smsState.loading || smsState.updateLoading}
              className="text-white bg-[--primary-1] py-2 px-5 rounded-lg hover:opacity-90 disabled:opacity-60"
            >
              Kaydet
            </button>
          </div>
        </form>

        <form
          className="w-full bg-[--white-1] border border-solid border-[--border-1] rounded-xl p-5"
          onSubmit={handleUpdateEmail}
        >
          <h3 className="text-lg font-semibold text-[--black-2] mb-3">
            E-Posta Parametreleri
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomInput
              label="smtpServer"
              value={emailForm?.smtpServer || ""}
              onChange={(value) =>
                setEmailForm((prev) => ({ ...prev, smtpServer: value }))
              }
            />
            <CustomInput
              label="smtpPort"
              value={emailForm?.smtpPort?.toString() || ""}
              onChange={(value) =>
                setEmailForm((prev) => ({ ...prev, smtpPort: value }))
              }
            />
            <CustomInput
              label="smtpUsername"
              value={emailForm?.smtpUsername || ""}
              onChange={(value) =>
                setEmailForm((prev) => ({ ...prev, smtpUsername: value }))
              }
            />
            <CustomInput
              label="smtpPassword"
              value={emailForm?.smtpPassword || ""}
              onChange={(value) =>
                setEmailForm((prev) => ({ ...prev, smtpPassword: value }))
              }
            />
            <CustomInput
              label="fromEmail"
              value={emailForm?.fromEmail || ""}
              onChange={(value) =>
                setEmailForm((prev) => ({ ...prev, fromEmail: value }))
              }
            />
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="submit"
              disabled={emailState.loading || emailState.updateLoading}
              className="text-white bg-[--primary-1] py-2 px-5 rounded-lg hover:opacity-90 disabled:opacity-60"
            >
              Kaydet
            </button>
          </div>
        </form>

        <form
          className="w-full bg-[--white-1] border border-solid border-[--border-1] rounded-xl p-5"
          onSubmit={handleUpdatePayTR}
        >
          <h3 className="text-lg font-semibold text-[--black-2] mb-3">
            PayTR Parametreleri
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomInput
              label="merchantId"
              value={paytrForm?.merchantId?.toString() || ""}
              onChange={(value) =>
                setPaytrForm((prev) => ({ ...prev, merchantId: value }))
              }
            />
            <CustomInput
              label="merchantKey"
              value={paytrForm?.merchantKey || ""}
              onChange={(value) =>
                setPaytrForm((prev) => ({ ...prev, merchantKey: value }))
              }
            />
            <CustomInput
              label="merchantSalt"
              value={paytrForm?.merchantSalt || ""}
              onChange={(value) =>
                setPaytrForm((prev) => ({ ...prev, merchantSalt: value }))
              }
            />
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="submit"
              disabled={paytrState.loading || paytrState.updateLoading}
              className="text-white bg-[--primary-1] py-2 px-5 rounded-lg hover:opacity-90 disabled:opacity-60"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ParametersPage;
