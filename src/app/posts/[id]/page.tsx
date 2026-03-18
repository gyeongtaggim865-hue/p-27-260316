"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostDto } from "@/type/post";
import { fetchApi } from "@/lib/client";

export default function Home() {

    const [post, setPost] = useState<PostDto | null>(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        fetchApi(`/api/v1/posts/${id}`)
            .then(data => setPost(data));
    }, []);

    const onDeleteHandler = (id : number) => {
        
        fetchApi(`/api/v1/posts/${id}`,{
            method: "DELETE"
        })
        .then((rs) => {
            console.log(rs.msg);
            router.replace("/posts");
        })
    }

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
                    <div>
                        <button onClick={() => {
                            onDeleteHandler(post.id);
                        }} 
                        className="border-1 rounded p-2 bg-red-500">삭제</button>
                    </div>
                </div>
            }    
        </>
    );
}