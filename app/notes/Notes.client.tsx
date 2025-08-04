"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NotesPage.module.css"

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface NotesClientProps {
  initialNotes: Note[];
  totalPages: number;
}

export default function NotesClient({ initialNotes, totalPages }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    initialData: 
      page === 1 && debouncedSearch === ""
        ? { notes: initialNotes, totalPages, page: 1, perPage: 12 }
        : undefined,
      placeholderData: (prev) => prev,
      refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const pages = data?.totalPages ?? 1;

  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={(val: string) => setSearch(val)} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p className={css.message}>No notes found.</p>
      )}
      {pages > 1 && (
        <Pagination currentPage={page} totalPages={pages} onPageChange={setPage} />
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
