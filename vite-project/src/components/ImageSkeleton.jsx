import { motion } from 'framer-motion';

export default function ImageSkeleton() {
  return (
    <motion.div
      className="w-full h-64 bg-primary-card rounded-xl overflow-hidden"
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="w-full h-full bg-gradient-to-r from-primary-dark via-primary-card to-primary-dark bg-[length:200%_100%] animate-shimmer" />
    </motion.div>
  );
}
