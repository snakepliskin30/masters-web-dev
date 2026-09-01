"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Server actions for articles (stubs)
// TODO: Replace with real database operations when ready

export type CreateArticleInput = {
  title: string;
  content: string;
  authorId: string;
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
  return { success: true, message: "Article create logged (stub)" };
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