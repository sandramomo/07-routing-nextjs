'use client';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from './NotePreview.module.css';

type Props = {
  noteId: string;
};

const NotePreview = ({ noteId }: Props) => {
  const router = useRouter();

  const { data: note } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (!note) return null; 

  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <button className={css.button} onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default NotePreview;
