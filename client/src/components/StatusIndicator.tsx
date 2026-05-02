import { motion } from "framer-motion";

interface StatusIndicatorProps {
  isAvailable?: boolean;
  showLabel?: boolean;
}

export default function StatusIndicator({ isAvailable = true, showLabel = true }: StatusIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2"
    >
      {/* Ripple Container */}
      <div className="relative w-3 h-3">
        {/* Ripple waves */}
        {isAvailable && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
            />
          </>
        )}

        {/* Core dot */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isAvailable ? "bg-green-400" : "bg-gray-400"
          }`}
          animate={isAvailable ? { boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.7)", "0 0 0 8px rgba(74, 222, 128, 0)"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <span className="text-xs font-mono font-semibold">
          <span className={isAvailable ? "text-green-400" : "text-gray-400"}>
            {isAvailable ? "Available for Projects" : "Unavailable"}
          </span>
        </span>
      )}
    </motion.div>
  );
}
