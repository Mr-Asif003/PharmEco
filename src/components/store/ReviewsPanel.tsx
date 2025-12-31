import { motion } from "framer-motion";
import { 
  Star, Shield, Award, MessageSquare, 
  ThumbsUp, ArrowRight, CheckCircle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Excellent service! Medicines delivered within 30 minutes. Will order again.",
    date: "2 hours ago",
    responded: true
  },
  {
    id: 2,
    name: "Priya Sharma",
    rating: 4,
    comment: "Good quality products. Packaging could be better.",
    date: "1 day ago",
    responded: false
  },
  {
    id: 3,
    name: "Amit Patel",
    rating: 5,
    comment: "Best pharmacy in the area. Always have what I need.",
    date: "2 days ago",
    responded: true
  }
];

const ratingDistribution = [
  { stars: 5, count: 234, percentage: 68 },
  { stars: 4, count: 78, percentage: 23 },
  { stars: 3, count: 21, percentage: 6 },
  { stars: 2, count: 8, percentage: 2 },
  { stars: 1, count: 3, percentage: 1 },
];

const trustBadges = [
  { icon: Shield, label: "Verified Store", color: "emerald" },
  { icon: Award, label: "Top Rated", color: "amber" },
  { icon: CheckCircle, label: "Licensed Pharmacy", color: "blue" },
];

export const ReviewsPanel = () => {
  const totalReviews = 344;
  const averageRating = 4.7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                Store Trust & Reviews
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Build trust with customer feedback
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              Respond to Reviews
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rating Summary */}
            <div className="space-y-4">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                <div className="text-5xl font-bold text-foreground mb-1">{averageRating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-sm w-8">{item.stars}★</span>
                    <Progress 
                      value={item.percentage} 
                      className="h-2 flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-8">{item.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <Badge 
                      key={i}
                      variant="secondary"
                      className={`gap-1 ${
                        badge.color === 'emerald' 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                          : badge.color === 'amber' 
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {badge.label}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">Recent Reviews</h4>
                <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">
                  2 pending response
                </Badge>
              </div>

              <div className="space-y-3">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{review.name}</span>
                            {review.responded && (
                              <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Responded
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        
                        {!review.responded && (
                          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              Thank
                            </Button>
                            <Button size="sm" className="h-7 text-xs gap-1 bg-primary hover:bg-primary/90">
                              <MessageSquare className="h-3 w-3" />
                              Reply
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="ghost" className="w-full gap-1 text-primary">
                View All Reviews
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
