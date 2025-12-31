import { motion } from "framer-motion";
import { ArrowRight, Store, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import retailerHero from "@/assets/retailer-hero.jpg";
import patientHero from "@/assets/patient-hero.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero opacity-40" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full glass-effect mb-6"
            >
              <span className="text-sm font-medium">
                <span className="text-retailer">🟠</span> Medical Retailers +{" "}
                <span className="text-patient">🩵</span> Patients
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              One Unified Platform for{" "}
              <span className="bg-gradient-to-r from-retailer to-patient bg-clip-text text-transparent">
                Smarter Healthcare
              </span>{" "}
              Commerce
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              PharmEco integrates inventory management, online medical store creation,
              AI-driven analytics, and real-time medicine ordering — uniting healthcare
              into one smart ecosystem.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="retailer"
                  className="group w-full sm:w-auto"
                >
                  <Store className="mr-2 h-5 w-5" />
                  For Medical Retailers
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="patient"
                  className="group w-full sm:w-auto"
                >
                  <User className="mr-2 h-5 w-5" />
                  For Customers
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Medical Retailers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Active Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">5M+</p>
                <p className="text-sm text-muted-foreground">Medicines Managed</p>
              </div>
            </div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="space-y-4"
              >
                <div className="rounded-2xl overflow-hidden shadow-glow-retailer">
                  <img
                    src={retailerHero}
                    alt="Medical Retailer Dashboard"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-retailer/20 flex items-center justify-center">
                      <Store className="w-6 h-6 text-retailer" />
                    </div>
                    <div>
                      <p className="font-semibold">Inventory Control</p>
                      <p className="text-sm text-muted-foreground">Real-time tracking</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 gradient-retailer" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="space-y-4 pt-12"
              >
                <div className="glass-effect rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-patient/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-patient" />
                    </div>
                    <div>
                      <p className="font-semibold">Easy Ordering</p>
                      <p className="text-sm text-muted-foreground">Track in real-time</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-4/5 gradient-patient" />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-glow-patient">
                  <img
                    src={patientHero}
                    alt="Patient Mobile App"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
