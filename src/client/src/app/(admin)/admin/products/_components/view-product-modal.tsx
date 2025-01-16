import { Order } from "@/types/order";
import { OrderDetail } from "@/types/orderDetail";
import React, { useEffect, useRef } from "react";
import { FaPrint, FaDownload, FaEnvelope } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import Cookies from "js-cookie";
import ProductApi from "@/apis/productApi";
import CustomToast from "@/components/react-toastify/reactToastify";
import { UpdateProductReq } from "@/types/product";
import BrandApi from "@/apis/brandApi";
import { Brand } from "@/types/brand";

interface Customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

interface InvoiceProps {
  handleClose: () => void;
  fetchProducts: () => void;
  productId: number;
}

const ViewProductModal = (props: InvoiceProps) => {
  const token = Cookies.get("accessTokenAdmin");
  const [imagesFile, setImagesFile] = React.useState<File[]>([]);
  const [selectBrand, setSelectBrand] = React.useState<number>();
  const [selectMaterial, setSelectMaterial] = React.useState<number>();
  const [nameProduct, setNameProduct] = React.useState<string>();
  const [priceProduct, setPriceProduct] = React.useState<number>();
  const [quantityProduct, setQuantityProduct] = React.useState<number>();
  const [descriptionProduct, setDescriptionProduct] = React.useState<string>();
  const [images, setImages] = React.useState<string[]>([]);
  const [brand, setBrand] = React.useState<Brand[]>([]);

  const formData = new FormData();

  const fetchProductById = async () => {
    try {
      const data = await ProductApi.getProductById(props.productId.toString());
      setNameProduct(data.productName);
      setPriceProduct(data.productPrice);
      setQuantityProduct(data.quantityInStock);
      setSelectBrand(data.brand.brandId);
      setSelectMaterial(data.material.materialId);
      setDescriptionProduct(data.productDescription);
      setImages(data.imageUrls);
      // setProduct(data);
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
      setImagesFile((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleUpdateProduct = async () => {
    if (
      !nameProduct ||
      !priceProduct ||
      !quantityProduct ||
      !selectBrand ||
      !selectMaterial ||
      !descriptionProduct
    ) {
      CustomToast.showError("Vui lòng điền đầy đủ thông tin sản phẩm");
      return;
    }
    if (!token) {
      CustomToast.showError("Vui lòng đăng nhập");
      return;
    }

    formData.append("productId", props.productId.toString());
    formData.append("productName", nameProduct);
    formData.append("productPrice", priceProduct.toString());
    formData.append("productDescription", descriptionProduct);
    formData.append("quantityInStock", quantityProduct.toString());
    formData.append("brandId", selectBrand.toString());
    formData.append("materialId", selectMaterial.toString());
    images.forEach((image) => {
      const relativePath = image.replace(`${process.env.BASE_URL}`, "");
      formData.append("ImageUrls", relativePath);
    });
    imagesFile.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await ProductApi.updateProduct(
        formData,
        props.productId,
        token
      );
      CustomToast.showSuccess("Sửa sản phẩm thành công!");
      props.fetchProducts();
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImagesFile((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemovImageUrls = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    fetchProductById();
    fetchBrands();
  }, []);

  return (
    <div className="relative px-8 py-6 bg-white shadow-lg sm:rounded-3xl sm:min-w-[600px] min-w-[600px] ">
      <div className="relative  bg-white rounded-lg ">
        <div className="flex justify-between items-center pb-2 rounded-t  dark:border-gray-600 ">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Xem chi tiết sản phẩm
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
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2 dark:bg-gray-700  dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Nhập tên sản phẩm"
                required
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Giá
              </label>
              <input
                value={priceProduct}
                onChange={(e) => setPriceProduct(parseInt(e.target.value))}
                type="number"
                name="price"
                id="price"
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="2.000.000đ"
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số lượng
              </label>
              <input
                value={quantityProduct}
                onChange={(e) => setQuantityProduct(parseInt(e.target.value))}
                type="number"
                name="quantity"
                id="quantity"
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0"
                required
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Thương hiệu
              </label>
              <select
                value={selectBrand}
                onChange={(e) => setSelectBrand(parseInt(e.target.value))}
                id="brand"
                disabled
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected={true}>Chọn thương hiệu</option>
                {brand?.length > 0 &&
                  brand.map((item) => (
                    <option key={item.brandId} value={item.brandId}>
                      {item.brandName}
                    </option>
                  ))}
              </select>
            </div>
            {/* <div>
              <label
                htmlFor="category"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Danh mục
              </label>
              <select
                id="category"
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected={true}>Chọn danh mục</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div> */}
            <div>
              <label
                htmlFor="material"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Chất liệu
              </label>
              <select
                value={selectMaterial}
                onChange={(e) => setSelectMaterial(parseInt(e.target.value))}
                id="material"
                disabled
                className="font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700
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
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả
              </label>
              <textarea
                value={descriptionProduct}
                onChange={(e) => setDescriptionProduct(e.target.value)}
                id="description"
                rows={3}
                className="font-normal block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Viết mô tả về sản phẩm"
                disabled
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="pic"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ảnh
              </label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.map((img, index) => (
                  <div key={index} className="inline-flex relative">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                      className="object-cover border"
                    />
                  </div>
                ))}
                {imagesFile.length > 0 &&
                  imagesFile.map((img, index) => (
                    <div key={index} className="inline-flex relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        style={{ width: "100px", height: "100px" }}
                        className="object-cover border"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={props.handleClose}
              className="flex w-full justify-center items-center border px-2 py-2 bg-black text-white rounded-lg hover:bg-gray-800 "
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
