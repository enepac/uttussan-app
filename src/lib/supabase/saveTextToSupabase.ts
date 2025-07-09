import { supabase } from './client';

type SavedDocument = {
  id: string;
  workspace_id: string;
  type: 'resume' | 'job_description' | 'other';
  source: 'manual';
  text_content: string;
  uploaded_at: string;
  // Include other fields in your 'documents' table if needed
};

export async function saveTextToSupabase({
  workspaceId,
  docType,
  text,
}: {
  workspaceId: string;
  docType: 'resume' | 'job_description' | 'other';
  text: string;
}): Promise<SavedDocument | null> {
  const { data, error } = await supabase
    .from('documents')
    .insert({
      workspace_id: workspaceId,
      type: docType,
      source: 'manual',
      text_content: text,
      uploaded_at: new Date().toISOString(),
    })
    .select()
    .single(); // Ensures 'data' is a single object instead of array

  if (error) {
    console.error('❌ Failed to save text to Supabase:', error.message);
    return null;
  }

  return data;
}
