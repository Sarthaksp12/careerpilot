"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ProfileSettings } from "@/components/profile/profile-settings";

export default function ProfilePage() {
  return (
    <div>
      <PageHeader
        title="Profile"
        description="Manage your account information and application settings."
      />
      <ProfileSettings />
    </div>
  );
}
