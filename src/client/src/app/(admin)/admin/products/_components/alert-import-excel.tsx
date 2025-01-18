import { useState } from "react";
import ImportExcelModal from "./import-excel-modal";

interface AlertMaterialDetailProps {
  fetchProducts: (filters?: Record<string, any>) => void;
  children: React.ReactNode;
}

export default function AlertImportExcel(props: AlertMaterialDetailProps) {
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
            <ImportExcelModal
              fetchProducts={props.fetchProducts}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
}
