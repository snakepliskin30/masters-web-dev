import WikiEditor from "@/components/wiki-editor";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function NewArticlePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session)
    redirect("/auth/signin")

  return <WikiEditor isEditing={false} />;
}
