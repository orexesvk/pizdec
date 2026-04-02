import { useState } from "react";

export default function AdminProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const create = async () => {
    await fetch("/.netlify/functions/create-product", {
      method: "POST",
      body: JSON.stringify({
        secret: process.env.NEXT_PUBLIC_ADMIN_SECRET,
        product: { name, price }
      })
    });
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input onChange={e => setName(e.target.value)} />
      <input onChange={e => setPrice(e.target.value)} />

      <button onClick={create}>Create</button>
    </div>
  );
}
