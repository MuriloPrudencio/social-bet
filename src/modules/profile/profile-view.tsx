"use client";

import { ProfilePanel } from "@/components/organisms/profile-panel";
import { PrivacySettingsPanel } from "@/components/organisms/privacy-settings-panel";
import { FollowSuggestions } from "@/components/organisms/follow-suggestions";
import { useProfile } from "@/hooks/use-profile";

export function ProfileView() {
  const profile = useProfile(true);

  return (
    <div className="space-y-4">
      <ProfilePanel profile={profile.data} full />
      <PrivacySettingsPanel />
      <FollowSuggestions />
    </div>
  );
}
