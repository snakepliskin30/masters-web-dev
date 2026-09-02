import WikiEditor from "@/components/wiki-editor";
import { auth } from "@/lib/auth";
import { getArticleById } from "@/lib/data/article";
import { Home } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    redirect("/auth/signin")
  }

  const { id } = await params;

  const article = await getArticleById(+id);

  if (!article) {
    return (
      <>
        <h3>Article Not Found</h3>
        <Link
            href="/"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
        </Link>
      </>
    )
  }

  return (
    <WikiEditor
      initialTitle={article.title}
      initialContent={article.content}
      isEditing={true}
      articleId={id}
    />
  );
}
