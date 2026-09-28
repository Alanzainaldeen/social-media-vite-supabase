import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";

interface AuthContextType {
  user: User | null;
  loading: boolean; // ✅ جديد: لمنع ظهور Sign in لحظياً قبل تحميل الجلسة
  signWithGitHup: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        // ✅ تنظيف الـ # المتبقي في الرابط بعد العودة من GitHub
        if (event === "SIGNED_IN" && window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signWithGitHup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        // ❌ الخطأ كان هنا: بدون redirectTo يرجعك Supabase إلى Site URL (غالباً localhost)
        // ✅ الآن يرجع لنفس الدومين الذي بدأت منه تسجيل الدخول
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error("Login Error:", error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signWithGitHup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};
