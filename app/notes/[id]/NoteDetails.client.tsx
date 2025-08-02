"use client";

import { HydrationBoundary, useQuery, DehydratedState } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  noteId: string;
  dehydratedState?: DehydratedState | null;
}

export default function NoteDetailsClient({
  noteId,
  dehydratedState,
}: NoteDetailsClientProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsContent noteId={noteId} />
    </HydrationBoundary>
  );
}

function NoteDetailsContent({ noteId }: { noteId: string }) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (isError || !data) return <p>Failed to load note.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>
          Created at: {new Date(data.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}


