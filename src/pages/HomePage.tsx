import NoDataPage from "@/components/layout/NoDataPage";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <NoDataPage
      description="You have no products"
      info="You can start selling as soon as you add a product."
      title="Dashboard"
    >
      <Button>Create Dashboard</Button>
    </NoDataPage>
  );
}

export default HomePage;
