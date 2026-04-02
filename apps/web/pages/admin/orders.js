import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../config/firebase"; // путь к firebase.js внутри apps/web

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Защита: только твой email
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/"); // редирект, если не админ
        return;
      }

      try {
        // Получаем заказы с backend
        const res = await fetch("/.netlify/functions/get-orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_ADMIN_SECRET
          })
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // очистка подписки
  }, [router]);

  if (loading) return <p className="p-10">Loading orders...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table className="w-full border border-gray-300">
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
      )}
    </div>
  );
}
