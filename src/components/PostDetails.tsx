import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./commentSection";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center max-w-md">
          <p className="text-red-400 font-semibold">Something went wrong</p>
          <p className="text-gray-400 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400">No post found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* البطاقة الرئيسية للمنشور */}
      <div className="bg-[#181b20] border border-[#3f4450] rounded-3xl overflow-hidden shadow-2xl">
        {/* الصورة - تنسيق محسّن */}
        <div className="relative w-full overflow-hidden bg-linear-to-br from-purple-900/20 to-pink-900/20">
          {data.image_url ? (
            <img
              src={data.image_url}
              alt={data.title}
              className="w-full h-auto max-h-150 object-cover"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-purple-500/20"
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

          {/* تأثير تدرج في أسفل الصورة */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#181b20] to-transparent pointer-events-none" />
        </div>

        {/* المحتوى */}
        <div className="p-6 md:p-8 space-y-6">
          {/* العنوان - تنسيق محسّن */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            {data.title}
          </h1>

          {/* معلومات التاريخ والمستخدم */}
          <div className="flex items-center gap-3 text-sm text-gray-400 border-b border-white/5 pb-4">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              Posted on{" "}
              {new Date(data.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* المحتوى النصي */}
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
              {data.content}
            </p>
          </div>
        </div>

        {/* قسم التفاعلات */}
        <div className="px-6 md:px-8 py-4 border-t border-white/5 bg-[#13151a]">
          <LikeButton postId={postId} />
        </div>
      </div>

      {/* قسم التعليقات - بطاقة منفصلة */}
      <div className="bg-[#181b20] border border-[#3f4450] rounded-3xl p-6 md:p-8 shadow-xl">
        <CommentSection postId={postId} />
      </div>
    </div>
  );
};
