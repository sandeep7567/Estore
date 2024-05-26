import { useBulkDeleteProductsMutation } from "@/redux/api/productApiSlice";
import { toast } from "sonner";

export const useBulkDeleteProducts = () => {
  const [deleteBulkProducts, { isError, isLoading, isSuccess, error }] =
    useBulkDeleteProductsMutation();

  if (isSuccess) {
    toast.success(`Products deleted`);
  }

  if (isError && error) {
    if ("status" in error) {
      // Assuming it's a FetchBaseQueryError
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      toast.error(errMsg || "Failed to delete products");
    } else {
      toast.error("Failed to delete products");
    }
  }

  return { deleteBulkProducts, isLoading };
};
