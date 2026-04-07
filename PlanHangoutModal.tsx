import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  ArrowRight,
  Heart,
  MapPin,
  CalendarHeart,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shakeError, setShakeError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result =
        mode === 'login'
          ? await login(email, password)
          : await signup(name, email, password);

      if (!result.success) {
        setError(result.error || 'Something went wrong');
        setShakeError(true);
        setTimeout(() => setShakeError(false), 600);
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const floatingIcons = [
    { Icon: Heart, x: '10%', y: '15%', delay: 0, size: 20 },
    { Icon: MapPin, x: '85%', y: '20%', delay: 1.5, size: 22 },
    { Icon: CalendarHeart, x: '75%', y: '70%', delay: 3, size: 24 },
    { Icon: Sparkles, x: '15%', y: '75%', delay: 2, size: 18 },
    { Icon: Heart, x: '50%', y: '10%', delay: 4, size: 16 },
    { Icon: MapPin, x: '90%', y: '50%', delay: 0.5, size: 20 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.15, 0.2], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl"
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.25, 0.1],
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute z-[1] text-purple-400/20"
          style={{ left: x, top: y }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glow behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-purple-600/30 rounded-3xl blur-xl" />

        <div className="relative glass rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/50">
          {/* Header Section */}
          <div className="relative px-8 pt-10 pb-8 text-center overflow-hidden">
            {/* Decorative top gradient */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-500/10 to-transparent" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, damping: 12 }}
              className="relative inline-block mb-5"
            >
              <div className="relative p-4 rounded-2xl glass border-purple-400/30">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </motion.div>
                {/* Orbiting dot */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-2"
            >
              Hangout Planner
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-purple-300/50 text-sm"
            >
              {mode === 'login'
                ? 'Welcome back! Let\'s plan something awesome.'
                : 'Join the crew! Start planning hangouts.'}
            </motion.p>
          </div>

          {/* Toggle */}
          <div className="px-8 mb-6">
            <div className="relative flex rounded-xl glass p-1">
              <motion.div
                layout
                className="absolute inset-y-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-purple-600/60 to-pink-600/60 border border-purple-400/30"
                style={{ left: mode === 'login' ? '4px' : 'calc(50%)' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  mode === 'login' ? 'text-white' : 'text-purple-400/60 hover:text-purple-300'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>
              <button
                onClick={() => { setMode('signup'); setError(''); }}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  mode === 'signup' ? 'text-white' : 'text-purple-400/60 hover:text-purple-300'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <label className="block text-xs font-semibold text-purple-300/70 mb-1.5 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User className="w-4 h-4 text-purple-400/40 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-11 pr-4 py-3 rounded-xl glass-dark text-white text-sm font-medium placeholder:text-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-semibold text-purple-300/70 mb-1.5 ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="w-4 h-4 text-purple-400/40 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-dark text-white text-sm font-medium placeholder:text-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-300/70 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-4 h-4 text-purple-400/40 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl glass-dark text-white text-sm font-medium placeholder:text-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/40 transition-all"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-400/40 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    height: 'auto',
                    x: shakeError ? [0, -8, 8, -8, 8, -4, 4, 0] : 0,
                  }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  className="p-3 rounded-xl bg-red-500/15 border border-red-400/30"
                >
                  <p className="text-red-300 text-xs font-medium text-center">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.02, y: -1 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              className="w-full relative group overflow-hidden rounded-xl py-3.5 font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] group-hover:animate-shimmer" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
              <span className="relative flex items-center justify-center gap-2 text-white">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    {mode === 'login' ? 'Log In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-purple-400/40">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Switch mode */}
            <motion.button
              type="button"
              onClick={switchMode}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl glass hover:bg-white/15 text-purple-300/70 hover:text-purple-200 text-sm font-medium transition-all"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Log in'}
            </motion.button>

            {/* Demo hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <p className="text-[11px] text-purple-400/30 leading-relaxed">
                💡 Demo: Use any email (e.g. alex@hangout.com) with any 4+ char password
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
