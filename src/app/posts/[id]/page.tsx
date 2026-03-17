"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostDto } from "@/type/post";

export default function Home() {

    const [post, setPost] = useState<PostDto | null>(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPost(data)
            })
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