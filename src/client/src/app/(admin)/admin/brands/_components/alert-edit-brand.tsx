import { useEffect, useState } from "react";
import EditBrandModal from "./edit-brand-modal";

interface AlertBrandProps {
  fetchBrands: (filters?: Record<string, any>) => void;
  children: React.ReactNode;
  brandId: number;
}

export default function AlertEditBrand(props: AlertBrandProps) {
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
            <EditBrandModal
              fetchBrands={props.fetchBrands}
              handleClose={handleClose}
              brandId={props.brandId}
            />
          </div>
        </div>
      )}
    </>
  );
}
