import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, Search, Sun, Moon, User, ChevronDown, 
  ShoppingBag, CheckCircle, Menu, Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";

interface TopNavbarProps {
  storeName: string;
  isOnline: boolean;
  onToggleOnline: (online: boolean) => void;
}

export const TopNavbar = ({ storeName, isOnline, onToggleOnline }: TopNavbarProps) => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{storeName}</span>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Medical Retailer</p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders, products, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Online Status Toggle */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
            <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="text-sm font-medium">{isOnline ? 'Open' : 'Closed'}</span>
            <Switch
              checked={isOnline}
              onCheckedChange={onToggleOnline}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  5
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <p className="font-semibold mb-2">Notifications</p>
                {[
                  { title: "New Order #1234", desc: "₹2,450 - 3 items", time: "2 min ago" },
                  { title: "Review Received", desc: "5-star from Rajesh K.", time: "15 min ago" },
                  { title: "Low Stock Alert", desc: "Paracetamol 500mg", time: "1 hr ago" },
                ].map((item, i) => (
                  <DropdownMenuItem key={i} className="flex flex-col items-start p-3 cursor-pointer">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                    <span className="text-xs text-primary mt-1">{item.time}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Store Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};
