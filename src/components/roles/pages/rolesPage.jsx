import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { usePopup } from "../../../context/PopupContext";
import CustomInput from "../../common/customInput";
import TableSkeleton from "../../common/tableSkeleton";
import RolesTable from "../rolesTable";
import AddRolePopup from "../addRolePopup";
import {
  getRoles,
  resetGetRolesState,
} from "../../../redux/roles/getRolesSlice";
import { resetCreateRole } from "../../../redux/roles/createRoleSlice";
import { resetUpdateRole } from "../../../redux/roles/updateRoleSlice";
import { resetDeleteRole } from "../../../redux/roles/deleteRoleSlice";

const RolesPage = () => {
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const [searchVal, setSearchVal] = useState("");

  // Get roles
  const { loading, success, error, roles } = useSelector(
    (state) => state.getRoles,
  );

  // Create role
  const {
    success: createSuccess,
    loading: createLoading,
    error: createError,
  } = useSelector((state) => state.createRole);

  // Update role
  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.updateRole);

  // Delete role
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.deleteRole);

  // Fetch roles
  useEffect(() => {
    dispatch(getRoles());
  }, []);

  // Handle create success
  useEffect(() => {
    if (createSuccess) {
      setPopupContent(false);
      toast.success("Rol başarıyla oluşturuldu");
      dispatch(resetCreateRole());
      dispatch(getRoles());
    }
  }, [createSuccess]);

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      setPopupContent(false);
      toast.success("Rol başarıyla güncellendi");
      dispatch(resetUpdateRole());
      dispatch(getRoles());
    }
  }, [updateSuccess]);

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Rol başarıyla silindi");
      dispatch(resetDeleteRole());
      dispatch(getRoles());
    }
  }, [deleteSuccess]);

  // Handle errors
  useEffect(() => {
    if (createError) {
      toast.error(createError?.message_TR || "Rol oluşturulurken hata oluştu");
      dispatch(resetCreateRole());
    }
  }, [createError]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError?.message_TR || "Rol güncellenirken hata oluştu");
      dispatch(resetUpdateRole());
    }
  }, [updateError]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.message_TR || "Rol silinirken hata oluştu");
      dispatch(resetDeleteRole());
    }
  }, [deleteError]);

  const handleAddRole = () => {
    setPopupContent(<AddRolePopup isEdit={false} roleData={null} />);
  };

  const handleRefreshRoles = () => {
    dispatch(getRoles());
  };

  const filteredRoles = roles?.data?.filter((role) =>
    role.role.toLowerCase().includes(searchVal.toLowerCase()),
  );

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* Header */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h1>Roller</h1>
      </div>

      {/* Search and Actions */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <CustomInput
            type="text"
            placeholder="Rol adına göre ara..."
            value={searchVal}
            onChange={(e) => setSearchVal(e)}
            className="w-full"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleAddRole}
            className="h-11 whitespace-nowrap text-[--primary-2] px-4 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2] hover:bg-[--primary-2] hover:text-white transition-colors"
          >
            Rol Ekle
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <TableSkeleton />
      ) : roles?.data && filteredRoles?.length > 0 ? (
        <RolesTable roles={filteredRoles} onSuccess={handleRefreshRoles} />
      ) : roles?.data && filteredRoles?.length === 0 ? (
        <div className="text-center py-8 text-[--black-2]">
          Aranan role ait olan rol bulunamadı
        </div>
      ) : (
        <div className="text-center py-8 text-[--black-2]">Rol bulunamadı</div>
      )}
    </section>
  );
};

export default RolesPage;
