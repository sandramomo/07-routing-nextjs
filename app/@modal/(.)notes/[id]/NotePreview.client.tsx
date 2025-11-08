'use client';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from './NotePreview.module.css';

type Props = {
  noteId: string;
};

const NotePreviewClient = ({ noteId }: Props) => {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const close = () => router.back();

  if (isLoading) return (
    <Modal onClose={close}>
      <p>Loading...</p>
    </Modal>
  );

  if (isError || !note) return (
    <Modal onClose={close}>
      <p>Error loading note.</p>
    </Modal>
  );

  return (
    <Modal onClose={close}>
      <div className={css.modalContent}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
