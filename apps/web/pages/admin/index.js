import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../../../packages/config/firebase";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) return router.push("/");

      if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/");
      }
    });
  }, []);

  return <h1>Admin Dashboard</h1>;
}
