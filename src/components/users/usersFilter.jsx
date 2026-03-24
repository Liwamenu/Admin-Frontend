import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomSelect from "../common/customSelector";
import { getRoles } from "../../redux/roles/getRolesSlice";

const UsersFilter = ({
  openFilter,
  setOpenFilter,
  filter,
  setFilter,
  handleFilter,
}) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.getRoles);

  useEffect(() => {
    if (!roles) {
      dispatch(getRoles());
    }
  }, [roles, dispatch]);

  const roleOptions = useMemo(() => {
    const apiRoles = (roles?.data || []).map((role) => ({
      value: role.role,
      label: role.role,
    }));

    return [{ value: null, label: "Hepsi" }, ...apiRoles];
  }, [roles]);

  return (
    <div className="w-full relative">
      <button
        className="w-full h-11 flex items-center justify-center text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
        onClick={() => setOpenFilter(!openFilter)}
      >
        Filtre
      </button>

      <div
        className={`absolute right-[-100px] sm:right-0 top-12 px-4 pb-3 flex flex-col bg-[--white-1] w-[22rem] border border-solid border-[--light-3] rounded-lg drop-shadow-md -drop-shadow-md z-50 ${
          openFilter ? "visible" : "hidden"
        }`}
      >
        <div className="flex gap-6">
          <CustomSelect
            label="Rol"
            className="text-sm sm:mt-1"
            className2="sm:mt-3"
            style={{ padding: "0 !important" }}
            options={roleOptions}
            value={filter?.role ? filter.role : { value: null, label: "Hepsi" }}
            onChange={(selectedOption) => {
              setFilter((prev) => {
                return {
                  ...prev,
                  role: selectedOption,
                };
              });
            }}
          />
        </div>

        <div className="flex gap-6">
          <CustomSelect
            label="Durum"
            className2="sm:mt-[.75rem] mt-1"
            className="text-sm sm:mt-[.25rem]"
            isSearchable={false}
            style={{ padding: "0 !important" }}
            options={[
              { value: null, label: "Hepsi" },
              { value: true, label: "Aktif" },
              { value: false, label: "Pasif" },
            ]}
            value={
              filter?.active ? filter.active : { value: null, label: "Hepsi" }
            }
            onChange={(selectedOption) => {
              setFilter((prev) => {
                return {
                  ...prev,
                  active: selectedOption,
                };
              });
            }}
          />
          <CustomSelect
            label="Onay"
            className2="sm:mt-[.75rem] mt-1"
            className="text-sm sm:mt-[.25rem]"
            isSearchable={false}
            style={{ padding: "0 !important" }}
            options={[
              { value: null, label: "Hepsi" },
              { value: true, label: "Onaylı" },
              { value: false, label: "Onlaylanmadı" },
            ]}
            value={
              filter?.verify ? filter.verify : { value: null, label: "Hepsi" }
            }
            onChange={(selectedOption) => {
              setFilter((prev) => {
                return {
                  ...prev,
                  verify: selectedOption,
                };
              });
            }}
          />
        </div>

        <div className="w-full flex gap-2 justify-center pt-10">
          <button
            className="text-white bg-[--red-1] py-2 px-12 rounded-lg hover:opacity-90"
            onClick={() => handleFilter(false)}
          >
            Temizle
          </button>
          <button
            className="text-white bg-[--primary-1] py-2 px-12 rounded-lg hover:opacity-90"
            onClick={() => handleFilter(true)}
          >
            Uygula
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersFilter;
