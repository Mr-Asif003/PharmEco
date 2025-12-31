import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small medical stores",
      features: [
        "Up to 500 products",
        "Basic inventory management",
        "Online store builder",
        "Email support",
        "Mobile app access",
        "Monthly reports",
      ],
      color: "muted",
      popular: false,
    },
    {
      name: "Business",
      price: "$79",
      period: "/month",
      description: "Ideal for growing pharmacy chains",
      features: [
        "Unlimited products",
        "Advanced inventory + AI forecasting",
        "Multi-store management",
        "Priority support 24/7",
        "Advanced analytics",
        "API access",
        "WhatsApp integration",
        "Custom branding",
      ],
      color: "retailer",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large healthcare networks",
      features: [
        "Everything in Business",
        "Dedicated account manager",
        "Custom AI models",
        "White-label solution",
        "Advanced security",
        "SLA guarantee",
        "Custom integrations",
        "Training & onboarding",
      ],
      color: "patient",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your medical retail business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`p-8 h-full relative ${
                  plan.popular
                    ? "border-2 border-retailer shadow-glow-retailer"
                    : "border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-retailer text-white text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground mb-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => {
                    const checkColor = plan.color === "retailer" ? "text-retailer" : 
                                      plan.color === "patient" ? "text-patient" : "text-muted-foreground";
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 ${checkColor} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "retailer" : "outline"}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-muted-foreground"
        >
          All plans include 14-day free trial • No credit card required • Cancel anytime
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
