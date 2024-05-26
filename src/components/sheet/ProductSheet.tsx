import ProductForm from "@/components/form/product-form/ProductForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ProductFormType } from "@/lib/schema/product-schema";
import { onEditToggle, onToggle } from "@/redux/reducer/productSlice";
import { useParams } from "react-router-dom";
import { SheetForm } from "../ui/sheetForm";
import { useFetchProduct } from "@/hooks/product/useFetchProduct";
import NoDataPage from "../layout/NoDataPage";
import { Loader } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productApiSlice";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/ui/useConfirm";

const ProductSheet = () => {
  const { storeId } = useParams();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to perform a delete."
  );

  const { isOpen, id } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const {
    isProductError,
    isProductFetching,
    isProductLoading,
    isProductSuccess,
    product,
  } = useFetchProduct(id);
  const [createProduct, { isLoading, isSuccess: isCreateSuccess }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useUpdateProductMutation();

  const [deleteProduct, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] =
    useDeleteProductMutation();

  const isDisabled = isLoading || isUpdating || isDeleting;
  const isSuccess = isCreateSuccess || isUpdateSuccess || isDeleteSuccess;

  const onSubmit = async (formDataJson: ProductFormType) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("price", (formDataJson.price * 100).toString());
    formData.append("archived", formDataJson.archived.toString());
    formData.append("featured", formDataJson.featured.toString());
    formDataJson.properties.forEach((property, index) => {
      formData.append(`properties[${index}][name]`, property.name);
      formData.append(`properties[${index}][value]`, property.value);
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    if (!id) {
      const { data, error } = await createProduct({
        storeId: String(storeId),
        formData,
      });

      if (data) {
        toast.success(`Product created`);
      }

      if (error) {
        toast.error(`Product created failed`);
      }

      dispatch(onToggle());
    } else {
      const { data, error } = await updateProduct({
        storeId: String(storeId),
        productId: id,
        formData,
      });

      if (data) {
        toast.success(`Product updated`);
      }

      if (error) {
        toast.error(`Product updated failed`);
      }

      dispatch(onEditToggle({ id: undefined }));
    }
  };

  const isVerfiyId = typeof id !== "undefined" && id !== product?._id;

  if (isProductFetching || isProductLoading || isVerfiyId) {
    return (
      <div className="relative h-screen w-full flex bg-gray-200/50">
        <NoDataPage description="" info="" title="">
          <Loader
            size={80}
            className="animate-spin flex size-6 items-center text-primary/40 justify-center"
          />
          <h3 className="text-base font-medium text-muted-foreground tracking-tight">
            {isProductError && "Refresh the page"}
          </h3>
          <Skeleton className="h-8 w-48" />
        </NoDataPage>
      </div>
    );
  }

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      if (typeof id !== "undefined" && id === product?._id && storeId) {
        const { data, error } = await deleteProduct({ productId: id, storeId });

        if (data) {
          toast.success(`Product deleted`);
        }

        if (error) {
          toast.error(`Product deletion failed`);
        }

        dispatch(onEditToggle({ id: undefined }));
      }
    }
  };

  const defaultValues =
    isProductSuccess && product && id === product?._id
      ? {
          name: product?.name,
          price: product?.price / 100,
          archived: product?.archived,
          featured: product?.featured,
          properties: product?.properties?.map((prop) => ({
            name: prop?.name,
            value: Array.isArray(prop.value)
              ? prop.value.join(",")
              : prop.value,
          })),
          imagePreview: product?.imageFile,
        }
      : {
          name: "",
          price: 0,
          archived: false,
          featured: false,
          properties: [{ name: "", value: "" }],
          imagePreview: "",
        };

  return (
    <>
      <ConfirmDialog />
      <SheetForm
        title={id ? "Edit Product" : "Create Product"}
        description={
          id
            ? "Edit a existing Product"
            : "Create a new Product to sell on the store"
        }
        side="product"
        openBtnText="Open"
        open={isOpen}
        onOpen={() =>
          dispatch(id ? onEditToggle({ id: undefined }) : onToggle())
        }
      >
        {isProductLoading && id !== product?._id ? (
          <div className="relative h-screen w-full flex bg-gray-200/50">
            <NoDataPage>
              <Loader
                size={80}
                className="animate-spin flex size-6 items-center text-primary/40 justify-center"
              />
              <h3 className="text-base font-medium text-muted-foreground tracking-tight">
                {isProductError && "Refresh the page"}
              </h3>
              <Skeleton className="h-8 w-48" />
            </NoDataPage>
          </div>
        ) : (
          <ProductForm
            id={id}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            disabled={isDisabled}
            onDelete={onDelete}
            isSuccess={isSuccess}
          />
        )}
      </SheetForm>
    </>
  );
};

export default ProductSheet;
