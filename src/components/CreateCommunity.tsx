import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router"; // تأكد من الاستيراد الصحيح
import { supabase } from "../supabase-client";

interface CommunityInput {
  name: string;
  description: string;
}

const createCommunity = async (community: CommunityInput) => {
  const { data, error } = await supabase.from("communities").insert(community);

  if (error) throw new Error(error.message);
  return data;
};

export const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // تحقق بسيط قبل الإرسال
    if (!name.trim() || !description.trim()) return;

    mutate({ name: name.trim(), description: description.trim() });
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-8">
      {/* البطاقة الرئيسية للنموذج */}
      <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
        {/* رأس البطاقة */}
        <div className="p-6 md:p-8 border-b border-border/50 bg-gradient-to-br from-surface to-background/50">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-2 flex items-center gap-2">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Create New Community
          </h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Build your own space for developers to share ideas, code snippets,
            and collaborate on projects.
          </p>
        </div>

        {/* جسم النموذج */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* حقل الاسم */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-main"
            >
              Community Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., React Wizards"
              maxLength={50}
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
            <p className="text-xs text-text-muted mt-1">Max 50 characters.</p>
          </div>

          {/* حقل الوصف */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-text-main"
            >
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this community about? Who should join?"
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
            />
          </div>

          {/* رسائل الخطأ */}
          {isError && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-fadeIn">
              <svg
                className="w-5 h-5 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Failed to create community. Please check your connection or try
                again later.
              </span>
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isPending}
              className="px-4 py-2.5 text-sm font-medium text-text-muted hover:text-white hover:bg-border/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || !name.trim() || !description.trim()}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg ${
                isPending || !name.trim() || !description.trim()
                  ? "bg-surface text-text-muted cursor-not-allowed"
                  : "bg-primary hover:bg-indigo-600 text-white shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Community"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
