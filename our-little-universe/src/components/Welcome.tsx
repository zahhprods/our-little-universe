import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

interface WelcomeProps {
  onEnter: () => void;
}

export default function Welcome({ onEnter }: WelcomeProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col items-center"
      >

        <Sparkles
          size={45}
          className="mb-8 text-pink-300"
        />

        <h1 className="mb-6 text-5xl font-light tracking-wide text-pink-100 md:text-7xl">
          Our Little Universe
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-12 max-w-lg text-lg leading-relaxed text-gray-300"
        >
          In a universe full of people,
          <br />
          I'm so glad I found you.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="flex cursor-pointer items-center gap-3 rounded-full bg-pink-300 px-8 py-4 font-medium text-[#080615] shadow-lg shadow-pink-400/20 transition-colors hover:bg-pink-200"
        >
          Enter Our Universe
          <Heart size={18} />
        </motion.button>

      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 text-sm tracking-widest text-pink-200"
      >
        MADE WITH LOVE ♡
      </motion.p>

    </div>
  );
}