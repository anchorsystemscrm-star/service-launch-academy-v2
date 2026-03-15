import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getFirstAvailableAppPath } from "@/utils/access";

export default function HomePage() {
  const accessToken = cookies().get("sla-access-token")?.value;
  const onboardingComplete = cookies().get("sla-onboarding")?.value === "1";
  const selectedBusinessId = cookies().get("sla-selected-business")?.value ?? null;
  const tierCookie = cookies().get("sla-tier")?.value;

  if (accessToken) {
    redirect(
      getFirstAvailableAppPath({
        onboardingComplete,
        selectedBusinessId,
        tier:
          tierCookie === "core" || tierCookie === "pro" || tierCookie === "elite" || tierCookie === "preview"
            ? tierCookie
            : "preview"
      })
    );
  }

  redirect("/login");
}
