import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const { notes, totalPages } = await fetchNotes({ page: 1, perPage: 12, search: "" });

  return <NotesClient initialNotes={notes} totalPages={totalPages} />;
}
