import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import PropertyInput from "./PropertyInput";

const PropertySection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });
  return (
    <div className="grid sm:grid-cols-2 gap-4 py-4">
      <div>
        <h2 className="text-2xl font-bold">Add Properties</h2>
        <FormDescription>
          Create a customize property for a product
        </FormDescription>
      </div>

      <div className="grid sm:grid-cols-1 items-center gap-4">
        <FormField
          control={control}
          name="properties"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <PropertyInput
                  key={field.id}
                  index={index}
                  removeProperty={() => remove(index)}
                />
              ))}
            </FormItem>
          )}
        />
        <Button type="button" onClick={() => append({ name: "", value: "" })}>
          Add Property
        </Button>
      </div>
    </div>
  );
};

export default PropertySection;
