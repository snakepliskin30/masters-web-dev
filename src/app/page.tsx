import { Button } from "@/components/ui/button";
import { WikiCard } from "@/components/ui/wiki-card";
import { getArticles } from "@/lib/data/article";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function Home() {
  const articles = await getArticles();

  if (!articles) {
    <p>No Articles Found</p>
  }

  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 mb-10 flex flex-col gap-6">
      <Button className="max-w-sm ml-auto cursor-pointer">
        <Link href="/wiki/edit/new">Create New Article</Link>
      </Button>
      {
        articles ?
        (
          articles.map(article => (
            <WikiCard
              key={article.id}
              title={article.title ?? ""}
              author={article.authorId || "anonymous"}
              date={article.createdAt ?? ""}
              summary={article.content ?? ""}
              href={`/wiki/${article.id}`}
            />
          ))
        )
        :
        (
          <p>No Articles Found</p>
        )
      }
      </main>
    </div>
  );
}
