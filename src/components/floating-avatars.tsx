"use client";

import { motion } from "motion/react";
import { getAvatarUrl } from "@/lib/avatar";

const AVATARS = [
  { seed: "86", color: "rgb(244, 63, 94)", x: "8%", y: "15%", delay: 0 },
  { seed: "42", color: "rgb(99, 102, 241)", x: "85%", y: "25%", delay: 1.2 },
  { seed: "17", color: "rgb(16, 185, 129)", x: "90%", y: "60%", delay: 0.6 },
  { seed: "53", color: "rgb(245, 158, 11)", x: "5%", y: "70%", delay: 1.8 },
  { seed: "71", color: "rgb(139, 92, 246)", x: "75%", y: "85%", delay: 2.4 },
];

const FloatingAvatars = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {AVATARS.map((avatar) => (
        <motion.div
          key={avatar.seed}
          className="absolute flex items-center rounded-full border-2 shadow-lg overflow-hidden"
          style={{
            borderColor: avatar.color,
            backgroundColor: avatar.color + "60",
            left: avatar.x,
            top: avatar.y,
            width: 40,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0, 8, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: avatar.delay },
            scale: { duration: 0.8, delay: avatar.delay },
            y: {
              duration: 6 + avatar.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: avatar.delay,
            },
          }}
        >
          <img
            src={getAvatarUrl(avatar.seed)}
            alt="Community member avatar"
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingAvatars;
