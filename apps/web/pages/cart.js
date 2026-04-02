import { useCart } from "../lib/cart";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div>
      <h1>Cart</h1>

      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - ${item.price}
        </div>
      ))}
    </div>
  );
}
