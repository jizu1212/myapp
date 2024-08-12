"use client";
import React from "react"; // Ensure React is imported when using JSX

interface FeedbackModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void; // Assuming onClose is a function that takes no arguments
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <p style={{ color: "black" }}>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FeedbackModal;
