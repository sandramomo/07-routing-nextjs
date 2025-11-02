
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { getNotesByQuery } from "@/lib/api";

const NoteDetails = async () => {
    const queryClient = new QueryClient();
    
 await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => getNotesByQuery("", 1),
  });

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient/>
    </HydrationBoundary>
  );
};

export default NoteDetails;
