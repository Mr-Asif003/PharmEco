import { motion, AnimatePresence } from "framer-motion";
import { Pill, Stethoscope, Heart, ShieldPlus, Building2, Package } from "lucide-react";

interface Auth3DVisualProps {
  userType: "customer" | "retailer";
}

export function Auth3DVisual({ userType }: Auth3DVisualProps) {
  const customerImages = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&auto=format&fit=crop&q=80",
  ];

  const retailerImages = [
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&auto=format&fit=crop&q=80",
  ];

  const images = userType === "customer" ? customerImages : retailerImages;

  const floatingIcons = userType === "customer" 
    ? [
        { Icon: Heart, delay: 0, x: "10%", y: "20%" },
        { Icon: Stethoscope, delay: 0.5, x: "80%", y: "15%" },
        { Icon: ShieldPlus, delay: 1, x: "15%", y: "75%" },
        { Icon: Pill, delay: 1.5, x: "85%", y: "70%" },
      ]
    : [
        { Icon: Package, delay: 0, x: "10%", y: "20%" },
        { Icon: Building2, delay: 0.5, x: "80%", y: "15%" },
        { Icon: Pill, delay: 1, x: "15%", y: "75%" },
        { Icon: ShieldPlus, delay: 1.5, x: "85%", y: "70%" },
      ];

  return (
    <div className="relative h-full w-full flex items-center justify-center p-8">
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute z-10"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay, duration: 0.5 },
            scale: { delay, duration: 0.5 },
            y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className={`p-3 rounded-xl backdrop-blur-sm border border-border/30 ${
            userType === "customer" 
              ? "bg-cyan-500/10 text-cyan-500" 
              : "bg-orange-500/10 text-orange-500"
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        </motion.div>
      ))}

      {/* Main Image with 3D Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={userType}
          className="relative w-full max-w-md perspective-1000"
          initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 15, scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-50"
            animate={{
              background: userType === "customer" 
                ? "radial-gradient(circle, hsl(180 100% 50% / 0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, hsl(28 100% 50% / 0.4) 0%, transparent 70%)"
            }}
          />

          {/* Main Image Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={images[0]}
              alt={userType === "customer" ? "Healthcare" : "Pharmacy"}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.h3 
                className="text-2xl font-bold text-foreground mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {userType === "customer" ? "Your Health, Our Priority" : "Empower Your Pharmacy"}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {userType === "customer" 
                  ? "Access medicines, track prescriptions, and manage your health journey."
                  : "Streamline inventory, connect with suppliers, and grow your business."}
              </motion.p>
            </div>
          </motion.div>

          {/* Secondary Floating Card */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-background"
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <img
              src={images[1]}
              alt="Secondary"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Brand Text */}
      <motion.div
        className="absolute bottom-8 left-8 right-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-foreground">Pharm</span>
          <span className={userType === "customer" ? "text-cyan-500" : "text-orange-500"}>Eco</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          {userType === "customer" 
            ? "Your trusted healthcare companion"
            : "The future of pharmacy management"}
        </p>
      </motion.div>
    </div>
  );
}
