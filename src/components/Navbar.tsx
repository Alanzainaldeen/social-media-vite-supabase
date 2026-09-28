import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signWithGitHup, signOut, user } = useAuth();

  const displayName = user?.user_metadata?.user_name || user?.email || "User";

  const closeMenu = () => setMenuOpen(false);

  // دالة ذكية: إذا كان مسجل دخول → خروج، إذا لم يكن → دخول
  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      signWithGitHup();
    }
  };

  return (
    <>
      {/* 1. الشريط العلوي الثابت */}
      <nav className="fixed top-0 w-full z-50 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* الشعار */}
            <Link
              to="/"
              className="font-mono text-xl font-bold text-white"
              onClick={closeMenu}
            >
              Coder<span className="text-purple-500">.Hup</span>
            </Link>

            {/* روابط سطح المكتب */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/create"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Create Post
              </Link>
              <Link
                to="/communities"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Communities
              </Link>
              <Link
                to="/community/create"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Create Community
              </Link>
            </div>

            {/* مصادقة سطح المكتب */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.user_metadata?.avatar_url && (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                  )}
                  <span className="text-gray-300 text-sm">{displayName}</span>
                  <button
                    onClick={signOut}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signWithGitHup}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Sign in
                </button>
              )}
            </div>

            {/* 📱 قسم الموبايل: زر المصادقة الذكي + زر القائمة */}
            <div className="md:hidden flex items-center gap-2">
              {/* ✅ زر المصادقة الذكي - يظهر دائماً */}
              <button
                onClick={handleAuthClick}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold transition-colors shadow-md ${
                  user
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {user ? (
                  <>
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Login</span>
                  </>
                )}
              </button>

              {/* زر فتح/إغلاق القائمة */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. قائمة الموبايل المنسدلة (روابط فقط) */}
      {menuOpen && (
        <>
          {/* خلفية معتمة */}
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          />

          {/* حاوية القائمة */}
          <div className="fixed top-16 left-0 w-full z-40 md:hidden bg-[rgba(10,10,10,0.98)] border-b border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/create"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                onClick={closeMenu}
              >
                Create Post
              </Link>
              <Link
                to="/communities"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                onClick={closeMenu}
              >
                Communities
              </Link>
              <Link
                to="/community/create"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                onClick={closeMenu}
              >
                Create Community
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
