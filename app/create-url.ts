"use server";

import crypto from "crypto";
import { z } from "zod";
import prisma from "./db";
import { redirect } from "next/navigation";

const schema = z.object({
  url: z.string().url(),
});

export async function createURL(formData: FormData) {
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
