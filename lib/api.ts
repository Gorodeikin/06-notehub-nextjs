import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
console.log("Loaded token:", TOKEN);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NormalizedFetchNotesResponse extends FetchNotesResponse {
  page: number;
  perPage: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<NormalizedFetchNotesResponse> {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("perPage", String(perPage));
  if (search.trim()) {
    params.append("search", search.trim());
  }

  const res: AxiosResponse<FetchNotesResponse> = await api.get(
    `/notes?${params.toString()}`
  );

  return {
    ...res.data,
    page,
    perPage,
  };
}

export async function createNote(
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
    return res.data;
}
