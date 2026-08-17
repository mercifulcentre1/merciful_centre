"use client";

import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import AudioPlayer from "@/components/AudioPlayer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

function ClientContent({ children }: { children: React.ReactNode }) {
  const { audioUrl, title, preacher, isPlayerVisible, closePlayer } =
    useAudioPlayer();
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/mcadminportal");

  console.log("ClientContent state:", {
    audioUrl,
    title,
    preacher,
    isPlayerVisible,
  }); // Debug log

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "min-h-screen" : ""}>{children}</main>
      {!isAdminRoute && <Footer />}
      {isPlayerVisible && audioUrl && (
        <AudioPlayer
          audioUrl={audioUrl}
          title={title || ""}
          preacher={preacher || undefined}
          onClose={closePlayer}
        />
      )}
    </>
  );
}

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudioPlayerProvider>
      <ClientContent>{children}</ClientContent>
    </AudioPlayerProvider>
  );
}
