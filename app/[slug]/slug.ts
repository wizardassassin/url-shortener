import prisma from "@/app/db";

export async function getSlug(slug: string) {
  const urlData = await prisma.url.findUnique({
    where: {
      slug: slug,
    },
  });
  return urlData;
}

export async function updateSlug(id: string, visits: number) {
  await prisma.url.update({
    where: {
      id: id,
    },
    data: {
      visits: visits,
    },
  });
}
