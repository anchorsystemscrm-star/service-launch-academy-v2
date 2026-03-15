import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function HomePage() {
  const accessToken = cookies().get("sla-access-token")?.value;

  if (accessToken) {
    redirect("/dashboard");
  }

  redirect("/login");
}
