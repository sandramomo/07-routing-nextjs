"use client";
import { useState, type MouseEventHandler } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { getNotesByQuery } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.module.css"


function NotesClient() {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryKey: [string, string, number] = ["note", debouncedValue, currentPage];

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedValue(value);
    setCurrentPage(1);
  }, 1000);

  const handleFilterChange = (query: string) => {
    debouncedSearch(query);
  };
  const { data, isSuccess } = useQuery({
    queryKey,
    queryFn: () => getNotesByQuery(debouncedValue, currentPage),
    placeholderData: (prev) => prev, 
  });

  const handleCreateClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app} >
      <div className={css.toolbar}>
        <SearchBox onSearch={handleFilterChange} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={handleCreateClick}>
          Create note +
        </button>
      </div>

      {isSuccess && data && <NoteList notes={data.notes} queryKey={["note", debouncedValue, currentPage]} />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm handleCancelNote={handleCloseModal} queryKey={queryKey} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;