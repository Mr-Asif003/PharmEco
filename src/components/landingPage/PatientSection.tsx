import { motion } from "framer-motion";
import {
  Search,
  Upload,
  MapPin,
  Truck,
  Calendar,
  CreditCard,
  Star,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full hover:shadow-glow-patient transition-all duration-300 border-2 hover:border-patient/20">
        <div className="w-12 h-12 rounded-xl bg-patient/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-patient" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
};

const PatientSection = () => {
  const coreFeatures = [
    {
      icon: Search,
      title: "Smart Medicine Search",
      description: "Find any medicine instantly with AI-powered search and voice input support.",
    },
    {
      icon: Upload,
      title: "Prescription Upload",
      description: "Upload prescription images and let AI verify and suggest nearby stores automatically.",
    },
    {
      icon: MapPin,
      title: "Location-Based Stores",
      description: "Discover nearby medical stores with AI recommendations based on ratings and availability.",
    },
    {
      icon: Truck,
      title: "Real-Time Tracking",
      description: "Track your medicine delivery in real-time with live map updates and notifications.",
    },
    {
      icon: Calendar,
      title: "Subscription Refills",
      description: "Schedule automatic monthly refills for your regular medications with easy management.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Pay securely with integrated wallet, cards, and insurance linking options.",
    },
    {
      icon: Star,
      title: "Reviews & Ratings",
      description: "Share your experience and help others by rating medicines, stores, and delivery service.",
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Get instant help through AI chatbot or connect with customer care anytime.",
    },
  ];

  const smartFeatures = [
    "AI Health Suggestion Bot",
    "Dynamic Store Finder Map",
    "Call/Chat Medical Stores",
    "Emergency One-Click Delivery",
    "AI Medicine Reminder",
    "Voice Ordering System",
    "Order Prediction AI",
    "Pharmacy Loyalty Program",
    "Family Health Dashboard",
    "Community Support Forum",
  ];

  return (
    <section className="py-20 bg-patient-light/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-patient/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-patient/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 rounded-full glass-effect mb-4">
            <span className="text-patient font-semibold">🩵 For Customers & Patients</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Healthcare at Your{" "}
            <span className="text-patient">Fingertips</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find medicines, upload prescriptions, order from nearby stores, and track delivery —
            all in one simple, intelligent app
          </p>
        </motion.div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>

        {/* Smart Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              🤖 AI-Powered Patient Features
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced AI features designed to make healthcare more accessible and convenient
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {smartFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-patient" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="patient">
            Download App Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientSection;
