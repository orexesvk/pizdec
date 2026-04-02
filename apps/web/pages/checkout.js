import { useCart } from "../lib/cart";

export default function Checkout() {
  const { cart } = useCart();

  const pay = async () => {
    const total = cart.reduce((sum, i) => sum + i.price, 0);

    const res = await fetch("/.netlify/functions/create-payment", {
      method: "POST",
      body: JSON.stringify({ amount: total })
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={pay}>Pay with Crypto</button>
    </div>
  );
}
