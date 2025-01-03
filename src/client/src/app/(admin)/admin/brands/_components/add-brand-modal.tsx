import React, { useRef } from "react";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";
import BrandApi from "@/apis/brandApi";

interface InvoiceProps {
  handleClose: () => void;
  fetchBrands: () => void;
}

export default function AddBrandModal(props: InvoiceProps) {
  const token = Cookies.get("accessTokenAdmin");
  const [images, setImages] = React.useState<File[]>([]);
  const [nameBrand, setNameBrand] = React.useState<string>();
  const [descriptionBrand, setDescriptionBrand] = React.useState<string>();

  const formData = new FormData();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length == 1) {
      CustomToast.showError("Chỉ được chọn 1 ảnh");
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleAddBrand = async () => {
    if (!nameBrand || !descriptionBrand || images.length === 0) {
      CustomToast.showError("Vui lòng điền đầy đủ thông tin thương hiệu");
      return;
    }
    if (!token) {
      CustomToast.showError("Vui lòng đăng nhập");
      return;
    }
    formData.append("brandName", nameBrand);
    formData.append("brandDescription", descriptionBrand);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await BrandApi.createBrand(formData, token);
      CustomToast.showSuccess("Thêm thương hiệu thành công!");
      props.fetchBrands();
      props.handleClose();
    } catch (error: any) {
      if (error?.status === 401) {
        CustomToast.showError(
          "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại"
        );
        return;
      }
      CustomToast.showError("Thêm thương hiệu thất bại");
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="relative px-8 py-6 bg-white shadow-lg sm:rounded-3xl sm:min-w-[600px] min-w-[500px] ">
      <div className="relative  bg-white rounded-lg ">
        <div className="flex justify-between items-center pb-2 rounded-t  dark:border-gray-600 ">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Thêm thương hiệu
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
                className="block mb-1 text-sm font-medium text-gray-800 dark:text-white"
              >
                Tên
              </label>
              <input
                onChange={(e) => setNameBrand(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2 dark:bg-gray-700  dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-800 dark:text-white"
              >
                Mô tả
              </label>
              <textarea
                onChange={(e) => setDescriptionBrand(e.target.value)}
                id="description"
                rows={3}
                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Viết mô tả về sản phẩm"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="pic"
                className="block mb-1 text-sm font-medium text-gray-800 dark:text-white"
              >
                Ảnh
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer
                     bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.length > 0 &&
                  images.map((img, index) => (
                    <div key={index} className="inline-flex relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        style={{ width: "100px", height: "100px" }}
                        className="object-cover border"
                      />
                      <button
                        className="absolute left-0 top-0 w-5 h-5 bg-red-500 text-white rounded-full text-center leading-5"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddBrand}
              className="flex w-full justify-center items-center border px-2 py-2 bg-black text-white rounded-lg hover:bg-gray-800 "
            >
              Thêm thương hiệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
