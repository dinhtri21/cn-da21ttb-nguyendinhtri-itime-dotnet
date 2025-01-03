import { Order } from "@/types/order";
import { OrderDetail } from "@/types/orderDetail";
import React, { useEffect, useRef } from "react";
import { FaPrint, FaDownload, FaEnvelope } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import Cookies from "js-cookie";
import ProductApi from "@/apis/productApi";
import CustomToast from "@/components/react-toastify/reactToastify";
import { UpdateBrandRequest } from "@/types/brand";
import BrandApi from "@/apis/brandApi";
import { Brand } from "@/types/brand";

interface InvoiceProps {
  handleClose: () => void;
  fetchBrands: () => void;
  brandId: number;
}

const EditBrandModal = (props: InvoiceProps) => {
  const token = Cookies.get("accessTokenAdmin");
  const [imagesFile, setImagesFile] = React.useState<File | null>(null);
  const [nameBrand, setNameBrand] = React.useState<string>();
  const [descriptionBrand, setDescriptionBrand] = React.useState<string>();
  const [images, setImages] = React.useState<string>("");
  const [brand, setBrand] = React.useState<Brand[]>([]);

  const formData = new FormData();

  const fetchBrandById = async () => {
    try {
      const data = await BrandApi.getBrandById(props.brandId.toString());
      setNameBrand(data.brandName);
      setDescriptionBrand(data.brandDescription);
      setImages(data.brandImageUrl);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await BrandApi.getBrands();
      setBrand(res.brands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImagesFile(selectedFiles[0]);
    }
  };

  const handleUpdateProduct = async () => {
    if (!nameBrand || !descriptionBrand ) {
      CustomToast.showError("Vui lòng điền đầy đủ thông tin thương hiệu");
      return;
    }
    if(imagesFile === null && images === ""){
      CustomToast.showError("Vui lòng chọn ảnh thương hiệu");
      return;
    }

    if (!token) {
      CustomToast.showError("Vui lòng đăng nhập");
      return;
    }

    formData.append("BrandId", props.brandId.toString());
    formData.append("BrandName", nameBrand);
    formData.append("BrandDescription", descriptionBrand);
    if (imagesFile !== null) {
      formData.append("BrandImage", imagesFile);
    }

    try {
      const response = await BrandApi.updateBrand(
        props.brandId,
        formData,
        token
      );
      CustomToast.showSuccess("Sửa thương hiệu thành công!");
      props.fetchBrands();
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = () => {
    setImagesFile(null);
  };

  const handleRemovImageUrls = () => {
    setImages("");
  };

  useEffect(() => {
    fetchBrandById();
    fetchBrands();
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
                value={nameBrand}
                onChange={(e) => setNameBrand(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2 dark:bg-gray-700  dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả
              </label>
              <textarea
                value={descriptionBrand}
                onChange={(e) => setDescriptionBrand(e.target.value)}
                id="description"
                rows={3}
                className="font-normal block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Viết mô tả về sản phẩm"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="pic"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ảnh
              </label>
              <input
                // value={images}
                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer
                     bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images && (
                  <div className="inline-flex relative">
                    <img
                      src={`${process.env.BASE_URL}${images}`}
                      alt={`Preview`}
                      style={{ width: "100px", height: "100px" }}
                      className="object-cover border"
                    />
                    <button
                      className="absolute left-0 top-0 w-5 h-5 bg-red-500 text-white rounded-full"
                      onClick={() => handleRemovImageUrls()}
                    >
                      ✕
                    </button>
                  </div>
                )}
                {imagesFile && (
                  <div className="inline-flex relative">
                    <img
                      src={URL.createObjectURL(imagesFile)}
                      alt={`Preview`}
                      style={{ width: "100px", height: "100px" }}
                      className="object-cover border"
                    />
                    <button
                      className="absolute left-0 top-0 w-5 h-5 bg-red-500 text-white rounded-full"
                      onClick={() => handleRemoveImage()}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdateProduct}
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

export default EditBrandModal;
