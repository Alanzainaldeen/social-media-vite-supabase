import { Link } from "react-router";
import type { Post } from "./PostList";

interface Props {
    post: Post;
}

    export const PostItem = ({ post }: Props) => {
    return (
        <div className="relative group w-full max-w-107.5">
        {/* Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-pink-600 to-purple-600 opacity-0 blur-md transition duration-300 group-hover:opacity-60" />

        <Link to={`/post/${post.id}`} className="relative block">
            {/* Card */}
            <div className="relative h-101.25 rounded-3xl border border-[#3f4450] bg-[#181b20] p-5 text-white overflow-hidden transition duration-300 group-hover:border-purple-500/50">
            {/* Header */}
            <div className="flex items-center gap-3">
                {/* Avatar */}
                {post.avatar_url ? (
                    <img 
                    src={post.avatar_url} 
                    alt="User Avatar" 
                    className="w-8.75 h-8.75 rounded-full object-cover"
                    />
                ) : (
                <div className="h-11.25 w-11.25 shrink-0 rounded-full bg-linear-to-br from-purple-500 to-purple-800" />
                )}   
                {/* Title */}
                <div className="min-w-0">
                <h2 className="truncate text-[21px] font-semibold">
                    {post.title}
                </h2>
                </div>
            </div>

            {/* Image */}
            <div className="mt-3 h-51.25 w-full overflow-hidden rounded-[20px]">
                <img
                src={post.image_url}
                alt={post.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
            </div>
                <div className="flex justify-around items-center">
                <span className="cursor-pointer h-10 w-12.5 px-1 flex items-center justify-center font-extrabold rounded-lg">
                    ❤️ <span className="ml-2">{post.like_count ?? 0}</span>
                </span>
                <span className="cursor-pointer h-10 w-12.5 px-1 flex items-center justify-center font-extrabold rounded-lg">
                    💬 <span className="ml-2">{post.comment_count ?? 0}</span>
                </span>
                </div>
            </div>
        </Link>
        </div>
    );
};
