import { supabase } from './client';

export async function uploadFile({
  file,
  workspaceId,
  docType,
}: {
  file: File;
  workspaceId: string;
  docType: 'resume' | 'job_description' | 'other';
}) {
  const filePath = `${workspaceId}/${docType}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from('uttussan-docs')
    .upload(filePath, file);

  if (error) {
    console.error('File upload failed:', error.message);
    return null;
  }

  const { data: publicUrl } = supabase.storage
    .from('uttussan-docs')
    .getPublicUrl(filePath);

  return {
    fileUrl: publicUrl.publicUrl,
    filePath,
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
  };
}
