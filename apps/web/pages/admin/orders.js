import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../../../packages/config/firebase";

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // защита: только твой email
    auth.onAuthStateChanged(async (user) => {
      if (!user) return router.push("/");
      if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/");
      } else {
        // получаем заказы с backend
        const res = await fetch("/.netlify/functions/get-orders", {
          method: "POST",
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_ADMIN_SECRET
          })
        });
        const data = await res.json();
        setOrders(data);
      }
    });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">Orders</h1>
      {orders.length === 0 && <p>No orders yet</p>}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="border p-2">{o.id}</td>
              <td className="border p-2">{o.product}</td>
              <td className="border p-2">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
