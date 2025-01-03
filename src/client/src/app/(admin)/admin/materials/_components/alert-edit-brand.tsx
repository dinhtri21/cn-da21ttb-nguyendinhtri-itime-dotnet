import { useEffect, useState } from "react";
import EditMaterialModal from "./edit-material-modal";

interface AlertMaterialProps {
  fetchMaterial: (filters?: Record<string, any>) => void;
  children: React.ReactNode;
  materialId: number;
}

export default function AlertEditMaterial(props: AlertMaterialProps) {
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
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50 overflow-y-scroll"
          // onClick={handleClickOutside} // Detect click outside
        >
          <div
            className="mt-[10px] mb-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            <EditMaterialModal
              fetchMaterial={props.fetchMaterial}
              handleClose={handleClose}
              materialId={props.materialId}
            />
          </div>
        </div>
      )}
    </>
  );
}
