import WikiArticleViewer from "@/components/wiki-article-viewer";
import { auth } from "@/lib/auth";
import { getArticleById } from "@/lib/data/article";
import { headers } from "next/headers";

type WikiArticlePage = {
    params: Promise<{
        id: string
    }>
} 

export default async function WikiArticlePage({ params }: WikiArticlePage) {
    const { id } = await params;
    const article = await getArticleById(parseInt(id));
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const canEdit = session?.user.id === article?.authorId;

    if (!article) {
        return <h3>There was a proble fetching the article.</h3>
    }

    return <WikiArticleViewer article={article} canEdit={canEdit} />
}