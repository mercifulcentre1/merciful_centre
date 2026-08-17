"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  preacher?: string;
  onClose: () => void;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost/church-website/backend";

export default function AudioPlayer({
  audioUrl,
  title,
  preacher,
  onClose,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Get the full URL for the audio file
  const fullAudioUrl = audioUrl.startsWith("http")
    ? audioUrl
    : `${API_BASE_URL}/${audioUrl}`;

  useEffect(() => {
    console.log("AudioPlayer mounted with URL:", fullAudioUrl); // Debug log
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e);
      setError("Failed to load audio. Please try again.");
      setIsPlaying(false);
    };
    const handleCanPlay = () => {
      console.log("Audio can play"); // Debug log
      setError(null);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    // Try to load the audio
    audio.load();

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [fullAudioUrl]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
      setIsPlaying(!isPlaying);
      console.log("Playback state toggled:", !isPlaying); // Debug log
    } catch (err) {
      console.error("Error toggling playback:", err);
      setError("Failed to play audio. Please try again.");
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            disabled={!!error}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                {preacher && (
                  <p className="text-xs text-gray-500">{preacher}</p>
                )}
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-10">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={!!error}
              />
              <span className="text-xs text-gray-500 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={fullAudioUrl} preload="auto" />
    </div>
  );
}
