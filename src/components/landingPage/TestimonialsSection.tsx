import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    type: "retailer",
    name: "Dr. Rajesh Kumar",
    role: "Owner, MediCare Pharmacy",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    content: "PharmEco transformed our inventory management completely. The AI-driven forecasting helped us reduce wastage by 40% and improve stock availability.",
    rating: 5,
  },
  {
    id: 2,
    type: "patient",
    name: "Priya Sharma",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "Finding medicines is now so easy! I can compare prices across stores and get same-day delivery. The prescription upload feature is a lifesaver.",
    rating: 5,
  },
  {
    id: 3,
    type: "retailer",
    name: "Amit Patel",
    role: "Chain Manager, HealthPlus",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "Managing 15 stores was a nightmare before PharmEco. Now everything is centralized, automated, and we've seen a 35% increase in online orders.",
    rating: 5,
  },
  {
    id: 4,
    type: "patient",
    name: "Anita Desai",
    role: "Senior Citizen",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "The medicine reminder and subscription refill feature ensures I never miss my medications. Customer support is excellent and very helpful.",
    rating: 5,
  },
  {
    id: 5,
    type: "retailer",
    name: "Vikram Singh",
    role: "Owner, WellCare Medical",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "The eCommerce store builder is phenomenal. We launched our online store in just 2 days and started receiving orders immediately.",
    rating: 5,
  },
  {
    id: 6,
    type: "patient",
    name: "Neha Gupta",
    role: "Working Professional",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    content: "Real-time tracking and 24/7 availability are game-changers. I can order medicines late at night and track delivery on my way to work.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="text-retailer">Retailers</span> &{" "}
            <span className="text-patient">Patients</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who are experiencing smarter, faster, and more
            reliable healthcare commerce
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full hover:shadow-lg transition-all duration-300 border-2 ${
                  testimonial.type === "retailer"
                    ? "hover:border-retailer/50"
                    : "hover:border-patient/50"
                }`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <Quote
                      className={`w-10 h-10 ${
                        testimonial.type === "retailer"
                          ? "text-retailer"
                          : "text-patient"
                      } opacity-20`}
                    />
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 fill-current ${
                            testimonial.type === "retailer"
                              ? "text-retailer"
                              : "text-patient"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-foreground mb-6 flex-grow">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p
                        className={`text-sm ${
                          testimonial.type === "retailer"
                            ? "text-retailer"
                            : "text-patient"
                        }`}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-lg">
            Join <span className="font-bold text-foreground">10,000+</span>{" "}
            satisfied users transforming healthcare commerce
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
