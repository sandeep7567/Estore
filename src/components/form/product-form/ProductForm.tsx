import { Form } from "@/components/ui/form";
import { SheetFooter } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import DetailSection from "./DetailSection";
import ImageSection from "./ImageSection";
import PropertySection from "./PropertySection";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash } from "lucide-react";
import { useEffect } from "react";
import {
  productFormSchema,
  ProductFormType,
} from "@/lib/schema/product-schema";

interface ProductFormProps {
  id?: string;
  onSubmit: (values: ProductFormType) => void;
  defaultValues: Pick<
    ProductFormType,
    | "name"
    | "archived"
    | "featured"
    | "price"
    | "properties"
    | "imagePreview"
    | "imageFile"
  >;
  onDelete?: () => void;
  disabled?: boolean;
  isSuccess?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  defaultValues,
  disabled,
  id,
  onDelete,
  isSuccess,
}) => {
  const form = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: ProductFormType) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset(defaultValues);
    }
  }, [isSuccess, defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <PropertySection />
        <Separator />
        <ImageSection />

        <SheetFooter>
          <Button disabled={disabled} type="submit">
            {disabled && <Loader2 size={18} className="animate-spin mr-2" />}
            {id ? "Save changes" : "Create product"}
          </Button>
          {!!id && (
            <Button disabled={disabled} onClick={handleDelete} type="button">
              {disabled && <Loader2 size={18} className="animate-spin mr-2" />}
              <Trash className="size-4 mr-2" />
              Delete
            </Button>
          )}
        </SheetFooter>
      </form>
    </Form>
  );
};

export default ProductForm;
