import { Button } from "@/components/ui/button";
import { Roles } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type CustomerColumn = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  role: Roles;
  isPublish: boolean;
  createdAt: string;
};

export const CustomerColumns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "firstName",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs font-medium">
        {row.original.firstName + " " + row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isEmailVerified",
    header: "Verified",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs font-medium">
        {row.original.isEmailVerified ? (
          <div className="h-6 w-6 rounded-full border bg-green-400" />
        ) : (
          <div className="h-6 w-6 rounded-full border bg-destructive/75" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
