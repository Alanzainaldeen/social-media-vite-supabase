import { Link } from "react-router";
import type { Post } from "./PostList";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  return (
    <div className="relative group w-full max-w-sm">
      {/* تأثير التوهج الحديث */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 blur-lg transition duration-500 group-hover:opacity-60 pointer-events-none" />

      <Link to={`/post/${post.id}`} className="relative block">
        <div className="relative rounded-3xl border border-[#3f4450] bg-[#181b20] overflow-hidden transition duration-300 group-hover:border-purple-500/50">
          {/* الصورة في الأعلى */}
          <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-purple-500/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#181b20] to-transparent pointer-events-none" />
          </div>

          {/* المحتوى */}
          <div className="p-5 space-y-4">
            {/* معلومات المستخدم */}
            <div className="flex items-center gap-3">
              {post.avatar_url ? (
                <img
                  src={post.avatar_url}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 ring-2 ring-purple-500/30 flex items-center justify-center text-white font-bold">
                  {post.username?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {post.username || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* العنوان */}
            <h2 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
              {post.title}
            </h2>

            {/* التفاعلات */}
            <div className="flex items-center gap-6 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-gray-400">
                <span>❤️</span>
                <span className="text-sm font-semibold">
                  {post.like_count ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span>💬</span>
                <span className="text-sm font-semibold">
                  {post.comment_count ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
