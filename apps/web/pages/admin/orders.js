import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../config/firebase";

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch("/.netlify/functions/get-orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_ADMIN_SECRET
          })
        });

        const data = await res.json();
        setOrders(data);
      } catch (e) {
        console.error("Orders error:", e);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">Orders</h1>

      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
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
      )}
    </div>
  );
}
