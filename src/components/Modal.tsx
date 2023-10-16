import React, { ReactNode } from "react";
import "./Modal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">{children}</div>
    </div>
  );
}
