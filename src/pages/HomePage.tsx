import { ProductsList } from "@/components/product/product-list";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";

function HomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const storeId = urlParams.get("storeId");

  const { products } = useFetchProducts({
    storeId: storeId!,
  });

  const formmatedProducts = products.map((product) => ({
    ...product,
    price: product.price / 100,
  }));
  return (
    <div className="mx-auto max-w-7x">
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductsList title="Products" items={formmatedProducts} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
