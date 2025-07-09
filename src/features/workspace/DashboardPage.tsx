"use client";

import React, { useState } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

type Workspace = {
  id: string;
  jobTitle: string;
  company: string;
  status: "Active" | "Idle";
  lastSession: string;
};

const DashboardPage = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      jobTitle,
      company,
      status: "Active",
      lastSession: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setWorkspaces([newWorkspace, ...workspaces]);
    setIsModalOpen(false);
    setJobTitle("");
    setCompany("");
  };

  const handleDelete = (id: string) => {
    setWorkspaces(workspaces.filter((ws) => ws.id !== id));
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Uttussan</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          + New
        </button>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Your Workspaces
        </h2>

        {workspaces.length === 0 ? (
          <p className="text-sm text-gray-500">No workspaces yet.</p>
        ) : (
          workspaces.map((ws) => (
            <div
              key={ws.id}
              className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {ws.jobTitle}
                  </h3>
                  <p className="text-sm text-gray-500">@ {ws.company}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {ws.status}
                  </span>
                  <button
                    onClick={() => handleDelete(ws.id)}
                    className="block text-xs text-red-500 mt-1 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>Last session: {ws.lastSession}</span>
                <button
                  onClick={() => router.push(`/workspace/${ws.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Open
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700 text-xl"
      >
        +
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Create New Workspace
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Save Workspace
          </button>
        </form>
      </Modal>
    </main>
  );
};

export default DashboardPage;
