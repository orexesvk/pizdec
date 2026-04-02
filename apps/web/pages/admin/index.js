import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../config/firebase";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/admin/login");
      }
    });

    return () => unsub();
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">Admin Panel</h1>

      <div className="space-y-3">
        <a href="/admin/orders" className="block underline">
          Orders
        </a>
      </div>
    </div>
  );
}
