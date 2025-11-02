
import NotePreviewModal from '@/components/NotePreview/NotePreviewModal';
import { fetchNoteById } from '@/lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
              <NotePreviewModal>
             <h2>{note.title}</h2>
              <p>{note.content}</p>
              </NotePreviewModal>
  );
};

export default NotePreview;