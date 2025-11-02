'use client';
// import { createPortal } from "react-dom";
// import { useEffect, type ReactNode } from "react";
import css from "./Modal.module.css";
import { useRouter } from 'next/navigation';

// interface ModalProps {
//   onClose: () => void;
//   children: ReactNode;
// }

// export default function Modal({ onClose, children }: ModalProps) {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return createPortal(
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={handleBackdropClick}
//     >
//       <div className={css.modal}>{children}
        
//       </div>
//     </div>,
//     document.body
//   );
// }


type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <div className={css.backdrop} >
      <div className={css.modal}>
        {children}
        <button  className={css.button} onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
