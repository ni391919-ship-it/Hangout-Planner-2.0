import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Users,
  Sparkles,
  Calendar,
  Heart,
} from 'lucide-react';
import { AuthProvider, useAuth, MOCK_FRIENDS } from './context/AuthContext';
import type { FriendResponse } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import PlanHangoutModal from './components/PlanHangoutModal';
import HangoutCard, { Hangout } from './components/HangoutCard';

// Generate mock friend responses for demo hangouts
function generateMockFriendResponses(): FriendResponse[] {
  const responses: FriendResponse[] = [];
  const shuffled = [...MOCK_FRIENDS].sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * 4) + 1;

  const statuses: ('imIn' | 'gonnaBeLate' | 'cantMakeIt')[] = ['imIn', 'gonnaBeLate', 'cantMakeIt'];
  const excuses = [
    'Have a dentist appointment 😬',
    'My cat is sick, need to stay home 🐱',
    'Family dinner tonight, sorry! 🍽️',
    'Working overtime this week 💼',
    'Promised to babysit my nephew 👶',
  ];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const friend = shuffled[i];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const response: FriendResponse = {
      friendId: friend.id,
      friendName: friend.name,
      friendAvatar: friend.avatar,
      status,
    };

    if (status === 'imIn') {
      const hours = Math.floor(Math.random() * 12) + 1;
      const mins = Math.random() > 0.5 ? '00' : '30';
      const ampm = hours > 6 ? 'PM' : 'AM';
      response.arrivalTime = `${hours}:${mins} ${ampm}`;
    } else if (status === 'gonnaBeLate') {
      response.minutesLate = (Math.floor(Math.random() * 4) + 1) * 5;
    } else if (status === 'cantMakeIt') {
      response.excuse = excuses[Math.floor(Math.random() * excuses.length)];
    }

    responses.push(response);
  }

  return responses;
}

