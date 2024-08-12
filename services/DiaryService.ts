"use server";

// src/services/DiaryService.ts
import { DiaryEntry } from "@/app/_types/diaryEntry";
import { mockDiary } from "../mocks/mockDiary";

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export const getDiaryEntry = async (): Promise<DiaryEntry> => {
  if (useMockData) {
    return mockDiary;
  }
  // Replace with actual API call
  const response = await fetch("/api/diary");
  const data: DiaryEntry = await response.json();
  return data;
};
