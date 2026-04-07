import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  X,
  CheckCircle,
  Timer,
  AlertCircle,
  PartyPopper,
  Send,
  Users,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { FriendResponse } from '../context/AuthContext';

export interface Hangout {
  id: number;
  place: string;
  from: string;
  to: string;
  date: string;
  createdBy: string;
  createdByAvatar: string;
  friendStatus?: 'imIn' | 'gonnaBeLate' | 'cantMakeIt';
  arrivalTime?: string;
  minutesLate?: number;
  excuse?: string;
  friendResponses?: FriendResponse[];
}

interface HangoutCardProps {
  hangout: Hangout;
  currentUserName: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<Hangout>) => void;
}

export default function HangoutCard({
  hangout,
  currentUserName,
  onDelete,
  onUpdate,
}: HangoutCardProps) {
  const [activeResponse, setActiveResponse] = useState<
    'imIn' | 'gonnaBeLate' | 'cantMakeIt' | null
  >(null);
  const [arrivalTime, setArrivalTime] = useState('');
  const [minutesLate, setMinutesLate] = useState('');
  const [excuse, setExcuse] = useState('');
  const [showAllResponses, setShowAllResponses] = useState(false);

  const triggerConfetti = useCallback(() => {
    const duration = 1500;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors: ['#a855f7', '#ec4899', '#6366f1', '#f59e0b', '#10b981'],
        shapes: ['circle', 'square'],
        gravity: 0.8,
        scalar: 1.2,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors: ['#a855f7', '#ec4899', '#6366f1', '#f59e0b', '#10b981'],
        shapes: ['circle', 'square'],
        gravity: 0.8,
        scalar: 1.2,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleImIn = () => {
    triggerConfetti();
    setActiveResponse('imIn');
  };

  const confirmImIn = () => {
    if (!arrivalTime.trim()) return;
    onUpdate(hangout.id, { friendStatus: 'imIn', arrivalTime });
    setActiveResponse(null);
    setArrivalTime('');
  };

  const handleGonnaBeLate = () => setActiveResponse('gonnaBeLate');

  const confirmLate = () => {
    if (!minutesLate.trim()) return;
    onUpdate(hangout.id, { friendStatus: 'gonnaBeLate', minutesLate: parseInt(minutesLate) });
    setActiveResponse(null);
    setMinutesLate('');
  };

  const handleCantMakeIt = () => setActiveResponse('cantMakeIt');

  const confirmCantMakeIt = () => {
    if (!excuse.trim()) return;
    onUpdate(hangout.id, { friendStatus: 'cantMakeIt', excuse });
    setActiveResponse(null);
    setExcuse('');
  };

  const cancelResponse = () => {
    setActiveResponse(null);
    setArrivalTime('');
    setMinutesLate('');
    setExcuse('');
  };

  const resetStatus = () => {
    onUpdate(hangout.id, {
      friendStatus: undefined,
      arrivalTime: undefined,
      minutesLate: undefined,
      excuse: undefined,
    });
  };

  const friendResponses = hangout.friendResponses || [];
  const imInFriends = friendResponses.filter((f) => f.status === 'imIn');
  const lateFriends = friendResponses.filter((f) => f.status === 'gonnaBeLate');
  const cantMakeFriends = friendResponses.filter((f) => f.status === 'cantMakeIt');
  const totalResponses = friendResponses.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="glass glow-card group rounded-2xl p-5 sm:p-6 relative overflow-hidden"
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Status tags row */}
      <AnimatePresence>
        {hangout.friendStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-3 right-12 z-20 flex flex-wrap gap-1.5 max-w-[60%] justify-end"
          >
            {hangout.friendStatus === 'imIn' && (
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/40 backdrop-blur-md"
              >
                <CheckCircle className="w-3 h-3 text-emerald-300" />
                <span className="text-[11px] font-bold text-emerald-200">You're In!</span>
              </motion.div>
            )}
            {hangout.friendStatus === 'gonnaBeLate' && (
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/30 border border-amber-400/40 backdrop-blur-md"
              >
                <Timer className="w-3 h-3 text-amber-300" />
                <span className="text-[11px] font-bold text-amber-200">Wait for me!</span>
              </motion.div>
            )}
            {hangout.friendStatus === 'cantMakeIt' && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/30 border border-red-400/40 backdrop-blur-md">
                <AlertCircle className="w-3 h-3 text-red-300" />
                <span className="text-[11px] font-bold text-red-200">Can't Make It</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2.5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] font-semibold"
              >
                <Clock className="w-3 h-3" />
                {hangout.date}
              </motion.div>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {hangout.place}
            </h3>
            {/* Created by */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-sm">{hangout.createdByAvatar}</span>
              <span className="text-[11px] text-purple-300/40">
                by {hangout.createdBy}
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(hangout.id)}
            className="text-purple-300/30 hover:text-red-400 transition-colors ml-2 mt-1"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Info */}
        <div className="space-y-2.5 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 text-purple-200/70"
          >
            <div className="p-1.5 rounded-lg bg-pink-500/20">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <span className="text-sm">{hangout.place}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-purple-200/70"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/20">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-sm">
              {hangout.from} — {hangout.to}
            </span>
          </motion.div>
        </div>

        {/* Your excuse display */}
        <AnimatePresence>
          {hangout.friendStatus === 'cantMakeIt' && hangout.excuse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20"
            >
              <p className="text-[11px] text-red-300/50 mb-1 font-semibold flex items-center gap-1.5">
                <MessageCircle className="w-3 h-3" />
                Your excuse:
              </p>
              <p className="text-sm text-red-200/80 italic">
                "{hangout.excuse}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Friend Responses Section */}
        {totalResponses > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            {/* Summary bar */}
            <button
              onClick={() => setShowAllResponses(!showAllResponses)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 transition-all"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs text-purple-200/60 font-medium">
                  {totalResponses} friend{totalResponses > 1 ? 's' : ''} responded
                </span>
                {/* Mini avatars */}
                <div className="flex -space-x-1.5">
                  {friendResponses.slice(0, 4).map((fr, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-[10px]"
                      title={fr.friendName}
                    >
                      {fr.friendAvatar}
                    </div>
                  ))}
                  {totalResponses > 4 && (
                    <div className="w-5 h-5 rounded-full bg-purple-500/30 border border-purple-400/30 flex items-center justify-center text-[8px] text-purple-200 font-bold">
                      +{totalResponses - 4}
                    </div>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: showAllResponses ? 180 : 0 }}
                className="text-purple-300/30"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            {/* Expanded responses */}
            <AnimatePresence>
              {showAllResponses && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2.5 space-y-2">
                    {/* "I'm In" friends */}
                    {imInFriends.map((fr, i) => (
                      <motion.div
                        key={`in-${i}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-500/8 border border-emerald-400/15"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm border border-emerald-400/20">
                          {fr.friendAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-emerald-200 truncate">
                            {fr.friendName}
                          </p>
                          <p className="text-[10px] text-emerald-300/50">
                            Coming{fr.arrivalTime ? ` • Arriving at ${fr.arrivalTime}` : ''}
                          </p>
                        </div>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
                      </motion.div>
                    ))}

                    {/* "Late" friends — show friend's name + delay */}
                    {lateFriends.map((fr, i) => (
                      <motion.div
                        key={`late-${i}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (imInFriends.length + i) * 0.05 }}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/8 border border-amber-400/15"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-sm border border-amber-400/20">
                          {fr.friendAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs font-semibold text-amber-200">
                              {fr.friendName}
                            </p>
                            <motion.span
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="px-1.5 py-0.5 rounded-full bg-amber-500/25 text-[9px] font-bold text-amber-300 border border-amber-400/20"
                            >
                              ⏰ Wait for me!
                            </motion.span>
                          </div>
                          <p className="text-[10px] text-amber-300/50 mt-0.5">
                            Running {fr.minutesLate} min late
                          </p>
                        </div>
                        <Timer className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
                      </motion.div>
                    ))}

                    {/* "Can't make it" friends — show friend's name + excuse */}
                    {cantMakeFriends.map((fr, i) => (
                      <motion.div
                        key={`cant-${i}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (imInFriends.length + lateFriends.length + i) * 0.05 }}
                        className="p-2.5 rounded-xl bg-red-500/8 border border-red-400/15"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center text-sm border border-red-400/20">
                            {fr.friendAvatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-red-200 truncate">
                              {fr.friendName}
                            </p>
                            <p className="text-[10px] text-red-300/50">
                              Can't make it
                            </p>
                          </div>
                          <AlertCircle className="w-3.5 h-3.5 text-red-400/60 shrink-0" />
                        </div>
                        {fr.excuse && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 ml-[38px] p-2 rounded-lg bg-red-500/10 border-l-2 border-red-400/30"
                          >
                            <p className="text-[10px] text-red-300/40 mb-0.5 font-medium flex items-center gap-1">
                              <MessageCircle className="w-2.5 h-2.5" />
                              {fr.friendName}'s excuse:
                            </p>
                            <p className="text-[11px] text-red-200/70 italic leading-relaxed">
                              "{fr.excuse}"
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

        {/* Friend Response Buttons */}
        <AnimatePresence mode="wait">
          {!hangout.friendStatus && activeResponse === null && (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleImIn}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600/40 to-emerald-500/40 hover:from-emerald-600/60 hover:to-emerald-500/60 border border-emerald-400/20 text-emerald-200 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <PartyPopper className="w-4 h-4" />
                I'm In!
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGonnaBeLate}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-600/40 to-amber-500/40 hover:from-amber-600/60 hover:to-amber-500/60 border border-amber-400/20 text-amber-200 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <Timer className="w-4 h-4" />
                Gonna be Late
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCantMakeIt}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-red-600/40 to-red-500/40 hover:from-red-600/60 hover:to-red-500/60 border border-red-400/20 text-red-200 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
              >
                <AlertCircle className="w-4 h-4" />
                Can't Make It
              </motion.button>
            </motion.div>
          )}

          {/* I'm In Response Form */}
          {activeResponse === 'imIn' && (
            <motion.div
              key="imIn"
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="space-y-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="flex items-center gap-2 text-emerald-300"
              >
                <PartyPopper className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Awesome, {currentUserName.split(' ')[0]}! What time will you arrive?
                </span>
              </motion.div>
              <div className="flex gap-2">
                <input
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmImIn}
                  disabled={!arrivalTime}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/40 border border-emerald-400/30 text-emerald-200 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-500/60 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Confirm</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelResponse}
                  className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-purple-300/50 hover:text-purple-300 transition-all"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Gonna be Late Form */}
          {activeResponse === 'gonnaBeLate' && (
            <motion.div
              key="late"
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="space-y-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="flex items-center gap-2 text-amber-300"
              >
                <Timer className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  No worries, {currentUserName.split(' ')[0]}! How many minutes late?
                </span>
              </motion.div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 15"
                    value={minutesLate}
                    onChange={(e) => setMinutesLate(e.target.value)}
                    className="w-full px-4 py-2.5 pr-12 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-purple-300/30"
                    autoFocus
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-300/50 text-xs font-medium">
                    min
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmLate}
                  disabled={!minutesLate || parseInt(minutesLate) <= 0}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/40 border border-amber-400/30 text-amber-200 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-500/60 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Confirm</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelResponse}
                  className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-purple-300/50 hover:text-purple-300 transition-all"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Can't Make It Form */}
          {activeResponse === 'cantMakeIt' && (
            <motion.div
              key="cantMakeIt"
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="space-y-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="flex items-center gap-2 text-red-300"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Sad to hear, {currentUserName.split(' ')[0]}! Why can't you come?
                </span>
              </motion.div>
              <textarea
                placeholder="Write your excuse here..."
                value={excuse}
                onChange={(e) => setExcuse(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-red-400/50 focus:ring-2 focus:ring-red-400/20 transition-all resize-none placeholder:text-purple-300/30"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelResponse}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-purple-300/50 hover:text-purple-300 transition-all text-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmCantMakeIt}
                  disabled={!excuse.trim()}
                  className="px-4 py-2.5 rounded-xl bg-red-500/40 border border-red-400/30 text-red-200 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-500/60 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Send Excuse
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Active status with reset */}
          {hangout.friendStatus && activeResponse === null && (
            <motion.div
              key="status-display"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {hangout.friendStatus === 'imIn' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-300 font-medium">
                      You're going!
                    </span>
                    {hangout.arrivalTime && (
                      <span className="text-xs text-emerald-300/50">
                        Arriving at {hangout.arrivalTime}
                      </span>
                    )}
                  </>
                )}
                {hangout.friendStatus === 'gonnaBeLate' && (
                  <>
                    <Timer className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-amber-300 font-medium">
                      Running {hangout.minutesLate} min late
                    </span>
                  </>
                )}
                {hangout.friendStatus === 'cantMakeIt' && (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-300 font-medium">
                      You can't make it
                    </span>
                  </>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetStatus}
                className="text-xs text-purple-300/40 hover:text-purple-300 transition-colors underline underline-offset-2"
              >
                Change
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
