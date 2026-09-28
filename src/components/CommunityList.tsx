import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Community[];
};

export const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  if (isLoading)
    return (
      <div className="text-center text-gray-400 mt-10">
        Loading communities...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-400 mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-4 p-4">
      {data?.map((community) => (
        <div
          key={community.id}
          className="border border-white/10 bg-[#181b20] p-6 rounded-2xl hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300"
        >
          {/* ✅ الإصلاح هنا: تمرير الـ ID في الرابط */}
          <Link
            to={`/community/${community.id}`}
            className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
          >
            {community.name}
          </Link>
          <p className="text-gray-400 mt-2">{community.description}</p>
        </div>
      ))}
    </div>
  );
};
