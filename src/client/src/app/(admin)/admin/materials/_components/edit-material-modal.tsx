import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";

import { Material, UpdateMaterialRequest } from "@/types/material";
import MaterialApi from "@/apis/materialApi";

interface InvoiceProps {
  handleClose: () => void;
  fetchMaterial: () => void;
  materialId: number;
}

const EditMaterialModal = (props: InvoiceProps) => {
  const token = Cookies.get("accessTokenAdmin");
  const [nameMaterial, setNameMaterial] = React.useState<string>();

  const formData = new FormData();

  const fetchMaterialById = async () => {
    try {
      const data = await MaterialApi.getMaterialById(props.materialId);
      setNameMaterial(data.materialName);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const handleUpdateMaterial = async () => {
    if (!nameMaterial ) {
      CustomToast.showError("Vui lòng điền đầy đủ thông tin chất liệu");
      return;
    }

    if (!token) {
      CustomToast.showError("Vui lòng đăng nhập");
      return;
    }

    const data : UpdateMaterialRequest = {
      materialId: props.materialId,
      materialName: nameMaterial,
    };

    try {
      const response = await MaterialApi.updateMaterial(
        props.materialId,
        data,
        token
      );
      CustomToast.showSuccess("Sửa thương hiệu thành công!");
      props.fetchMaterial();
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchMaterialById();
  }, []);

  return (
    <div className="relative px-8 py-6 bg-white shadow-lg sm:rounded-3xl sm:min-w-[600px] min-w-[600px] ">
      <div className="relative  bg-white rounded-lg ">
        <div className="flex justify-between items-center pb-2 rounded-t  dark:border-gray-600 ">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sửa thương hiệu
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            onClick={props.handleClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div>
          <div className="grid gap-2 mb-4 sm:grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên
              </label>
              <input
                value={nameMaterial}
                onChange={(e) => setNameMaterial(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2 dark:bg-gray-700  dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
           
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdateMaterial}
              className="flex w-full justify-center items-center border px-2 py-2 bg-black text-white rounded-lg hover:bg-gray-800 "
            >
              Sửa thương hiệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMaterialModal;
