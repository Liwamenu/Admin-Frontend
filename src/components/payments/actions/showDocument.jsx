//COMP
import { LinkI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";

//UTILS

const ShowDocument = ({ payment }) => {
  return (
    payment.docPath && (
      <a href={payment.docPath} target="_blank">
        <ActionButton
          element={<LinkI className="w-5" strokeWidth="1.8" />}
          element2="Dekont Göster"
          onClick={() => {}}
        />
      </a>
    )
  );
};

export default ShowDocument;
