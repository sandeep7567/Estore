import CartItems from "./_components/CartItems";

const Cart = () => {
  return (
    <section>
      <div className="container mx-auto py-6">
        <h1 className="text-lg font-bold">Shopping Cart</h1>

        <div className="bg-white rounded-lg p-6 mt-6">
          <CartItems />
        </div>
      </div>
    </section>
  );
};

export default Cart;
