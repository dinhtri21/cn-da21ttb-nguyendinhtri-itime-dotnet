import { Order } from "@/types/order";
import { OrderDetail } from "@/types/orderDetail";
import React, { useRef } from "react";
import { FaPrint, FaDownload, FaEnvelope } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import Cookies from "js-cookie";
import ProductApi from "@/apis/productApi";
import CustomToast from "@/components/react-toastify/reactToastify";

interface Customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

interface InvoiceProps {
  handleClose: () => void;
  fetchProducts: () => void;
}

const AddProductModal = (props: InvoiceProps) => {
  const token = Cookies.get("accessTokenAdmin");
  const [images, setImages] = React.useState<File[]>([]);
  const [selectBrand, setSelectBrand] = React.useState<number>();
  const [selectMaterial, setSelectMaterial] = React.useState<number>();
  const [nameProduct, setNameProduct] = React.useState<string>();
  const [priceProduct, setPriceProduct] = React.useState<number>();
  const [quantityProduct, setQuantityProduct] = React.useState<number>();
  const [descriptionProduct, setDescriptionProduct] = React.useState<string>();

  const formData = new FormData();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleAddProduct = async () => {
    if (
      !nameProduct ||
      !priceProduct ||
      !quantityProduct ||
      !selectBrand ||
      !selectMaterial ||
      !descriptionProduct ||
      images.length === 0
    ) {
      console.log(
        nameProduct,
        priceProduct,
        quantityProduct,
        selectBrand,
        selectMaterial,
        images
      );
      CustomToast.showError("Vui lòng điền đầy đủ thông tin sản phẩm");
      return;
    }
    if (!token) {
      CustomToast.showError("Vui lòng đăng nhập");
      return;
    }

    formData.append("productName", nameProduct);
    formData.append("productPrice", priceProduct.toString());
    formData.append("productDescription", descriptionProduct);
    formData.append("quantityInStock", quantityProduct.toString());
    formData.append("brandId", selectBrand.toString());
    formData.append("materialId", selectMaterial.toString());
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await ProductApi.createProduct(formData, token);
      CustomToast.showSuccess("Thêm sản phẩm thành công!");
      props.fetchProducts();
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative px-8 py-6 bg-white shadow-lg sm:rounded-3xl sm:min-w-[600px] min-w-[500px] ">
      <div className="relative  bg-white rounded-lg ">
        <div className="flex justify-between items-center pb-2 rounded-t  dark:border-gray-600 ">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Thêm sản phẩm
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
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                Tên
              </label>
              <input
                onChange={(e) => setNameProduct(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700  dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                Giá
              </label>
              <input
                onChange={(e) => setPriceProduct(parseInt(e.target.value))}
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2.000.000đ"
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                Số lượng
              </label>
              <input
                onChange={(e) => setQuantityProduct(parseInt(e.target.value))}
                type="number"
                name="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                Thương hiệu
              </label>
              <select
                onChange={(e) => setSelectBrand(parseInt(e.target.value))}
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected={true}>Chọn thương hiệu</option>
                <option value="1">Casio</option>
                <option value="2">Omega</option>
                <option value="3">Citizen</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                Danh mục
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected={true}>Chọn danh mục</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="material"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                Chất liệu
              </label>
              <select
                onChange={(e) => setSelectMaterial(parseInt(e.target.value))}
                id="material"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                  dark:focus:border-primary-500"
              >
                <option selected={true}>Chọn chất liệu</option>
                <option value="1">Thép</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
              >
                Mô tả
              </label>
              <textarea
                onChange={(e) => setDescriptionProduct(e.target.value)}
                id="description"
                rows={3}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Viết mô tả về sản phẩm"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="pic"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
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
              {images.length > 0 && (
                <div>
                  {/* <h3>Preview:</h3> */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {images.map((img, index) => (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Preview ${index + 1}`}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                

                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input onChange={(e) => handleFileChange(e)} id="dropzone-file" type="file" className="hidden" />
                </label>
              </div> */}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddProduct}
              className="flex w-full justify-center items-center border px-2 py-2 bg-black text-white rounded-lg hover:bg-gray-800 "
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
