import { redirect } from "next/navigation";
import { getSlug } from "../slug";

export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const urlData = await getSlug(slug);
  if (!urlData) redirect("/");
  return <div className="min-h-screen">Stats: {`${urlData.visits}`}</div>;
}
