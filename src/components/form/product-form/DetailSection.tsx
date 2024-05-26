import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";

const DetailSection = () => {
  const { control } = useFormContext();
  return (
    <div className="grid sm:grid-cols-2 gap-4 py-4">
      <div className="grid sm:grid-cols-1 items-center gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  type="name"
                  placeholder="Iphone 12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid sm:grid-cols-1 items-center gap-4">
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input id="price" type="number" placeholder="1.50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid sm:grid-cols-1 items-center gap-4">
        <FormField
          control={control}
          name="archived"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Archived</FormLabel>
                <FormDescription>
                  This product will not appear in the store.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="grid sm:grid-cols-1 items-center gap-4">
        <FormField
          control={control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured</FormLabel>
                <FormDescription>
                  This product will appear on the home page
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DetailSection;
