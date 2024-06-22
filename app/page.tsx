import Image from "next/image";

import crypto from "crypto";
import { z } from "zod";
import prisma from "./db";
import { redirect } from "next/navigation";

const schema = z.object({
  url: z.string().url(),
});

export default function Home() {
  async function createURL(formData: FormData) {
    "use server";
    const validatedFields = schema.safeParse({
      url: formData.get("url"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const intToChar = (num: number) => {
      // 52,53,...,61 -> 0,1,...9
      if (num >= 52) return String(num - 52);
      // 0,1,...,25 -> a,b,...,z
      if (num < 26) return String.fromCharCode(num + 97);
      // 26,27,...,51 -> A,B,...,Z
      return String.fromCharCode(num - 26 + 65);
    };
    const createSlug = async (url: string) => {
      // allow 5 attempts at generating a slug
      for (let i = 0; i < 5; i++) {
        const slug = Array.from({ length: 5 }, () =>
          intToChar(crypto.randomInt(0, 26 + 26 + 10))
        ).join("");
        try {
          await prisma.url.create({
            data: {
              slug: slug,
              url: url,
            },
          });
          return slug;
        } catch (error: any) {
          if (error?.code !== "P2002") throw error;
          console.error(`Failed Slug: ${slug}`);
        }
      }
      return null;
    };
    const url = validatedFields.data.url;
    const slug = await createSlug(url);
    if (!slug) throw new Error("How did we get here?");
    redirect(`/${slug}/info`);
  }
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-24">
      <h1 className="font-bold text-3xl">URL Shortener</h1>
      <form action={createURL}>
        <input
          type="url"
          name="url"
          placeholder="Enter the link here"
          required
          className="py-2 px-4 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-4xl lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Shorten</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Take long URLs and condense them down into a short link.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">QR Code</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Generate a QR Code to scan into a URL.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Statistics</h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Track the number of times the URL has been used.
          </p>
        </div>
      </div>
    </main>
  );
}
