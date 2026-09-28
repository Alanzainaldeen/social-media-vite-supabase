import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/create", label: "Create Post" },
  { to: "/communities", label: "Communities" },
  { to: "/community/create", label: "Create Community" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signWithGitHup, signOut, user, loading } = useAuth();

  const displayName =
    user?.user_metadata?.user_name ||
    user?.user_metadata?.full_name ||
    user?.email ||
    "User";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  const closeMenu = () => setMenuOpen(false);

  // ✅ إغلاق قائمة الموبايل تلقائياً عند التكبير لحجم الديسكتوب
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSignIn = async () => {
    closeMenu();
    await signWithGitHup();
  };

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="font-mono text-xl font-bold text-white shrink-0"
          >
            Coder<span className="text-purple-500">.Hup</span>
          </Link>

          {/* Desktop Links */}
          {/* ❌ كان md:flex — عند 768px لا يوجد مكان كافٍ بعد تسجيل الدخول */}
          {/* ✅ صار lg:flex (1024px) */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center shrink-0">
            {loading ? (
              <div className="h-8 w-36 rounded bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                )}
                {/* ✅ truncate حتى لا يكسر الإيميل الطويل الـ Navbar */}
                <span
                  className="text-gray-300 max-w-[140px] truncate"
                  title={displayName}
                >
                  {displayName}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded whitespace-nowrap transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded whitespace-nowrap transition-colors"
              >
                Sign in with GitHub {/* ✅ كانت Sign n */}
              </button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="text-white p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[rgba(10,10,10,0.95)] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={closeMenu} // ❌ كان ناقصاً: القائمة تبقى مفتوحة فوق المحتوى
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 pb-4 border-t border-gray-800 px-2">
            {loading ? (
              <div className="h-10 w-full rounded bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  )}
                  <span className="text-gray-300 font-medium truncate">
                    {displayName}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors shrink-0"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center font-medium transition-colors"
              >
                Sign in with GitHub
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};