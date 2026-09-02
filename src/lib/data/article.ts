import { db } from "@/drizzle/db";
import { user, article } from "@/drizzle/schema";
import { WikiCard } from "@/components/ui/wiki-card";
import { eq } from "drizzle-orm";
import { ArticleType } from "@/types/api";

export async function getArticles() {
    // method 1 that will return only the wanted fields
    const result = await db
        .select({
            title: article.title,
            id: article.id,
            createdAt: article.createdAt,
            content: article.content,
            authorId: user.name
        })
        .from(article)
        .leftJoin(user, eq(user.id, article.authorId))

    // method 2 but will return everything in schema
    // const result = await db.query.article.findMany({
    //     with: {
    //         user: true
    //     }
    // })

    if (!result) {
        return null
    }

    // console.log('result', result);

    return result;
}

export async function getArticleById(id: number) {
    const result = await db
        .select({
            title: article.title,
            id: article.id,
            createdAt: article.createdAt,
            content: article.content,
            author: user.name,
            imageUrl: article.imageUrl,
            authorId: user.id
        })
        .from(article)
        .where(eq(article.id, id))
        .leftJoin(user, eq(article.authorId, user.id))

    if (!result) {
        return null
    }

    return result[0];
}
