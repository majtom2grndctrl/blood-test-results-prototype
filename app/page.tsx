import { redirect } from "next/navigation";

export default function Home() {
  redirect("/medical-records/test-results");
}
