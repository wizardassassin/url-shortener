import { redirect } from "next/navigation";
import { getSlug, updateSlug } from "./slug";

export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const urlData = await getSlug(slug);
  if (!urlData) redirect("/");
  await updateSlug(urlData.id, urlData.visits + 1);
  redirect(urlData.url);
}
