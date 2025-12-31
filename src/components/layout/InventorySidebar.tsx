import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  AlertTriangle,
  TrendingUp,
  Bot,
  Plug,
  Warehouse,
  Shield,
  ShoppingBag,
  Users,
  Settings,
  HelpCircle,
  Activity,
  ChevronDown,
  ArrowLeftFromLine,
  MoveLeft,
  ArrowLeftCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const menuItems = [
  {
    title: "Home",
    icon: Home,
    url: "/inventory/",
  },
  {
    title: "Inventory & Stock Control",
    icon: Package,
    subItems: [
      { title: "Dashboard Overview", url: "/inventory/dashboard" },
      { title: "Item Management", url: "/inventory/items" },
      { title: "Your Inventory", url: "/inventory/showInventory" },
      { title: "Expiry Alerts & Insights", url: "/inventory/expiry" },
      { title: "Out-of-Stock Warnings", url: "/inventory/out-of-stock" },
      { title: "Reorder Management", url: "/inventory/reorder" },
      { title: "Predictive Refill Advisor", url: "/inventory/predictive-refill" },
    ],
  },
  // {
  //   title: "Purchase Management",
  //   icon: ShoppingCart,
  //   subItems: [
  //     { title: "Purchase Orders", url: "/inventory/purchase/orders" },
  //     { title: "Goods Receipt Notes (GRN)", url: "/inventory/purchase/grn" },
  //     { title: "Supplier Management", url: "/inventory/purchase/suppliers" },
  //     { title: "Returns & Replacements", url: "/inventory/purchase/returns" },
  //   ],
  // },
  // {
  //   title: "Sales & Billing",
  //   icon: FileText,
  //   subItems: [
  //     { title: "POS Counter", url: "/sales/pos" },
  //     { title: "Prescription Validation", url: "/sales/prescription" },
  //     { title: "Customer Management", url: "/sales/customers" },
  //     { title: "Sales Reports", url: "/sales/reports" },
  //   ],
  // },
  // {
  //   title: "Expiry, Returns & Waste Control",
  //   icon: AlertTriangle,
  //   subItems: [
  //     { title: "Expiry Tracker", url: "/expiry/tracker" },
  //     { title: "Returns", url: "/expiry/returns" },
  //     { title: "Waste Management", url: "/expiry/waste" },
  //   ],
  // },
  {
    title: "Analytics & Insights",
    icon: TrendingUp,
    subItems: [
      { title: "Inventory Analytics", url: "/analytics/inventory" },
      { title: "Sales Analytics", url: "/analytics/sales" },
      { title: "Purchase Insights", url: "/analytics/purchase" },
      { title: "Profitability Dashboard", url: "/analytics/profitability" },
    ],
  },
  {
    title: "AI Assistant & Automation",
    icon: Bot,
    subItems: [
      { title: "Smart Recommendations", url: "/ai/recommendations" },
      { title: "Chatbot & Voice Assistant", url: "/ai/chatbot" },
      { title: "Anomaly Detection", url: "/ai/anomaly" },
      { title: "AI Prescription Reader", url: "/ai/prescription" },
    ],
  },
  // {
  //   title: "Integration & Connectivity",
  //   icon: Plug,
  //   subItems: [
  //     { title: "Pharma Distributor APIs", url: "/integration/distributors" },
  //     { title: "Accounting Integration", url: "/integration/accounting" },
  //     { title: "E-commerce & Online Orders", url: "/integration/ecommerce" },
  //     { title: "IoT & RFID Integration", url: "/integration/iot" },
  //   ],
  // },
  // {
  //   title: "Warehouse & Multi-Branch Management",
  //   icon: Warehouse,
  //   subItems: [
  //     { title: "Warehouse Overview", url: "/warehouse/overview" },
  //     { title: "Branch Operations", url: "/warehouse/branches" },
  //     { title: "Cold Storage Monitoring", url: "/warehouse/cold-storage" },
  //   ],
  // },
  // {
  //   title: "Compliance & Audit",
  //   icon: Shield,
  //   subItems: [
  //     { title: "Batch Traceability", url: "/compliance/traceability" },
  //     { title: "Regulatory Reports", url: "/compliance/reports" },
  //     { title: "Audit Logs", url: "/compliance/audit" },
  //     { title: "Recall Management", url: "/compliance/recall" },
  //   ],
  // },
  // {
  //   title: "Smart Procurement & Vendor Portal",
  //   icon: ShoppingBag,
  //   subItems: [
  //     { title: "Vendor Portal", url: "/procurement/vendors" },
  //     { title: "Dynamic Procurement", url: "/procurement/dynamic" },
  //     { title: "Medicine Quality Grading", url: "/procurement/quality" },
  //   ],
  // },
  {
    title: "User & Role Management",
    icon: Users,
    subItems: [
      { title: "Role Permissions", url: "/users/roles" },
      { title: "Device Access Monitoring", url: "/users/devices" },
    ],
  },
  {
    title: "Settings & Configuration",
    icon: Settings,
    subItems: [
      { title: "Organization Details", url: "/settings/organization" },
      { title: "Notification Preferences", url: "/settings/notifications" },
      { title: "Backup & Recovery", url: "/settings/backup" },
      { title: "API & Webhooks", url: "/settings/api" },
    ],
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    subItems: [
      { title: "Chat Support", url: "/support/chat" },
      { title: "FAQs / Knowledge Base", url: "/support/faqs" },
      { title: "Video Tutorials", url: "/support/videos" },
    ],
  },
  // {
  //   title: "Smart Health Integration",
  //   icon: Activity,
  //   subItems: [
  //     { title: "EHR/EMR Sync", url: "/health/ehr" },
  //     { title: "Doctor Portal", url: "/health/doctors" },
  //     { title: "Health Record Linkage", url: "/health/records" },
  //   ],
  // },
];

