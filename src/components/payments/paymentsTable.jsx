import Actions from "./actions/actions";
import paymentType from "../../enums/paymentLicenseType";
import { copyToClipboard, formatDateString } from "../../utils/utils";
import ChangePaymentStatus from "./actions/changePaymentStatus";
import { CopyI } from "../../assets/icon";

const PaymentsTable = ({ payments, itemsPerPage, onSuccess }) => {
  //filter the file path
  function formatFilePath(filePath) {
    if (!filePath) return null;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    let formattedPath = filePath.replace(
      /^C:\\inetpub\\wwwroot\\PentegrasyonAPI/,
      "",
    );
    formattedPath = formattedPath.replace(
      "C:\\inetpub\\wwwroot\\DEVELOPMENT",
      "",
    );
    formattedPath = formattedPath.replace(
      "C:\\inetpub\\wwwroot\\PRODUCTION",
      "",
    );

    const urlPath = formattedPath.replace(/\\/g, "/");
    return baseUrl.replace("/api/v1/", "") + urlPath;
  }

  // get payment link
  const paymentLink = (data) => {
    return data?.description?.split("-")[1];
  };

  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[70rem] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left text-[--black-1] whitespace-nowrap">
              <th className="pl-4 font-normal">Kullanıcı Adı</th>
              <th className="font-normal">Ödeme Tipi</th>
              <th className="font-normal">Sağlayıcı</th>
              <th className="font-normal">Tutar</th>
              <th className="font-normal">Tarih</th>
              <th className="font-normal">Sip.No</th>
              <th className="font-normal">Açıklama</th>
              <th className="font-normal">Durum</th>
              <th className="font-normal text-center">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((data, index) => (
              <tr
                key={data.id}
                className={`font-light odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors ${
                  payments.length < 8 ? "" : "last:border-b-0"
                } `}
              >
                <td className="whitespace-nowrap text-[--black-2] pl-4">
                  {data.userName}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {paymentType[data.type]?.tr}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  <a
                    href={formatFilePath(data.receiptFilePath)}
                    target="_blank"
                    className={`px-1 py-1.5 ${
                      formatFilePath(data.receiptFilePath)
                        ? "border border-[--primary-1] rounded-md hover:cursor-pointer"
                        : "pointer-events-none"
                    }`}
                  >
                    {data.provider}
                  </a>
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.amount}
                </td>
                <td className="whitespace-nowrap text-[--black-2]">
                  <span>
                    {formatDateString({ dateString: data.createdDateTime })}
                  </span>
                  <span>
                    {formatDateString({
                      dateString: data.createdDateTime,
                      letDay: false,
                      letMonth: false,
                      letYear: false,
                      hour: true,
                      minute: true,
                    })}
                  </span>
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.orderNumber}
                </td>
                <td
                  className={`whitespace-nowrap font-light ${
                    data.type == 3
                      ? "text-[--link-1] cursor-pointer"
                      : "text-[--black-2]"
                  }`}
                >
                  <div
                    className="flex items-center"
                    disabled={data.type != 3}
                    onClick={() => copyToClipboard({ text: paymentLink(data) })}
                  >
                    {data?.description?.slice(0, 20)}
                    {data?.description?.length > 20 && "..."}
                    {data.type == 3 && <CopyI className="size-[16px] mx-1" />}
                  </div>
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light relative">
                  <ChangePaymentStatus
                    payment={{
                      ...data,
                      url: formatFilePath(data.receiptFilePath),
                    }}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className="w-14 text-[--black-2] font-light relative">
                  <Actions
                    index={index}
                    payment={{
                      ...data,
                      URL: paymentLink(data),
                      copy: () => copyToClipboard({ text: paymentLink(data) }),
                      docPath: formatFilePath(data.receiptFilePath),
                    }}
                    itemsPerPage={itemsPerPage}
                    onSuccess={onSuccess}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PaymentsTable;
