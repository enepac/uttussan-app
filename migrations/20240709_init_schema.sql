-- workspaces table
create table workspaces (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamp with time zone default now()
);

-- documents table
create table documents (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  title text,
  file_url text,
  original_filename text,
  uploaded_at timestamp with time zone default now()
);

-- parsed_blocks table
create table parsed_blocks (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid references documents(id) on delete cascade,
  section_type text,
  content text
);

-- sessions table
create table sessions (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid references workspaces(id) on delete cascade,
  title text,
  started_at timestamp with time zone default now()
);

-- qa_pairs table
create table qa_pairs (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  question text,
  answer text,
  created_at timestamp with time zone default now()
);
