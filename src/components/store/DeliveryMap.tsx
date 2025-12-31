import { motion } from "framer-motion";
import { MapPin, Navigation, Circle, Truck, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const deliveries = [
  { id: 1, location: "Sector 15", status: "in-transit", eta: "12 min" },
  { id: 2, location: "Sector 22", status: "delivered", eta: "Done" },
  { id: 3, location: "Sector 8", status: "preparing", eta: "25 min" },
];

const heatmapData = [
  { zone: "Sector 15-22", customers: 156, orders: 234, intensity: "high" },
  { zone: "Sector 8-14", customers: 89, orders: 142, intensity: "medium" },
  { zone: "Sector 1-7", customers: 45, orders: 67, intensity: "low" },
];

export const DeliveryMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border-border/50 overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Delivery & Customer Map</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track deliveries and customer hotspots
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500 animate-pulse" />
              3 Active Deliveries
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 p-4 pt-0">
            {/* Map Visualization */}
            <div className="lg:col-span-2 relative">
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-muted via-muted/80 to-muted/60 relative overflow-hidden border border-border/50">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 225">
                    {/* Grid lines */}
                    {[...Array(10)].map((_, i) => (
                      <line 
                        key={`h-${i}`} 
                        x1="0" 
                        y1={i * 25} 
                        x2="400" 
                        y2={i * 25} 
                        stroke="currentColor" 
                        strokeWidth="0.5" 
                        className="text-foreground/30"
                      />
                    ))}
                    {[...Array(16)].map((_, i) => (
                      <line 
                        key={`v-${i}`} 
                        x1={i * 25} 
                        y1="0" 
                        x2={i * 25} 
                        y2="225" 
                        stroke="currentColor" 
                        strokeWidth="0.5"
                        className="text-foreground/30"
                      />
                    ))}
                  </svg>
                </div>

                {/* Delivery Radius Circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="h-40 w-40 rounded-full border-2 border-dashed border-primary/40 animate-pulse" />
                    <div className="absolute inset-4 rounded-full border border-primary/60" />
                    <div className="absolute inset-[40%] rounded-full bg-primary flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                </motion.div>

                {/* Customer Hotspots */}
                {[
                  { x: 25, y: 30, intensity: "high" },
                  { x: 70, y: 45, intensity: "medium" },
                  { x: 35, y: 65, intensity: "low" },
                  { x: 60, y: 25, intensity: "high" },
                ].map((spot, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="absolute"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      spot.intensity === 'high' 
                        ? 'bg-red-500/20' 
                        : spot.intensity === 'medium' 
                          ? 'bg-amber-500/20' 
                          : 'bg-blue-500/20'
                    }`}>
                      <div className={`h-3 w-3 rounded-full ${
                        spot.intensity === 'high' 
                          ? 'bg-red-500' 
                          : spot.intensity === 'medium' 
                            ? 'bg-amber-500' 
                            : 'bg-blue-500'
                      }`} />
                    </div>
                  </motion.div>
                ))}

                {/* Active Delivery Markers */}
                {[
                  { x: 55, y: 35 },
                  { x: 40, y: 55 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                    className="absolute"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <div className="relative">
                      <div className="h-8 w-8 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center animate-bounce">
                        <Truck className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 bg-primary rotate-45" />
                    </div>
                  </motion.div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Your Store</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Active Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-muted-foreground">Customer Hotspot</span>
                  </div>
                </div>

                {/* Radius Badge */}
                <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground">
                  <Target className="h-3 w-3 mr-1 text-primary" />
                  5 km radius
                </Badge>
              </div>
            </div>

            {/* Delivery List & Stats */}
            <div className="space-y-4 mt-4 lg:mt-0">
              {/* Active Deliveries */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Active Deliveries
                </h4>
                {deliveries.map((delivery) => (
                  <div 
                    key={delivery.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        delivery.status === 'in-transit' 
                          ? 'bg-blue-500 animate-pulse' 
                          : delivery.status === 'delivered' 
                            ? 'bg-emerald-500' 
                            : 'bg-amber-500'
                      }`} />
                      <span className="text-sm font-medium">{delivery.location}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {delivery.eta}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Customer Zones */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Customer Zones
                </h4>
                {heatmapData.map((zone, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div>
                      <span className="text-sm font-medium block">{zone.zone}</span>
                      <span className="text-xs text-muted-foreground">
                        {zone.customers} customers
                      </span>
                    </div>
                    <Badge 
                      className={`text-xs ${
                        zone.intensity === 'high' 
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                          : zone.intensity === 'medium' 
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {zone.orders} orders
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
