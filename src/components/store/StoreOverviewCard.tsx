import { motion } from "framer-motion";
import { Star, MapPin, Clock, ExternalLink, Settings, ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StoreOverviewCardProps {
  storeName: string;
  rating: number;
  reviewCount: number;
  deliveryRadius: number;
  isOpen: boolean;
}

export const StoreOverviewCard = ({
  storeName,
  rating,
  reviewCount,
  deliveryRadius,
  isOpen
}: StoreOverviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border/50"
    >
      {/* Banner Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Store Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl shadow-primary/20">
              <Store className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-background ${isOpen ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
          </motion.div>

          {/* Store Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{storeName}</h1>
              <Badge className={isOpen ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}>
                {isOpen ? 'Open Now' : 'Closed'}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-foreground">{rating}</span>
                <span>({reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{deliveryRadius} km delivery radius</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>9:00 AM - 9:00 PM</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <ExternalLink className="h-4 w-4" />
                View Live Store
              </Button>
              <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
                <Settings className="h-4 w-4" />
                Customize Store
              </Button>
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Manage Orders
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { label: "Today's Sales", value: "₹45,230" },
              { label: "Active Orders", value: "12" },
              { label: "Products Listed", value: "248" },
              { label: "Store Visitors", value: "1.2K" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center p-3 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50"
              >
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
