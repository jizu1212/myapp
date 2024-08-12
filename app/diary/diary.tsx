import React from "react";
import { DiaryEntry } from "@/app/_types/diaryEntry"; // Adjust the import path as necessary

interface DiaryProps {
  diary: DiaryEntry | null;
}

const Diary: React.FC<DiaryProps> = ({ diary }) => {
  if (!diary) {
    return (
      <div>
        <h1>NULL diary title</h1>
        <p>NULL diary content</p>
        <small>NULL diary date</small>
      </div>
    );
  }

  return (
    <div>
      <h1>{diary.title}</h1>
      <p>{diary.content}</p>
      <small>{diary.date}</small>
    </div>
  );
};

export default Diary;