export function InventorySidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(["Inventory & Stock Control"]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((m) => m !== title) : [...prev, title]
    );
  };

  const isActive = (url: string) => location.pathname === url;
  const hasActiveSubItem = (subItems?: { url: string }[]) =>
    subItems?.some((item) => location.pathname === item.url);

  return (
    <Sidebar className="border-r border-border " collapsible="icon">
      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary flex justify-between font-semibold text-2xl text-center mb-6 ml-2">
           <a href="/">Pharm
           <span className="text-cyan-400">Eco</span>
           </a>
           <a href="/storeHome" className="text-sm text-muted-foreground ml-2">
           <div className="p-1 animate-pulse-glow cursor-pointer rounded-full hover:bg-accent/50 transition-colors">
            <ArrowLeftCircle size={24} color="cyan"/>
           </div>
           </a>
           
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) =>
                item.subItems ? (
                  <Collapsible
                    key={item.title}
                    open={openMenus.includes(item.title)}
                    onOpenChange={() => toggleMenu(item.title)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`group ${
                            hasActiveSubItem(item.subItems)
                              ? "bg-accent  text-primary"
                              : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {open && <span >{item.title}</span>}
                          {open && (
                            <ChevronDown
                              className={`ml-auto h-4 w-4 transition-transform ${
                                openMenus.includes(item.title) ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                     {open && (
  <CollapsibleContent className="overflow-hidden">
  <SidebarMenuSub className="ml-4 border-l border-border pl-3 space-y-1">
    {item.subItems.map((subItem) => (
      <NavLink
        key={subItem.url}
        to={subItem.url}
        end
        className={({ isActive }) =>
          [
            "block w-full rounded-md px-3 py-1.5 text-sm transition-all duration-200",
            isActive
              ? "bg-primary/10 text-white font-semibold shadow-sm"
              : "text-muted-foreground hover:text-primary",
          ].join(" ")
        }
      >
        <SidebarMenuSubItem>
          <div className="flex items-center gap-2">
            <span>{subItem.title}</span>
          </div>
        </SidebarMenuSubItem>
      </NavLink>
    ))}
  </SidebarMenuSub>
</CollapsibleContent>

)}

                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url!}
                        className={({ isActive }) =>
                          isActive ? "bg-accent  text-accent-foreground font-medium" : ""
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
            <SidebarFooter className="mt-6 p-4">
              {open && (
                <div className="text-sm text-muted-foreground">
                               
                </div>
              )}
            </SidebarFooter>  
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
