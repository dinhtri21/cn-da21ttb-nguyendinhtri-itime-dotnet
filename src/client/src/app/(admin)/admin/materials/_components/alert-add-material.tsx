import { useState } from "react";
import AddMaterialModal from "./add-material-modal";

interface AlertMaterialDetailProps {
  fetchMaterials: (filters?: Record<string, any>) => void;
  children: React.ReactNode;
}

export default function AlertAddMaterial(props: AlertMaterialDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => setIsOpen(true);
  return (
    <>
      {/* Trigger button to open the dialog */}
      <div onClick={handleOpen}>{props.children}</div>

      {/* Dialog (Alert) */}
      {isOpen  && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50 overflow-y-scroll"
        >
          <div
            className="mt-[10px] mb-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            <AddMaterialModal
              fetchMaterials={props.fetchMaterials}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
}
