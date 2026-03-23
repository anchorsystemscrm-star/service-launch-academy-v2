import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getFirstAvailableAppPath } from "@/utils/access";

export default async function HomePage() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("sla-access-token")?.value;
  const onboardingComplete = cookieStore.get("sla-onboarding")?.value === "1";
  const selectedBusinessId = cookieStore.get("sla-selected-business")?.value ?? null;
  const tierCookie = cookieStore.get("sla-tier")?.value;

  if (accessToken) {
    redirect(
      getFirstAvailableAppPath({
        onboardingComplete,
        selectedBusinessId,
        tier:
          tierCookie === "core" || tierCookie === "pro" || tierCookie === "elite" || tierCookie === "preview"
            ? tierCookie
            : "preview",
      })
    );
  }

  redirect("/login");
}
