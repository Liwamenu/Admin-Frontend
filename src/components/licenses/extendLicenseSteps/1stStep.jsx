//MOD
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomSelect from "../../common/customSelector";
import ForwardButton from "../stepsAssets/forwardButton";

//FUNC
import {
  formatSelectorData,
  formatLicensePackagesToSelector,
} from "../../../utils/utils";

// REDUX
import { addItemToCart, clearCart } from "../../../redux/cart/cartSlice";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../../redux/licensePackages/getLicensePackagesSlice";
import { getRestaurants } from "../../../redux/restaurants/getRestaurantsSlice";

const FirstStep = ({
  step,
  setStep,
  paymentMethod,
  restaurantData,
  setPaymentMethod,
  setRestaurantData,
  licensePackageData,
  setLicensePackageData,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentLicense, restaurant } = location?.state || {};
  const { restaurantName, restaurantId, userId } = currentLicense || {};

  const { success, error, licensePackages } = useSelector(
    (state) => state.licensePackages.getLicensePackages,
  );
  const { restaurants } = useSelector(
    (state) => state.restaurants.getRestaurants,
  );

  const [restaurantsData, setRestaurantsData] = useState(null);
  const [licensePackagesData, setLicensePackagesData] = useState(null);

  // GET LICENSE PACKAGES
  useEffect(() => {
    if (!licensePackagesData) {
      dispatch(getLicensePackages());
    }
  }, [licensePackagesData]);

  // TOAST AND SET PACKAGES
  useEffect(() => {
    if (error) {
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensePackages());
    }

    if (success) {
      const updatedData = licensePackages.data.map((pkg) => {
        const price = currentLicense?.isDealer
          ? pkg.dealerPrice
          : pkg.userPrice;

        return {
          ...pkg,
          price,
        };
      });

      const sameMarketplacePKGS = updatedData.filter(
        (pack) =>
          pack?.licensePackageType === currentLicense?.licensePackageType,
      );

      const formattedPackages =
        formatLicensePackagesToSelector(sameMarketplacePKGS);
      setLicensePackagesData(formattedPackages);

      dispatch(resetGetLicensePackages());
    }
  }, [success, error]);

  // GET RESTAURANTS
  useEffect(() => {
    if (!currentLicense && !restaurantsData) {
      dispatch(getRestaurants({}));
    }
  }, [currentLicense, restaurantsData]);

  //SET RESTAURANTS
  useEffect(() => {
    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, false));
    }
  }, [restaurants]);

  //SET RESTAURANT DATA
  useEffect(() => {
    if ((restaurantId || restaurant) && !restaurantData?.value) {
      if (restaurant) {
        setRestaurantData({
          label: restaurant.name,
          value: restaurant.id,
          userId: restaurant.userId,
        });
      } else {
        setRestaurantData({
          label: restaurantName,
          value: restaurantId,
          userId,
        });
      }
    }
  }, [restaurantId, restaurant, restaurantData]);

  function handleSubmit(e) {
    e.preventDefault();
    const paymentId = paymentMethod.selectedOption.id;
    if (paymentId == 2) {
      setStep(step + 2);
    } else setStep(step + 1);
  }

  const handleAddToCart = (pkg) => {
    if (!pkg.restaurantId) {
      toast.error("Lütfen restoran seçın 😊", { id: "choose_restaurant" });
      return;
    }
    dispatch(clearCart());
    dispatch(addItemToCart(pkg));
  };

  return (
    <form className="size-full flex flex-col" onSubmit={handleSubmit}>
      <div className="px-4 flex justify-end items-center p-2 w-full text-sm bg-[--light-1] border-b border-solid border-[--border-1]">
        <div className="text-center">
          <p className="pb-2">Toplam</p>
          <p className="font-semibold">{licensePackageData.price} ₺</p>
        </div>
      </div>

      <div className="flex flex-col pt-2 gap-4 md:px-4">
        <CustomSelect
          required={true}
          label="Restoran"
          className="text-sm max-w-[28rem]"
          className2="mt-[0] sm:mt-[0]"
          value={restaurantData}
          disabled={restaurantId}
          options={restaurantsData}
          onChange={(selectedOption) => {
            setRestaurantData(selectedOption);
          }}
        />
        <CustomSelect
          required={true}
          label="Paket"
          className="text-sm max-w-[28rem]"
          className2="mt-[0] sm:mt-[0]"
          value={licensePackageData}
          options={licensePackagesData}
          onChange={(selectedOption) => {
            setLicensePackageData(selectedOption);
            if (
              selectedOption?.licensePackageId !==
              licensePackageData?.licensePackageId
            ) {
              handleAddToCart({
                ...selectedOption,
                licenseTypeId: selectedOption.id,
                restaurantId: restaurantData.value,
                restaurantName: restaurantData.label,
              });
            }
          }}
        />
        <CustomSelect
          required={true}
          label="Ödeme Yöntemi"
          className="text-sm max-w-[28rem]"
          className2="mt-[0] sm:mt-[0]"
          value={paymentMethod.selectedOption}
          options={paymentMethod.options}
          onChange={(selectedOption) => {
            setPaymentMethod((prev) => {
              return {
                ...prev,
                selectedOption,
              };
            });
          }}
        />
      </div>

      <div className="h-full flex justify-end items-end relative">
        <ForwardButton
          text="Devam"
          letIcon={true}
          type="submit"
          className="absolute -bottom-16 -right-1"
        />
      </div>
    </form>
  );
};

export default FirstStep;
