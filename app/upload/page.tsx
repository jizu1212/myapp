"use client";
import { useRef, useState } from "react";
import FeedbackModal from "./FeedbackModal";

export default function UploadPage() {
  const fileStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  };
  const iconStyle: React.CSSProperties = {
    width: "100px",
    height: "100px",
  };

  const thumbnailStyle: React.CSSProperties = {
    width: "100px", // or your preferred width
    height: "100px", // or your preferred height
    objectFit: "contain",
  };

  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Function to determine if the file is an image based on its MIME type
  const isImage = (fileType: string) => /^image\//.test(fileType);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const storageUrl = "/api/submit";
  // Example mapping of file extensions to icon paths
  const fileIcons: { [key: string]: string } = {
    "application/pdf": "/icons/default-icon.png",
    "application/msword": "path/to/word-icon.png",
    // You can add more key-value pairs here
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (files.length === 0) {
      setFeedback("No file selected.");
      setShowModal(true); // Show modal to indicate no file selected
      return;
    }

    // Create a FormData object and append the files
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("category", category);
    try {
      setIsSubmitting(true);
      // Replace '/api/upload' with your actual endpoint that handles file uploads
      const response = await fetch(storageUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setFeedback(result.message + result.count); // Assuming the server responds with a JSON object that includes a message
      setIsSubmitting(false);
      setShowModal(true); // Show modal on success
    } catch (error) {
      setFeedback("Failed to upload file(s). Please try again.");
      setIsSubmitting(false);
      setShowModal(true); // Show modal on error
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length) {
      setFiles([...files, ...Array.from(droppedFiles)]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation(); // This stops the click event from propagating to parent elements
    setFiles(files.filter((_, i) => i !== index));
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: "none" }}
          multiple // Allow multiple file selection
        />
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          Drag and drop your files here or click to select files
          <ul>
            {files.map((file, index) => (
              <li key={index} style={fileStyle}>
                {isImage(file.type) ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={thumbnailStyle}
                    onLoad={(event) =>
                      URL.revokeObjectURL(event.currentTarget.src)
                    } // Clean up object URL after loading
                  />
                ) : (
                  <img
                    src={fileIcons[file.type] || "/icons/default-icon.png"} // Fallback to a default icon if no match is found
                    alt="File icon"
                    style={iconStyle}
                  />
                )}
                {file.name}{" "}
                <button
                  type="button"
                  onClick={(event) => handleDelete(event, index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          {/* Add more categories as needed */}
        </select>
        {isSubmitting && <p>Uploading...</p>}
        <button type="submit">Upload</button>
      </form>
      <FeedbackModal
        isOpen={showModal}
        message={feedback}
        onClose={handleCloseModal}
      />
    </>
  );
}
