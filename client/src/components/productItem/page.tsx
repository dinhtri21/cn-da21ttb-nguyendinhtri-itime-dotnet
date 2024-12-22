import { ProductRes } from "@/validations/product.schema";
import Link from "next/link";

interface ProductItemProps {
  product: ProductRes;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Link
      href={`/products/${product.productId}`}
      className="px-2 py-2 md:px-4 md:py-5 dark:bg-white bg-white rounded-lg hover:shadow-md dark:hover:shadow-[#ffff]"
    >
      <div className="aspect-square">
        {product.imageUrls.length > 0 ? (
          <img
            src={product.imageUrls[0]}
            alt={product.productName}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <p className="text-sm text-center mt-2 text-gray-500  dark:text-black">
        {product.brand?.brandName}
      </p>
      <h2 className="text-base  text-center text-primaryBlackColor mt-1 dark:text-black">
        {product.productName}
      </h2>
      {/* <p className="text-gray-700 mb-2">{product.productDescription}</p> */}
      <p className="text-base text-customOrange text-center mt-1">
        {product.productPrice.toLocaleString()} ₫
      </p>
    </Link>
  );
}
