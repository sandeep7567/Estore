import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const imagePreview = watch("imagePreview");
  const [preview, setPreview] = useState("");

  return (
    <div className="grid sm:grid-cols-2 gap-4 py-4">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add a product image for listing on store of the product
        </FormDescription>
      </div>

      <div className="grid sm:grid-cols-1 items-center gap-4">
        {!preview && imagePreview ? (
          <Avatar className="w-24 h-24">
            <AvatarImage src={imagePreview} alt="image" />
            <AvatarFallback>
              <div className="w-full h-full animate-pulse bg-gray-300" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="w-24 h-24">
            <AvatarImage src={preview} alt="image" />
            <AvatarFallback>
              <div className="w-full h-full animate-pulse bg-gray-300" />
            </AvatarFallback>
          </Avatar>
        )}
        <FormField
          control={control}
          name="imageFile"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem className="flex flex-col gap-2">
              <FormControl>
                <Input
                  type="file"
                  {...rest}
                  accept=".jpg, .jpeg, .png"
                  multiple={true}
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    setPreview(displayUrl);
                    onChange(files ? files[0] : null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
