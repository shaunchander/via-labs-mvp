'use client';

import React, { createContext, useContext, useState } from "react";

interface QuestionnaireContextValue {
  isOpen: boolean;
  openQuestionnaire: () => void;
  closeQuestionnaire: () => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(
  null
);

export function QuestionnaireProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QuestionnaireContext.Provider
      value={{
        isOpen,
        openQuestionnaire: () => setIsOpen(true),
        closeQuestionnaire: () => setIsOpen(false),
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const ctx = useContext(QuestionnaireContext);
  if (!ctx)
    throw new Error(
      "useQuestionnaire must be used within QuestionnaireProvider"
    );
  return ctx;
}
