import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteRole, resetDeleteRole } from "../../redux/roles/deleteRoleSlice";
import { useEffect, useState } from "react";

const DeleteRoleButton = ({ roleId, roleName }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.deleteRole);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deleteRole(roleId));
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="px-2 py-1 text-xs bg-[--status-red] text-[--red-1] rounded hover:bg-red-200 transition-colors disabled:opacity-60"
      >
        Sil
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[--white-1] rounded-lg p-6 max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4">Rolü Sil</h2>
            <p className="text-[--black-2] mb-6">
              "{roleName}" rolünü silmeyi onaylıyor musunuz?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="px-4 py-2 border border-[--primary-2] text-[--primary-2] rounded-lg hover:bg-[--light-3]"
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-60"
              >
                {loading ? "Siliniyor..." : "Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteRoleButton;
