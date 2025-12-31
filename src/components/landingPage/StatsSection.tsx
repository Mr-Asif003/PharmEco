import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Package, Users, Activity, Clock } from "lucide-react";

const StatCard = ({ icon: Icon, value, label, delay, color }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const target = parseInt(value.replace(/\D/g, ""));
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatValue = (num: number) => {
    if (value.includes("K")) return `${num / 1000}K+`;
    if (value.includes("M")) return `${num / 1000000}M+`;
    return `${num}`;
  };

  const bgColor = color === "retailer" ? "bg-retailer/10" : "bg-patient/10";
  const textColor = color === "retailer" ? "text-retailer" : "text-patient";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-effect rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
    >
      <div className={`w-16 h-16 rounded-2xl ${bgColor} flex items-center justify-center mb-4`}>
        <Icon className={`w-8 h-8 ${textColor}`} />
      </div>
      <p className="text-4xl font-bold mb-2">{formatValue(count)}</p>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "10000",
      label: "Medical Retailers",
      color: "retailer",
    },
    {
      icon: Activity,
      value: "50000",
      label: "Active Customers",
      color: "patient",
    },
    {
      icon: Package,
      value: "5000000",
      label: "Medicines Managed",
      color: "retailer",
    },
    {
      icon: Clock,
      value: "24",
      label: "Hours Real-Time Tracking",
      color: "patient",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of medical retailers and patients who trust PharmEco for their healthcare needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
