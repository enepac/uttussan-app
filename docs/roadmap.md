# Uttussan Development Roadmap

This is the master engineering checklist for the Uttussan AI Interview Assistant. Every task, sub-task, and feature is tracked here with status.

| # | Task | Sub-Task | Status |
|---|------|----------|--------|
| 1 | Initialize Next.js Project | `create-next-app` with `--app`, TypeScript, Tailwind, ESLint | ✅ Completed |
|   |                              | Confirm folder structure: `/src/app`, `/components`, etc. | ✅ Completed |
| 2 | Folder Setup | Create `/components`, `/features`, `/lib`, `/types` directories | ✅ Completed |
| 3 | Home / Dashboard | Mobile-first branding UI with “Create Workspace” CTA | ✅ Completed |
| 4 | Create Workspace Flow | Modal form to create workspace | ✅ Completed |
|   |                        | Dynamic routing to `/workspace/[id]` | ✅ Completed |
| 5 | Upload Section | Create `UploadSection.tsx` | ✅ Completed |
|   |                  | Add Resume, Job Description, and Other sections | ✅ Completed |
| 6 | File Upload Support | Upload multiple files per section | ✅ Completed |
|   |                     | Accept `.pdf`, `.doc`, `.docx`, `.txt` | ✅ Completed |
| 7 | Text Input Support | Add multi-text input fields for each section | ✅ Completed |
| 8 | Removal Features | Remove uploaded files | ✅ Completed |
|   |                  | Remove text blocks | ✅ Completed |
| 9 | `.txt` File Extraction | Extract text from `.txt` files using FileReader API | ✅ Completed |
| 10 | GPT Context Preview | Structure all content into preview object | ✅ Completed |
|    |                      | Add preview button to log data | ✅ Completed |
| 11 | Architecture Decision | Evaluate frontend-only vs backend strategy | ✅ Completed |
|    |                        | Decide on Supabase or API + DB approach | ✅ Completed |
| 12 | Data Model Design | Define entities: User, Workspace, Document, Transcript, Session | ⏳ Not Started |
|    |                    | Plan extensible structure for AI, archive, scoring | ⏳ Not Started |
| 13 | Authentication | Email + password login (Supabase Auth) | 🔄 In Progress |
|    |                 | Google OAuth (optional) | ⏳ Not Started |
| 14 | Backend Integration | Set up Supabase or Next.js API routes | ⏳ Not Started |
|    |                     | Store: workspaces, documents, sessions | ⏳ Not Started |
|    |                     | Support login/logout, sync across devices | ⏳ Not Started |
| 15 | GPT-4o API Proxy | Create `/api/ask` route | ⏳ Not Started |
|    |                  | Secure OpenAI API key with `.env.local` | ⏳ Not Started |
|    |                  | Send context + question → get GPT response | ⏳ Not Started |
| 16 | AI Answer Display | Stream or show GPT answer on Interview screen | ⏳ Not Started |
| 17 | `.docx` File Support | Install `mammoth` | ⏳ In Progress |
|    |                      | Extract raw text from uploaded `.docx` files | ⏳ Not Started |
|    |                      | Store extracted content into workspace context | ⏳ Not Started |
| 18 | `.pdf` File Support | Install `pdfjs-dist` | ⏳ Not Started |
|    |                    | Extract text from `.pdf` files | ⏳ Not Started |
|    |                    | Store parsed output into GPT context | ⏳ Not Started |
| 19 | Interview Mode Design | Full-screen layout, mobile-first | ⏳ Not Started |
|    |                        | Show transcribed question and AI answer | ⏳ Not Started |
| 20 | Prompt Execution Design | Design GPT-4o prompt with context injection | ⏳ Not Started |
| 21 | Session History | Persist Q&A pairs | ⏳ Not Started |
|    |                  | View past sessions per workspace | ⏳ Not Started |
| 22 | Live Voice Mode (Whisper) | Integrate Whisper.js or browser Speech API | ⏳ Not Started |
|    |                            | Transcribe mic input → inject to GPT prompt | ⏳ Not Started |
|    |                            | Auto-generate answer on voice detection | ⏳ Not Started |
| 23 | Settings & Account Preferences | Add dark mode toggle | ⏳ Not Started |
|    |                                | Add notification setting placeholders | ⏳ Not Started |
|    |                                | Password change UI (frontend only for now) | ⏳ Not Started |
|    |                                | Add account delete button (non-functional yet) | ⏳ Not Started |
| 24 | Workspace Export | Export session context or transcript (JSON/PDF) | ⏳ Not Started |
