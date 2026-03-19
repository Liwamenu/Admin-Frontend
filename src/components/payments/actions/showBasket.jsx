//MODULES

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import ActionButton from "../../common/actionButton";
import { CancelI, EyeI } from "../../../assets/icon";
import { formatToPrice } from "../../../utils/utils";
import paymentType from "../../../enums/paymentLicenseType";

//UTILS

const ShowBasket = ({ payment }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<ShowBasketPopup payment={payment} />);
  };

  return (
    <ActionButton
      element={<EyeI className="w-5" strokeWidth="1.8" />}
      element2="Basket"
      onClick={handleClick}
    />
  );
};

export default ShowBasket;

//
///
function ShowBasketPopup({ payment }) {
  const { setPopupContent } = usePopup();
  let basket;
  try {
    basket = JSON.parse(payment.basketItems)?.[0];
  } catch (err) {
    console.log(err);
  }

  return (
    <main>
      <div className="w-full pt-12 px-[4%] pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-0">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={() => setPopupContent(false)}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Basket</h1>

          {basket && (
            <div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-4">
                  <p>Restoran ID:</p>
                  <p className="text-[--link-1]">{basket.restaurantId}</p>
                </div>

                <div className="flex gap-4">
                  <p>Paket ID:</p>
                  {basket.licensePackageIds.map((id) => (
                    <p className="text-[--link-1]">{id}</p>
                  ))}
                </div>
                <div className="flex gap-4">
                  <p>Restoran Adı:</p>
                  <p className="text-[--link-1]">{payment.restaurantName}</p>
                </div>
                <div className="flex gap-4">
                  <p>Kullanıcı Adı:</p>
                  <p className="text-[--link-1]">{payment.userName}</p>
                </div>
              </div>
              {basket?.Licenses?.length > 0 ? (
                <div className="bg-[--white-1] text-[--black-2] py-4">
                  <div className="max-w-7xl mx-auto">
                    <h1 className="text-lg font-bold mb-3">Basket İçeriği</h1>
                    <div className="overflow-x-auto rounded-sm shadow">
                      <table className="min-w-full divide-y divide-[--border-1] border-2 border-[--border-1]">
                        <thead className="bg-[--light-3]">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3 text-xs font-medium text-[--gr-1] uppercase tracking-wider"
                            >
                              Lisasns Adı
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-[--gr-1] uppercase tracking-wider"
                            >
                              Lisans Türü
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-[--gr-1] uppercase tracking-wider"
                            >
                              Süre (Yıl)
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-xs font-medium text-[--gr-1] uppercase tracking-wider"
                            >
                              Fiyat (₺)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-[--whıte-1] divide-y divide-[--border-1]">
                          {basket?.Licenses.map((license) => (
                            <tr key={license.LicenseId}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[--gr-1]">
                                {license.LicensePackageName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[--gr-1]">
                                {paymentType[license.LicensePackageTypeId]?.tr}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[--gr-1]">
                                {license.LicensePackageTime}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[--gr-1]">
                                {formatToPrice(
                                  license.LicensePackagePrice.toFixed(2)
                                    .replace(".", "#")
                                    .replace(",", ".")
                                    .replace("#", ","),
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
