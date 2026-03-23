import { EditI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";
import { usePopup } from "../../../context/PopupContext";
import EditRolePopup from "../editRolePopup";

const EditRoleAction = ({ role }) => {
  const { setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setPopupContent(<EditRolePopup roleData={role} />);
  };

  return (
    <ActionButton
      element2="Duzenle"
      onClick={handlePopup}
      className="text-[--primary-2]"
      element={<EditI className="w-[1.1rem]" />}
    />
  );
};

export default EditRoleAction;
