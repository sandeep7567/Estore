import {
  CustomerColumn,
  CustomerColumns,
} from "@/components/columns/customerColumns";
import NoDataPage from "@/components/layout/NoDataPage";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchUsers } from "@/hooks/user/useFetchUsers";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const CustomerPage = () => {
  const { storeId } = useParams();

  const id = storeId ? storeId : "";

  const {
    users,
    isUsersSuccess,
    isUsersError,
    isUsersFetching,
    isUsersLoading,
  } = useFetchUsers({ storeId: id });

  if (isUsersLoading || isUsersFetching || isUsersError) {
    return (
      <div className="relative h-screen w-full flex bg-gray-200/50">
        <NoDataPage description="" info="" title="">
          <Loader
            size={80}
            className="animate-spin flex size-6 items-center text-primary/40 justify-center"
          />
          <h3 className="text-base font-medium text-muted-foreground tracking-tight">
            {isUsersError && "Refresh the page"}
          </h3>
          <Skeleton className="h-8 w-48" />
        </NoDataPage>
      </div>
    );
  }

  const formattedUsers: CustomerColumn[] = users.length
    ? users?.map((item) => ({
        ...item,
        createdAt: format(item?.createdAt, "dd MMM yyyy"),
      }))
    : [];

  return (
    <>
      {isUsersSuccess && !!formattedUsers.length && (
        <>
          <div className="flex items-center mx-auto container">
            <h1 className="text-lg flex-1 font-semibold md:text-2xl">
              Customer
            </h1>
          </div>

          <div className="container mx-auto">
            <DataTable
              searchKey={"firstName"}
              columns={CustomerColumns}
              data={formattedUsers}
              onDelete={() => {}}
              disabled={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CustomerPage;
