"use client";

import { useParams } from "next/navigation";
import UploadSection from "@/components/UploadSection";

export default function WorkspacePage() {
  const params = useParams();
  const workspaceId = params?.id;

  return (
    <main className="min-h-screen px-6 py-10 bg-white space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Workspace Details
        </h1>
        <p className="text-sm text-gray-600">
          Workspace ID: {workspaceId}
        </p>
      </div>

      {/* Upload Resume & Job Post */}
      <UploadSection />

      {/* Coming soon */}
      <div className="p-4 border rounded-lg bg-gray-50 text-gray-700">
        ⚙️ AI Settings & Session Start Button (coming soon)
      </div>
    </main>
  );
}