function Dashboard() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hangouts, setHangouts] = useState<Hangout[]>([
    {
      id: 1,
      place: 'Coffee Shop Downtown',
      from: '2:00 PM',
      to: '4:00 PM',
      date: 'Today',
      createdBy: 'Maya Johnson',
      createdByAvatar: '🌸',
      friendResponses: [
        {
          friendId: 'f2',
          friendName: 'Leo Martins',
          friendAvatar: '🎸',
          status: 'imIn',
          arrivalTime: '2:15 PM',
        },
        {
          friendId: 'f3',
          friendName: 'Priya Patel',
          friendAvatar: '✨',
          status: 'gonnaBeLate',
          minutesLate: 15,
        },
        {
          friendId: 'f5',
          friendName: 'Zoe Kim',
          friendAvatar: '🎨',
          status: 'cantMakeIt',
          excuse: 'Have a painting class at 3 PM, sorry! 🎨',
        },
      ],
    },
    {
      id: 2,
      place: 'Beach Hangout',
      from: '5:00 PM',
      to: '8:00 PM',
      date: 'Saturday',
      createdBy: 'Dylan Brooks',
      createdByAvatar: '🏄',
      friendResponses: [
        {
          friendId: 'f1',
          friendName: 'Maya Johnson',
          friendAvatar: '🌸',
          status: 'imIn',
          arrivalTime: '5:00 PM',
        },
        {
          friendId: 'f3',
          friendName: 'Priya Patel',
          friendAvatar: '✨',
          status: 'imIn',
          arrivalTime: '5:30 PM',
        },
        {
          friendId: 'f4',
          friendName: 'Dylan Brooks',
          friendAvatar: '🏄',
          status: 'gonnaBeLate',
          minutesLate: 20,
        },
      ],
    },
    {
      id: 3,
      place: 'Rooftop Bar Night',
      from: '9:00 PM',
      to: '12:00 AM',
      date: 'Friday',
      createdBy: 'Leo Martins',
      createdByAvatar: '🎸',
      friendResponses: [
        {
          friendId: 'f1',
          friendName: 'Maya Johnson',
          friendAvatar: '🌸',
          status: 'gonnaBeLate',
          minutesLate: 10,
        },
        {
          friendId: 'f5',
          friendName: 'Zoe Kim',
          friendAvatar: '🎨',
          status: 'cantMakeIt',
          excuse: 'Working overtime this week, rain check? 💼',
        },
      ],
    },
  ]);

  const handleAddHangout = (data: {
    placeName: string;
    fromTime: string;
    toTime: string;
  }) => {
    const newHangout: Hangout = {
      id: Date.now(),
      place: data.placeName,
      from: data.fromTime,
      to: data.toTime,
      date: 'Today',
      createdBy: user?.name || 'You',
      createdByAvatar: user?.avatar || '🌟',
      friendResponses: generateMockFriendResponses(),
    };
    setHangouts([newHangout, ...hangouts]);
    setIsModalOpen(false);
  };

  const handleDeleteHangout = (id: number) => {
    setHangouts(hangouts.filter((h) => h.id !== id));
  };

  const handleUpdateHangout = (id: number, updates: Partial<Hangout>) => {
    setHangouts(
      hangouts.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  };

  // Compute stats
  const imInCount = hangouts.filter((h) => h.friendStatus === 'imIn').length;
  const lateCount = hangouts.filter((h) => h.friendStatus === 'gonnaBeLate').length;
  const cantCount = hangouts.filter((h) => h.friendStatus === 'cantMakeIt').length;
  const totalFriendsIn = hangouts.reduce(
    (acc, h) => acc + (h.friendResponses?.filter((f) => f.status === 'imIn').length || 0),
    0
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.15, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar onPlanHangout={() => setIsModalOpen(true)} />

        {/* Welcome banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 sm:mb-10"
          >
            <div className="flex items-center gap-3 mb-1">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl sm:text-3xl"
              >
                👋
              </motion.span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Hey, {user?.name?.split(' ')[0]}!
              </h2>
            </div>
            <p className="text-purple-300/50 text-sm sm:text-base ml-10 sm:ml-12">
              Ready to plan something awesome today?
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10"
          >
            {[
              {
                icon: Calendar,
                label: 'Planned',
                value: hangouts.length,
                color: 'from-purple-600 to-pink-600',
                sub: 'hangouts',
              },
              {
                icon: Heart,
                label: 'Friends In',
                value: totalFriendsIn,
                color: 'from-emerald-600 to-teal-600',
                sub: 'excited',
              },
              {
                icon: Clock,
                label: 'You\'re Late',
                value: lateCount,
                color: 'from-amber-600 to-orange-600',
                sub: imInCount > 0 ? `${imInCount} going` : 'none',
              },
              {
                icon: Users,
                label: 'Can\'t Go',
                value: cantCount,
                color: 'from-red-600 to-rose-600',
                sub: 'excuses',
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="glass glow-card p-4 sm:p-5 rounded-xl hover:border-purple-400/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300/60 text-xs sm:text-sm">
                      {stat.label}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-purple-300/30 mt-0.5">{stat.sub}</p>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} text-white`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hangout Feed Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Hangout Feed
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-300/50">
                    {hangouts.length} hangout
                    {hangouts.length !== 1 ? 's' : ''} • Tap a card to respond
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-purple-300/40 text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Live
              </div>
            </motion.div>

            {hangouts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glass glow-card rounded-2xl p-12 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-14 h-14 text-purple-400 mx-auto mb-5 opacity-50" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No hangouts planned yet
                </h3>
                <p className="text-purple-300/60 text-sm mb-6">
                  Start planning your first hangout adventure!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
                >
                  Plan Your First Hangout
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {hangouts.map((hangout) => (
                    <HangoutCard
                      key={hangout.id}
                      hangout={hangout}
                      currentUserName={user?.name || 'Friend'}
                      onDelete={handleDeleteHangout}
                      onUpdate={handleUpdateHangout}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <PlanHangoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddHangout}
      />
    </div>
  );
}

// Main App wraps with AuthProvider and conditionally renders
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <Dashboard />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <LoginPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
