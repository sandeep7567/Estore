import { PropertyI } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "@/pages/product/components/actions";

export type ProductColumn = {
  _id: string;
  imageFile: string;
  name: string;
  price: number;
  featured: boolean;
  archived: boolean;
  createdAt: string;
  properties: PropertyI[];
};

export const ProductColumns: ColumnDef<ProductColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageFile",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-full h-full flex items-center gap-2">
        <img
          src={row.original.imageFile}
          alt="image"
          width={400}
          height={400}
          style={{
            aspectRatio: "1/1",
            objectFit: "fill",
            objectPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "4rem",
            height: "4rem",
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs font-medium">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "archived",
    header: "Archived",
    cell: ({ row }) => (
      <div className="h-fit w-1/2 aspect-square flex justify-center items-center">
        {row?.original?.archived ? (
          <Check size={16} style={{ color: "green" }} />
        ) : (
          <X size={16} style={{ color: "red" }} />
        )}
      </div>
    ),
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => (
      <div className="h-fit w-1/2 aspect-square flex justify-center items-center">
        {row?.original?.featured ? (
          <Check size={16} style={{ color: "green" }} />
        ) : (
          <X size={16} style={{ color: "red" }} />
        )}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  // {
  //   accessorKey: "color",
  //   header: "Color",
  //   cell: ({ row }) => (
  //     <div className="flex items-center gap-2">
  //       {/* {row.original.color} */}
  //       <div
  //         className="h-6 w-6 rounded-full border"
  //         style={{ backgroundColor: row.original.color }}
  //       />
  //     </div>
  //   ),
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original._id} />,
  },
];
