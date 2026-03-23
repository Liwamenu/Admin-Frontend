import { useEffect, useRef, useState } from "react";
import { MenuI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";
import EditRoleAction from "./editRole";
import DeleteRoleAction from "./deleteRole";

const Actions = ({ index, role, itemsPerPage, onSuccess }) => {
  const rolesMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (rolesMenuRef) {
      const refs = contentRef.filter((ref) => ref.id !== "rolesActions");
      setContentRef([
        ...refs,
        {
          id: "rolesActions",
          outRef: null,
          ref: rolesMenuRef,
          callback: () => setOpenMenu(null),
        },
      ]);
    }
  }, [rolesMenuRef, openMenu]);

  return (
    <>
      <div className="cursor-pointer" onClick={handleClick} ref={rolesMenuRef}>
        <MenuI
          className={`w-full ${openMenu === index && "text-[--primary-2]"}`}
        />
      </div>

      <div
        className={`absolute right-9 border-2 border-solid border-[--light-3] rounded-sm z-10 shadow-lg overflow-hidden ${
          index < itemsPerPage / 2 ? "top-5" : "bottom-5"
        } ${openMenu !== index && "invisible"}`}
      >
        <ul className="bg-[--white-1] text-[--gr-1] w-52">
          <EditRoleAction role={role} />
          <DeleteRoleAction role={role} onSuccess={onSuccess} />
        </ul>
      </div>
    </>
  );
};

export default Actions;
