"use client";

import React, { useState } from "react";
import SectionBlock from "./SectionBlock";
import { uploadFile } from "@/lib/supabase/uploadFile";
import { saveTextToSupabase } from "@/lib/supabase/saveTextToSupabase";
import { supabase } from "@/lib/supabase/client";

type SectionKey = "resume" | "job_description" | "other";

type UploadedFile = {
  file: File;
  content?: string;
};

type TextEntry = {
  id: string | null;
  content: string;
};

type UploadState = {
  files: UploadedFile[];
  texts: TextEntry[];
};

type SectionsState = {
  resume: UploadState;
  job_description: UploadState;
  other: UploadState;
};

const workspaceId = "demo-workspace-id";

const UploadSection = () => {
  const [sections, setSections] = useState<SectionsState>({
    resume: { files: [], texts: [] },
    job_description: { files: [], texts: [] },
    other: { files: [], texts: [] },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    section: SectionKey
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const updatedFiles = [...sections[section].files];
    const updatedTexts = [...sections[section].texts];

    for (const file of files) {
      let content: string | undefined;

      if (file.type === "text/plain") {
        content = await file.text();
        updatedTexts.push({ id: null, content });
      }

      const uploaded = await uploadFile({
        file,
        workspaceId,
        docType: section,
      });

      if (uploaded) {
        const { error } = await supabase.from("documents").insert({
          workspace_id: workspaceId,
          type: section,
          source: "upload",
          file_url: uploaded.fileUrl,
          filename: uploaded.fileName,
          uploaded_at: uploaded.uploadedAt,
        });

        if (error) {
          console.error("❌ Failed to save metadata:", error.message);
        }

        updatedFiles.push({ file, content });
      }
    }

    setSections((prev) => ({
      ...prev,
      [section]: { files: updatedFiles, texts: updatedTexts },
    }));

    e.target.value = "";
  };

  const handleAddText = async (section: SectionKey) => {
    const saved = await saveTextToSupabase({
      workspaceId,
      docType: section,
      text: "",
    });

    const newEntry: TextEntry = {
      id: saved?.id ?? null,
      content: "",
    };

    setSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        texts: [...prev[section].texts, newEntry],
      },
    }));
  };

  const handleTextChange = async (
    section: SectionKey,
    index: number,
    value: string
  ) => {
    setSections((prev) => {
      const updated = [...prev[section].texts];
      updated[index].content = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          texts: updated,
        },
      };
    });

    const textEntry = sections[section].texts[index] as TextEntry;
    const docId = textEntry?.id;

    if (docId) {
      const { error } = await supabase
        .from("documents")
        .update({ text_content: value })
        .eq("id", docId);

      if (error) {
        console.error(`❌ Failed to update text #${docId}:`, error.message);
      }
    }
  };

  const handleRemoveFile = (section: SectionKey, index: number) => {
    const updatedFiles = [...sections[section].files];
    updatedFiles.splice(index, 1);

    setSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        files: updatedFiles,
      },
    }));
  };

  const handleRemoveText = async (section: SectionKey, index: number) => {
    const entry = sections[section].texts[index];

    if (entry.id) {
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", entry.id);
      if (error) {
        console.error(`❌ Failed to delete text #${entry.id}:`, error.message);
      }
    }

    const updatedTexts = [...sections[section].texts];
    updatedTexts.splice(index, 1);

    setSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        texts: updatedTexts,
      },
    }));
  };

  const handlePreviewContext = () => {
    const context = {
      resume: {
        files: sections.resume.files.map((f) => ({
          name: f.file.name,
          content: f.content || "[Non-text file]",
        })),
        texts: sections.resume.texts.map((t) => t.content),
      },
      jobDescription: {
        files: sections.job_description.files.map((f) => ({
          name: f.file.name,
          content: f.content || "[Non-text file]",
        })),
        texts: sections.job_description.texts.map((t) => t.content),
      },
      other: {
        files: sections.other.files.map((f) => ({
          name: f.file.name,
          content: f.content || "[Non-text file]",
        })),
        texts: sections.other.texts.map((t) => t.content),
      },
    };

    console.log("🔍 GPT Context with file content:", context);
    alert("Context with extracted text logged to console.");
  };

  return (
    <section className="space-y-6">
      <SectionBlock
        label="Resume"
        color="blue"
        files={sections.resume.files}
        texts={sections.resume.texts.map((t) => t.content)}
        onFileChange={(e) => handleFileChange(e, "resume")}
        onTextChange={(i, val) => handleTextChange("resume", i, val)}
        onAddText={() => handleAddText("resume")}
        onRemoveFile={(i) => handleRemoveFile("resume", i)}
        onRemoveText={(i) => handleRemoveText("resume", i)}
      />
      <SectionBlock
        label="Job Description"
        color="green"
        files={sections.job_description.files}
        texts={sections.job_description.texts.map((t) => t.content)}
        onFileChange={(e) => handleFileChange(e, "job_description")}
        onTextChange={(i, val) => handleTextChange("job_description", i, val)}
        onAddText={() => handleAddText("job_description")}
        onRemoveFile={(i) => handleRemoveFile("job_description", i)}
        onRemoveText={(i) => handleRemoveText("job_description", i)}
      />
      <SectionBlock
        label="Other Supporting Documents"
        color="purple"
        files={sections.other.files}
        texts={sections.other.texts.map((t) => t.content)}
        onFileChange={(e) => handleFileChange(e, "other")}
        onTextChange={(i, val) => handleTextChange("other", i, val)}
        onAddText={() => handleAddText("other")}
        onRemoveFile={(i) => handleRemoveFile("other", i)}
        onRemoveText={(i) => handleRemoveText("other", i)}
      />

      <div className="text-right">
        <button
          onClick={handlePreviewContext}
          className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          Preview Context for GPT
        </button>
      </div>
    </section>
  );
};

export default UploadSection;
