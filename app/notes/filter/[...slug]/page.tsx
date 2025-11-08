import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteList from '@/components/NoteList/NoteList';
import { getNotesByQuery, NoteTag } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0] as NoteTag;

  const queryClient = new QueryClient();
  const data = await getNotesByQuery(undefined, 1, category);

  await queryClient.prefetchQuery({
    queryKey: ["notes", category ?? "", 1],
    queryFn: () => getNotesByQuery(undefined, 1, category),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <h1>Notes List</h1>
        <NoteList notes={data.notes} />
      </div>
    </HydrationBoundary>
  );
};

export default NotesByCategory;
