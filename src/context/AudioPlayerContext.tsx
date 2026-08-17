"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AudioPlayerContextType {
  audioUrl: string | null;
  title: string | null;
  preacher: string | null;
  isPlayerVisible: boolean;
  playSermon: (audioUrl: string, title: string, preacher?: string) => void;
  closePlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [preacher, setPreacher] = useState<string | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const playSermon = (audioUrl: string, title: string, preacher?: string) => {
    console.log("Playing sermon:", { audioUrl, title, preacher }); // Debug log
    setAudioUrl(audioUrl);
    setTitle(title);
    setPreacher(preacher || null);
    setIsPlayerVisible(true);
  };

  const closePlayer = () => {
    setIsPlayerVisible(false);
    setAudioUrl(null);
    setTitle(null);
    setPreacher(null);
  };

  const value = {
    audioUrl,
    title,
    preacher,
    isPlayerVisible,
    playSermon,
    closePlayer,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }
  return context;
}
