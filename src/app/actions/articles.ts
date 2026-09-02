"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/drizzle/db";
import { article } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Server actions for articles (stubs)
// TODO: Replace with real database operations when ready

export type CreateArticleInput = {
  title: string;
  content: string;
  imageUrl?: string;
};

export type UpdateArticleInput = {
  title?: string;
  content?: string;
  imageUrl?: string;
};

export async function createArticle(data: CreateArticleInput) {
  const session = await auth.api.getSession({
      headers: await headers()
    });
  if (!session) {
    throw new Error("❌ Unauthorized");
  }

  // TODO: Replace with actual database call
  console.log("✨ createArticle called:", data);
  const newRecord = await db.insert(article).values({
    title: data.title,
    content: data.content,
    slug: `${Date.now()}`,
    published: true,
    authorId: session.user.id
  })
  .returning()

  return { success: true, message: "Article create logged (stub)", id: newRecord[0].id };
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
  const session = await auth.api.getSession({
      headers: await headers()
    });
  if (!session) {
    throw new Error("❌ Unauthorized");
  }

  // TODO: Replace with actual database update
  console.log("📝 updateArticle called:", { id, ...data });
  await db.update(article).set({
    title: data.title,
    content: data.content
  })
  .where(eq(article.id, +id))

  return { success: true, message: `Article ${id} update logged (stub)` };
}

export async function deleteArticle(id: string) {
  const session = await auth.api.getSession({
      headers: await headers()
    });
  if (!session) {
    throw new Error("❌ Unauthorized");
  }

  // TODO: Replace with actual database delete
  console.log("🗑️ deleteArticle called:", id);
  return { success: true, message: `Article ${id} delete logged (stub)` };
}

// Form-friendly server action: accepts FormData from a client form and calls deleteArticle
export async function deleteArticleForm(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (!id) {
    throw new Error("Missing article id");
  }

  await deleteArticle(String(id));
  // After deleting, redirect the user back to the homepage.
  redirect("/");
}