import { db } from "@/drizzle/db";
import { user, article } from "@/drizzle/schema";
import { WikiCard } from "@/components/ui/wiki-card";
import { eq } from "drizzle-orm";
import { ArticleType } from "@/types/api";

import redis from "@/cache"

type GetArticleReturnType = {
    title: string;
    id: number;
    createdAt: string;
    content: string;
    authorId: string | null;
}

type PartialGetArticleReturnType = Partial<GetArticleReturnType>

export async function getArticles(): Promise<PartialGetArticleReturnType[] | null> {
    // check cash
    const cached = await redis.get("articles:all") as PartialGetArticleReturnType[]
    if (cached) {
        console.log("Get articles cache hit")
        return cached;
    }

    console.log("Get article cache miss");

    const x: PartialGetArticleReturnType = { title: "test "}

    // method 1 that will return only the wanted fields
    const result: PartialGetArticleReturnType[] = await db
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

    redis.set("articles:all", result, {
        ex: 60
    })

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
