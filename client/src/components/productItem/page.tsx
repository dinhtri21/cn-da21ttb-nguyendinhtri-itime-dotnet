import { ProductRes } from "@/validations/product.schema";
import Link from "next/link";

interface ProductItemProps {
  product: ProductRes;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Link
      href={`/products/${product.productId}`}
      className="p-4 dark:bg-white rounded-lg hover:shadow-lg dark:hover:shadow-[#ffff]"
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

      <h2 className="text-lg font-medium text-center dark:text-black mt-2">
        {product.productName}
      </h2>
      {/* <p className="text-gray-700 mb-2">{product.productDescription}</p> */}
      <p className="text-base text-customOrange font-medium text-center mt-1">
        {product.productPrice.toFixed(2)}đ
      </p>
    </Link>
  );
}
