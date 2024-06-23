import { redirect } from "next/navigation";
import { getSlug } from "../slug";
import StatBox from "./stat-box";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const urlData = await getSlug(slug);
  if (!urlData) redirect("/");
  // weird workaround to get the host
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("x-forwarded-host");
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-24">
      <h1 className="font-bold text-3xl">
        <Link href="/">URL Statistics</Link>
      </h1>
      <StatBox
        host={`${protocol}://${host}`}
        slug={urlData.slug}
        url={urlData.url}
        visits={urlData.visits}
        createdAt={urlData.createdAt}
        updatedAt={urlData.updatedAt}
      />
    </main>
  );
}
