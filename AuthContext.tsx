import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Plus,
  LogOut,
  ChevronDown,
  User,
  Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onPlanHangout: () => void;
}

export default function Navbar({ onPlanHangout }: NavbarProps) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!user) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-white/10 backdrop-blur-xl bg-slate-950/40 sticky top-0 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative p-2.5 rounded-xl glass border-purple-400/20"
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-500 rounded-full"
              />
            </motion.div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Hangout Planner
              </h1>
              <p className="text-[11px] sm:text-xs text-purple-300/40 hidden sm:block">
                Plan your perfect hangout moments
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Plan button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlanHangout}
              className="group relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-sm"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-100 group-hover:opacity-90 transition-opacity blur-[2px]" />
              <div className="relative bg-slate-950 rounded-xl px-3 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 text-white">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Plan a Hangout</span>
                <span className="sm:hidden">Plan</span>
              </div>
            </motion.button>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 pr-2 sm:pr-3 py-1.5 sm:py-2 rounded-xl glass hover:bg-white/15 transition-colors"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-lg border border-purple-400/20">
                    {user.avatar}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-white leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-purple-300/40 leading-tight">
                    Online
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-purple-300/40" />
                </motion.div>
              </motion.button>

              {/* Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      className="absolute right-0 top-full mt-2 w-56 glass rounded-xl overflow-hidden shadow-xl shadow-purple-900/50 z-50 border border-white/15"
                    >
                      {/* User info in dropdown */}
                      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-xl border border-purple-400/20">
                            {user.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-purple-300/40 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1.5">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-purple-200/70 hover:text-white hover:bg-white/10 transition-colors">
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-purple-200/70 hover:text-white hover:bg-white/10 transition-colors">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-white/10 py-1.5">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-300/80 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
