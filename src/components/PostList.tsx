import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase-client"
import { PostItem } from "./PostItem";

export interface Post {
    username: string;
    id: number;
    title: string;
    content: string;
    created_at: string;
    image_url: string;
    avatar_url?: string;
    like_count?: number;
    comment_count?: number;
}

const fetchPosts = async (): Promise<Post[]> => {
    const { data, error } = await supabase.rpc("get_posts_with_counts");

    if (error) throw new Error(error.message);

    return data as Post[];
}

export const PostLst = () => {
    const { data, error, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })

    if (isLoading) {
        return <div>Loading posts</div>
}

    if (error) {
        return <div>Error: {error.message}</div>
    }

    console.log(data);
    // console.log("IMAGE:", data?.[0]?.["image-url"]);

    return (
        <div className="flex flex-wrap gap-6 justify-center" >
            {data?.map((post, key) =>(
                <PostItem post={post} key={key} />
            ))}
        </div>
    )
}