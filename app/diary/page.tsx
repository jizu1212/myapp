"use client";
import React, { useState, useEffect } from "react";
import { DiaryEntry } from "@/app/_types/diaryEntry";
import Diary from "./diary";
import { getDiaryEntry } from "@/services/DiaryService";
const Page: React.FC = () => {
  // Step 2: Create a state variable to hold the diary entry data
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry | null>(null);

  // Step 3: Use useEffect to fetch the diary entry data
  useEffect(() => {
    const fetchDiaryEntry = async () => {
      const entry = await getDiaryEntry();
      setDiaryEntry(entry); // Update the state with the fetched data
    };

    fetchDiaryEntry();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Step 4: Pass the diaryEntry state variable as a prop to the Diary component
  return (
    <div>
      <Diary diary={diaryEntry}></Diary>
    </div>
  );
};

export default Page;
