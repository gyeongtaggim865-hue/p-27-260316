"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostDto } from "@/type/post";
import { fetchApi } from "@/lib/client";

export default function Home() {

    const [post, setPost] = useState<PostDto | null>(null);
    const { id } = useParams();

    useEffect(() => {
        fetchApi(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${id}`)
            .then(data => setPost(data));
    }, []);

    return (
        <>
            {post === null
                ? <div>로딩중..</div>
                : <div className="flex flex-col gap-8 items-center">
                    <div>{id}번 글 상세페이지</div>
                    <div>
                        <h1>{post.title}</h1>
                        <div>{post.content}</div>
                    </div>
                </div>
            }    
        </>
    );
}