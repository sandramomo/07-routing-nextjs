'use client';
import { useRouter } from "next/navigation";
import css from './NotePreview.module.css'

type Props = {
  children: React.ReactNode;
};

const NotePreview = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button  className={css.button} onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default NotePreview;