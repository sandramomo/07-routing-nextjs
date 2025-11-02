

import NoteList from '@/components/NoteList/NoteList';
import { getNotesByCategory } from '@/lib/api';


type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
    console.log(category)
    const response = await getNotesByCategory(category);
    console.log(response)

  return (
    <div>
          <h1>Notes List</h1>
          {response?.notes?.length > 0 && <NoteList notes={response.notes} queryKey={["notes", category ?? "", 1]} />}
    </div>
  );
};

export default NotesByCategory;
