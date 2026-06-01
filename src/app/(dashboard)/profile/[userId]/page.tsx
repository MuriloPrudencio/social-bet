"use client";

import { useParams } from "next/navigation";
import { PublicProfileView } from "@/modules/profile/public-profile-view";

export default function PublicProfilePage() {
  const params = useParams<{ userId: string }>();
  return <PublicProfileView userId={params.userId} />;
}
