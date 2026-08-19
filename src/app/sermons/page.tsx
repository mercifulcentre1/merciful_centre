import { fetchSermons } from "@/lib/api";
import SermonsClient from "./SermonsClient";

export default async function SermonsPage() {
  const sermons = await fetchSermons();
  return <SermonsClient initialSermons={sermons} />;
}
