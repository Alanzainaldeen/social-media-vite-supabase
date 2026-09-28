import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import type { Post } from "../components/PostList";
import { PostItem } from "../components/PostItem";

interface Props {
  communityId: number;
}

// نوسع نوع Post ليشمل اسم المجتمع
interface PostWithCommunity extends Post {
  communities?: { name: string };
}

const fetchCommunityPosts = async (
  communityId: number,
): Promise<PostWithCommunity[]> => {
  // ✅ تأكد أن اسم العمود في قاعدة بياناتك هو "community_id" تماماً
  const { data, error } = await supabase
    .from("posts")
    .select("*, communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as PostWithCommunity[]) || [];
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["communityPosts", communityId],
    queryFn: () => fetchCommunityPosts(communityId),
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Loading community posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-10">
        Error: {error.message}
      </div>
    );
  }

  // طباعة البيانات في الكونسول للتأكد (اضغط F12 لترها)
  console.log("Community Posts Data:", data);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {data?.[0]?.communities?.name ?? "Community"} Posts
      </h2>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#181b20] rounded-3xl border border-white/5">
          <p className="text-gray-400 text-lg">
            لا توجد منشورات في هذا المجتمع حتى الآن.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            كن أول من ينشر شيئاً رائعاً!
          </p>
        </div>
      )}
    </div>
  );
};
