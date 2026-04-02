import { products } from "../../../packages/data/products";
import { useCart } from "../lib/cart";

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="container">
      <h1>AERIX</h1>

      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.image} />
            <h2>{p.name}</h2>
            <p>${p.price}</p>

            <button onClick={() => addToCart(p)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
