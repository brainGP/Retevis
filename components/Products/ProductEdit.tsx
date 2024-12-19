import { updateProductById } from "@/apis/products";
import ProductModal from "@/components/Products/ProductModal";
import { Product } from "@/types/Product";
import React, { useState } from "react";
import { toast } from "sonner";

const EditProduct = ({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const updateProduct = async (product: Product) => {
    try {
      const data = await updateProductById({ product });

      setProducts((prev) =>
        prev.map((item) => (item._id === product._id ? data : item))
      );
      toast.success("Бүтээгдэхүүн амжилттай шинэчилсэн.");
      setEditProduct(null);
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    }
  };

  return (
    editProduct && (
      <ProductModal
        product={editProduct}
        onClose={() => setEditProduct(null)}
        onSave={updateProduct}
      />
    )
  );
};

export default EditProduct;
