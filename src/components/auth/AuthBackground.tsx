import { motion } from "framer-motion";

interface AuthBackgroundProps {
  userType: "customer" | "retailer";
}

export function AuthBackground({ userType }: AuthBackgroundProps) {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 transition-all duration-700"
        animate={{
          background: userType === "customer"
            ? "linear-gradient(135deg, hsl(180 100% 97%) 0%, hsl(180 60% 90%) 50%, hsl(180 80% 85%) 100%)"
            : "linear-gradient(135deg, hsl(28 100% 97%) 0%, hsl(28 60% 90%) 50%, hsl(28 80% 85%) 100%)"
        }}
      />

      {/* Dark mode gradient */}
      <motion.div
        className="absolute inset-0 transition-all duration-700 dark:opacity-100 opacity-0"
        animate={{
          background: userType === "customer"
            ? "linear-gradient(135deg, hsl(180 30% 8%) 0%, hsl(180 40% 12%) 50%, hsl(180 50% 15%) 100%)"
            : "linear-gradient(135deg, hsl(28 30% 8%) 0%, hsl(28 40% 12%) 50%, hsl(28 50% 15%) 100%)"
        }}
      />

      {/* Morphing Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30"
        animate={{
          background: userType === "customer" ? "hsl(180 100% 50%)" : "hsl(28 100% 50%)",
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
        animate={{
          background: userType === "customer" ? "hsl(180 80% 60%)" : "hsl(28 80% 60%)",
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Floating Particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: userType === "customer" ? "hsl(180 100% 50%)" : "hsl(28 100% 50%)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
